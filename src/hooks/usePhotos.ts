import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Photo = Tables<"photos">;

export function usePhotos(albumId: string) {
  return useQuery({
    queryKey: ["photos", albumId],
    queryFn: async (): Promise<Photo[]> => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("album_id", albumId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!albumId,
  });
}

export function useUploadPhotos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ albumId, files }: { albumId: string; files: File[] }) => {
      const uploaded: Photo[] = [];

      for (const file of files) {
        const ext = file.name.split(".").pop();
        const fileName = `${albumId}/${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio")
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(fileName);

        const { data, error } = await supabase
          .from("photos")
          .insert({ album_id: albumId, image_url: urlData.publicUrl })
          .select()
          .single();
        if (error) throw error;
        uploaded.push(data);
      }

      // Update album cover with first photo if no cover
      if (uploaded.length > 0) {
        const { data: album } = await supabase
          .from("albums")
          .select("cover_url")
          .eq("id", albumId)
          .single();

        if (album && !album.cover_url) {
          await supabase
            .from("albums")
            .update({ cover_url: uploaded[0].image_url })
            .eq("id", albumId);
          queryClient.invalidateQueries({ queryKey: ["albums"] });
        }
      }

      return uploaded;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["photos", variables.albumId] });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (photo: Photo) => {
      // Delete from storage
      const url = new URL(photo.image_url);
      const pathParts = url.pathname.split("/storage/v1/object/public/portfolio/");
      const storagePath = pathParts[1];
      if (storagePath) {
        await supabase.storage.from("portfolio").remove([storagePath]);
      }

      const { error } = await supabase.from("photos").delete().eq("id", photo.id);
      if (error) throw error;
      return photo;
    },
    onSuccess: (photo) => {
      queryClient.invalidateQueries({ queryKey: ["photos", photo.album_id] });
    },
  });
}
