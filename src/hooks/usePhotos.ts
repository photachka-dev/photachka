import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { isImageFileWithinLimit, MAX_IMAGE_UPLOAD_BYTES } from "@/lib/uploadLimits";
import { portfolioObjectPathFromPublicUrl } from "@/lib/portfolioStoragePath";

type Photo = Tables<"photos">;
export type PhotoWithAlbum = Photo & { album: Tables<"albums"> };

const NULL_UUID = "00000000-0000-0000-0000-000000000000";

export function useFeaturedPhotos(limit = 12) {
  return useQuery({
    queryKey: ["featured-photos", limit],
    queryFn: async (): Promise<Photo[]> => {
      const { data: curated, error: curErr } = await supabase
        .from("photos")
        .select("*")
        .not("featured_order", "is", null)
        .order("featured_order", { ascending: true });
      if (curErr) throw curErr;
      if (curated && curated.length > 0) {
        return curated.slice(0, limit);
      }

      const { data: albumRows, error: albumErr } = await supabase
        .from("albums")
        .select("id")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (albumErr) throw albumErr;
      if (!albumRows?.length) return [];

      const albumIds = albumRows.map((a) => a.id);
      const orderIndex = new Map(albumIds.map((id, i) => [id, i]));

      const { data: photoRows, error: photoErr } = await supabase
        .from("photos")
        .select("*")
        .in("album_id", albumIds);
      if (photoErr) throw photoErr;
      if (!photoRows?.length) return [];

      const sorted = [...photoRows].sort((a, b) => {
        const ai = orderIndex.get(a.album_id) ?? 9999;
        const bi = orderIndex.get(b.album_id) ?? 9999;
        if (ai !== bi) return ai - bi;
        return a.sort_order - b.sort_order;
      });

      return sorted.slice(0, limit);
    },
  });
}

export function useAdminPhotosForFeatured() {
  return useQuery({
    queryKey: ["admin-photos-featured"],
    queryFn: async (): Promise<PhotoWithAlbum[]> => {
      const { data: albumList, error: albumErr } = await supabase
        .from("albums")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (albumErr) throw albumErr;

      const { data: photoList, error: photoErr } = await supabase.from("photos").select("*");
      if (photoErr) throw photoErr;

      const albumMap = new Map((albumList ?? []).map((a) => [a.id, a]));
      const orderIndex = new Map((albumList ?? []).map((a, i) => [a.id, i]));

      return (photoList ?? [])
        .map((p) => {
          const album = albumMap.get(p.album_id);
          if (!album) return null;
          return { ...p, album };
        })
        .filter((x): x is PhotoWithAlbum => x !== null)
        .sort((a, b) => {
          const ai = orderIndex.get(a.album_id) ?? 9999;
          const bi = orderIndex.get(b.album_id) ?? 9999;
          if (ai !== bi) return ai - bi;
          return a.sort_order - b.sort_order;
        });
    },
  });
}

export function useSyncFeaturedPhotos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderedFeaturedIds: string[]) => {
      const { error: clearErr } = await supabase
        .from("photos")
        .update({ featured_order: null })
        .neq("id", NULL_UUID);
      if (clearErr) throw clearErr;

      const results = await Promise.all(
        orderedFeaturedIds.map((id, index) =>
          supabase.from("photos").update({ featured_order: index }).eq("id", id),
        ),
      );
      const err = results.find((r) => r.error)?.error;
      if (err) throw err;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-photos-featured"] });
    },
  });
}

export function usePhotos(albumId: string) {
  return useQuery({
    queryKey: ["photos", albumId],
    queryFn: async (): Promise<Photo[]> => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("album_id", albumId)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
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

      const { data: maxSort } = await supabase
        .from("photos")
        .select("sort_order")
        .eq("album_id", albumId)
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      let nextSort = (maxSort?.sort_order ?? -1) + 1;

      for (const file of files) {
        if (!isImageFileWithinLimit(file)) {
          throw new Error(
            `IMAGE_TOO_LARGE:${file.name}:${MAX_IMAGE_UPLOAD_BYTES}`,
          );
        }
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
          .insert({
            album_id: albumId,
            image_url: urlData.publicUrl,
            sort_order: nextSort++,
          })
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
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-photos-featured"] });
    },
  });
}

export function useReorderPhotos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { albumId: string; orderedPhotoIds: string[] }) => {
      const results = await Promise.all(
        payload.orderedPhotoIds.map((id, index) =>
          supabase.from("photos").update({ sort_order: index }).eq("id", id),
        ),
      );
      const err = results.find((r) => r.error)?.error;
      if (err) throw err;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["photos", variables.albumId] });
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-photos-featured"] });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (photo: Photo) => {
      // Delete from storage
      const storagePath = portfolioObjectPathFromPublicUrl(photo.image_url);
      if (storagePath) {
        await supabase.storage.from("portfolio").remove([storagePath]);
      }

      const { error } = await supabase.from("photos").delete().eq("id", photo.id);
      if (error) throw error;

      const { data: albumRow } = await supabase
        .from("albums")
        .select("cover_url")
        .eq("id", photo.album_id)
        .single();
      if (albumRow?.cover_url === photo.image_url) {
        await supabase.from("albums").update({ cover_url: null }).eq("id", photo.album_id);
      }

      return photo;
    },
    onSuccess: (photo) => {
      queryClient.invalidateQueries({ queryKey: ["photos", photo.album_id] });
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["albums", photo.album_id] });
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-photos-featured"] });
    },
  });
}
