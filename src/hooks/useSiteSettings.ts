import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { isImageFileWithinLimit, MAX_IMAGE_UPLOAD_BYTES } from "@/lib/uploadLimits";
import { portfolioObjectPathFromPublicUrl } from "@/lib/portfolioStoragePath";

type SiteSettings = Tables<"site_settings">;

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useUploadHomeHero() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      if (!isImageFileWithinLimit(file)) {
        throw new Error(`IMAGE_TOO_LARGE:${file.name}:${MAX_IMAGE_UPLOAD_BYTES}`);
      }
      const { data: row, error: readErr } = await supabase
        .from("site_settings")
        .select("home_hero_image_url")
        .eq("id", 1)
        .single();
      if (readErr) throw readErr;

      const oldPath = row?.home_hero_image_url
        ? portfolioObjectPathFromPublicUrl(row.home_hero_image_url)
        : null;
      if (oldPath) {
        await supabase.storage.from("portfolio").remove([oldPath]);
      }

      const ext = file.name.split(".").pop() || "jpg";
      const storagePath = `home-hero/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("portfolio").upload(storagePath, file);
      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(storagePath);
      const publicUrl = urlData.publicUrl;

      const { error: updErr } = await supabase
        .from("site_settings")
        .update({ home_hero_image_url: publicUrl, updated_at: new Date().toISOString() })
        .eq("id", 1);
      if (updErr) throw updErr;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

export function useClearHomeHero() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data: row, error: readErr } = await supabase
        .from("site_settings")
        .select("home_hero_image_url")
        .eq("id", 1)
        .single();
      if (readErr) throw readErr;

      const oldPath = row?.home_hero_image_url
        ? portfolioObjectPathFromPublicUrl(row.home_hero_image_url)
        : null;
      if (oldPath) {
        await supabase.storage.from("portfolio").remove([oldPath]);
      }

      const { error: updErr } = await supabase
        .from("site_settings")
        .update({ home_hero_image_url: null, updated_at: new Date().toISOString() })
        .eq("id", 1);
      if (updErr) throw updErr;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}
