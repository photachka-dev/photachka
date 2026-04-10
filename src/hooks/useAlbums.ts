import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Album = Tables<"albums">;

export function useAlbums() {
  return useQuery({
    queryKey: ["albums"],
    queryFn: async (): Promise<Album[]> => {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAlbum(id: string) {
  return useQuery({
    queryKey: ["albums", id],
    queryFn: async (): Promise<Album> => {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from("albums")
        .insert({ name })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["albums"] }),
  });
}

export function useDeleteAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Delete all photos in storage first
      const { data: photos } = await supabase
        .from("photos")
        .select("image_url")
        .eq("album_id", id);

      if (photos && photos.length > 0) {
        const paths = photos.map((p) => {
          const url = new URL(p.image_url);
          const pathParts = url.pathname.split("/storage/v1/object/public/portfolio/");
          return pathParts[1] || "";
        }).filter(Boolean);

        if (paths.length > 0) {
          await supabase.storage.from("portfolio").remove(paths);
        }
      }

      const { error } = await supabase.from("albums").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["albums"] }),
  });
}
