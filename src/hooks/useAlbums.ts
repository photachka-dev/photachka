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
        .order("display_order", { ascending: true })
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
    mutationFn: async (payload: { name: string; name_en: string }) => {
      const name = payload.name.trim();
      const name_en = payload.name_en.trim();
      if (!name || !name_en) {
        throw new Error("Album title required in both languages");
      }
      const { data: maxRow } = await supabase
        .from("albums")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const display_order = (maxRow?.display_order ?? -1) + 1;
      const { data, error } = await supabase
        .from("albums")
        .insert({ name, name_en, display_order })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-photos-featured"] });
    },
  });
}

export function useReorderAlbums() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderedIds: string[]) => {
      const results = await Promise.all(
        orderedIds.map((id, index) =>
          supabase.from("albums").update({ display_order: index }).eq("id", id),
        ),
      );
      const err = results.find((r) => r.error)?.error;
      if (err) throw err;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-photos-featured"] });
    },
  });
}

export function useSetAlbumCover() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { albumId: string; coverUrl: string }) => {
      const { error } = await supabase
        .from("albums")
        .update({ cover_url: payload.coverUrl })
        .eq("id", payload.albumId);
      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["albums", variables.albumId] });
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
    },
  });
}

export function useUpdateAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; name: string; name_en: string }) => {
      const name = payload.name.trim();
      const name_en = payload.name_en.trim();
      if (!name || !name_en) {
        throw new Error("Album title required in both languages");
      }
      const { data, error } = await supabase
        .from("albums")
        .update({ name, name_en })
        .eq("id", payload.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["albums", data.id] });
    },
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["featured-photos"] });
      queryClient.invalidateQueries({ queryKey: ["admin-photos-featured"] });
    },
  });
}
