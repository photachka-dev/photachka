import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { isImageFileWithinLimit, MAX_IMAGE_UPLOAD_BYTES } from "@/lib/uploadLimits";
import { portfolioObjectPathFromPublicUrl } from "@/lib/portfolioStoragePath";
import {
  clampHeroIntervalSeconds,
  MAX_HOME_HERO_SLIDES,
  parseHomeHeroSlides,
} from "@/lib/homeHeroSlides";
import {
  parseHomeGridColumns,
  parseHomeLastRowAlign,
  type HomeGridColumns,
  type HomeLastRowAlign,
} from "@/lib/homeGridLayout";

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

async function uploadHeroSlideFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const storagePath = `home-hero/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage.from("portfolio").upload(storagePath, file);
  if (upErr) throw upErr;
  const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(storagePath);
  return urlData.publicUrl;
}

/** Dodaje jednu ili više slika (ukupno max 6). */
export function useAddHomeHeroSlides() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (files: File[]) => {
      const valid = files.filter((f) => isImageFileWithinLimit(f));
      if (valid.length === 0) {
        throw new Error(`IMAGE_TOO_LARGE:${files[0]?.name ?? ""}:${MAX_IMAGE_UPLOAD_BYTES}`);
      }

      const { data: row, error: readErr } = await supabase
        .from("site_settings")
        .select("home_hero_slides")
        .eq("id", 1)
        .single();
      if (readErr) throw readErr;

      let slides = parseHomeHeroSlides(row?.home_hero_slides);
      const room = MAX_HOME_HERO_SLIDES - slides.length;
      if (room <= 0) {
        throw new Error("HOME_HERO_FULL");
      }

      const batch = valid.slice(0, room);
      for (const file of batch) {
        const url = await uploadHeroSlideFile(file);
        slides = [...slides, url];
      }

      const { error: updErr } = await supabase
        .from("site_settings")
        .update({
          home_hero_slides: slides,
          home_hero_image_url: slides[0] ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
      if (updErr) throw updErr;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

export function useRemoveHomeHeroSlideAt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (index: number) => {
      const { data: row, error: readErr } = await supabase
        .from("site_settings")
        .select("home_hero_slides")
        .eq("id", 1)
        .single();
      if (readErr) throw readErr;

      const slides = parseHomeHeroSlides(row?.home_hero_slides);
      if (index < 0 || index >= slides.length) return;

      const removed = slides[index];
      const path = portfolioObjectPathFromPublicUrl(removed);
      const next = slides.filter((_, i) => i !== index);

      if (path) {
        await supabase.storage.from("portfolio").remove([path]);
      }

      const { error: updErr } = await supabase
        .from("site_settings")
        .update({
          home_hero_slides: next,
          home_hero_image_url: next[0] ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
      if (updErr) throw updErr;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

export function useMoveHomeHeroSlide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ from, to }: { from: number; to: number }) => {
      const { data: row, error: readErr } = await supabase
        .from("site_settings")
        .select("home_hero_slides")
        .eq("id", 1)
        .single();
      if (readErr) throw readErr;

      const slides = [...parseHomeHeroSlides(row?.home_hero_slides)];
      if (from < 0 || from >= slides.length || to < 0 || to >= slides.length || from === to) return;

      const [item] = slides.splice(from, 1);
      slides.splice(to, 0, item);

      const { error: updErr } = await supabase
        .from("site_settings")
        .update({
          home_hero_slides: slides,
          home_hero_image_url: slides[0] ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
      if (updErr) throw updErr;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

export function useUpdateHomeHeroInterval() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (seconds: number) => {
      const sec = clampHeroIntervalSeconds(seconds);
      const { error } = await supabase
        .from("site_settings")
        .update({ home_hero_interval_seconds: sec, updated_at: new Date().toISOString() })
        .eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

export type HomeGridLayoutUpdate = {
  featured_grid_columns?: HomeGridColumns;
  featured_last_row_align?: HomeLastRowAlign;
  albums_grid_columns?: HomeGridColumns;
  albums_last_row_align?: HomeLastRowAlign;
};

export function useUpdateHomeGridLayout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patch: HomeGridLayoutUpdate) => {
      const { data: row, error: readErr } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (readErr) throw readErr;
      if (!row) throw new Error("SITE_SETTINGS_MISSING");

      const next = {
        featured_grid_columns: parseHomeGridColumns(
          patch.featured_grid_columns ?? row.featured_grid_columns,
        ),
        featured_last_row_align: parseHomeLastRowAlign(
          patch.featured_last_row_align ?? row.featured_last_row_align,
        ),
        albums_grid_columns: parseHomeGridColumns(patch.albums_grid_columns ?? row.albums_grid_columns),
        albums_last_row_align: parseHomeLastRowAlign(patch.albums_last_row_align ?? row.albums_last_row_align),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("site_settings").update(next).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

export type SiteCopyFormValues = {
  hero_category_bs: string;
  hero_category_en: string;
  hero_tagline_bs: string;
  hero_tagline_en: string;
  hero_cta_work_bs: string;
  hero_cta_work_en: string;
  hero_scroll_hint_bs: string;
  hero_scroll_hint_en: string;
  featured_kicker_bs: string;
  featured_kicker_en: string;
  featured_title_bs: string;
  featured_title_en: string;
  featured_subtitle_bs: string;
  featured_subtitle_en: string;
  albums_kicker_bs: string;
  albums_kicker_en: string;
  albums_title_bs: string;
  albums_title_en: string;
  albums_empty_bs: string;
  albums_empty_en: string;
  albums_open_series_bs: string;
  albums_open_series_en: string;
  about_kicker_bs: string;
  about_kicker_en: string;
  about_title_bs: string;
  about_title_en: string;
  about_p1_bs: string;
  about_p1_en: string;
  about_p2_bs: string;
  about_p2_en: string;
  contact_kicker_bs: string;
  contact_kicker_en: string;
  contact_title_bs: string;
  contact_title_en: string;
  contact_intro_bs: string;
  contact_intro_en: string;
  contact_location_bs: string;
  contact_location_en: string;
  contact_label_name_bs: string;
  contact_label_name_en: string;
  contact_label_email_bs: string;
  contact_label_email_en: string;
  contact_label_message_bs: string;
  contact_label_message_en: string;
  contact_ph_name_bs: string;
  contact_ph_name_en: string;
  contact_ph_email_bs: string;
  contact_ph_email_en: string;
  contact_ph_message_bs: string;
  contact_ph_message_en: string;
  contact_submit_bs: string;
  contact_submit_en: string;
  contact_mail_subject_prefix_bs: string;
  contact_mail_subject_prefix_en: string;
  contact_mail_subject_fallback_bs: string;
  contact_mail_subject_fallback_en: string;
  contact_public_email: string;
  contact_instagram_url: string;
  contact_instagram_label_bs: string;
  contact_instagram_label_en: string;
};

function emptyToNull(s: string): string | null {
  const t = s.trim();
  return t === "" ? null : t;
}

export function settingsToFormValues(row: SiteSettings | null | undefined): SiteCopyFormValues {
  const s = row ?? null;
  return {
    hero_category_bs: s?.hero_category_bs ?? "",
    hero_category_en: s?.hero_category_en ?? "",
    hero_tagline_bs: s?.hero_tagline_bs ?? "",
    hero_tagline_en: s?.hero_tagline_en ?? "",
    hero_cta_work_bs: s?.hero_cta_work_bs ?? "",
    hero_cta_work_en: s?.hero_cta_work_en ?? "",
    hero_scroll_hint_bs: s?.hero_scroll_hint_bs ?? "",
    hero_scroll_hint_en: s?.hero_scroll_hint_en ?? "",
    featured_kicker_bs: s?.featured_kicker_bs ?? "",
    featured_kicker_en: s?.featured_kicker_en ?? "",
    featured_title_bs: s?.featured_title_bs ?? "",
    featured_title_en: s?.featured_title_en ?? "",
    featured_subtitle_bs: s?.featured_subtitle_bs ?? "",
    featured_subtitle_en: s?.featured_subtitle_en ?? "",
    albums_kicker_bs: s?.albums_kicker_bs ?? "",
    albums_kicker_en: s?.albums_kicker_en ?? "",
    albums_title_bs: s?.albums_title_bs ?? "",
    albums_title_en: s?.albums_title_en ?? "",
    albums_empty_bs: s?.albums_empty_bs ?? "",
    albums_empty_en: s?.albums_empty_en ?? "",
    albums_open_series_bs: s?.albums_open_series_bs ?? "",
    albums_open_series_en: s?.albums_open_series_en ?? "",
    about_kicker_bs: s?.about_kicker_bs ?? "",
    about_kicker_en: s?.about_kicker_en ?? "",
    about_title_bs: s?.about_title_bs ?? "",
    about_title_en: s?.about_title_en ?? "",
    about_p1_bs: s?.about_p1_bs ?? "",
    about_p1_en: s?.about_p1_en ?? "",
    about_p2_bs: s?.about_p2_bs ?? "",
    about_p2_en: s?.about_p2_en ?? "",
    contact_kicker_bs: s?.contact_kicker_bs ?? "",
    contact_kicker_en: s?.contact_kicker_en ?? "",
    contact_title_bs: s?.contact_title_bs ?? "",
    contact_title_en: s?.contact_title_en ?? "",
    contact_intro_bs: s?.contact_intro_bs ?? "",
    contact_intro_en: s?.contact_intro_en ?? "",
    contact_location_bs: s?.contact_location_bs ?? "",
    contact_location_en: s?.contact_location_en ?? "",
    contact_label_name_bs: s?.contact_label_name_bs ?? "",
    contact_label_name_en: s?.contact_label_name_en ?? "",
    contact_label_email_bs: s?.contact_label_email_bs ?? "",
    contact_label_email_en: s?.contact_label_email_en ?? "",
    contact_label_message_bs: s?.contact_label_message_bs ?? "",
    contact_label_message_en: s?.contact_label_message_en ?? "",
    contact_ph_name_bs: s?.contact_ph_name_bs ?? "",
    contact_ph_name_en: s?.contact_ph_name_en ?? "",
    contact_ph_email_bs: s?.contact_ph_email_bs ?? "",
    contact_ph_email_en: s?.contact_ph_email_en ?? "",
    contact_ph_message_bs: s?.contact_ph_message_bs ?? "",
    contact_ph_message_en: s?.contact_ph_message_en ?? "",
    contact_submit_bs: s?.contact_submit_bs ?? "",
    contact_submit_en: s?.contact_submit_en ?? "",
    contact_mail_subject_prefix_bs: s?.contact_mail_subject_prefix_bs ?? "",
    contact_mail_subject_prefix_en: s?.contact_mail_subject_prefix_en ?? "",
    contact_mail_subject_fallback_bs: s?.contact_mail_subject_fallback_bs ?? "",
    contact_mail_subject_fallback_en: s?.contact_mail_subject_fallback_en ?? "",
    contact_public_email: s?.contact_public_email ?? "",
    contact_instagram_url: s?.contact_instagram_url ?? "",
    contact_instagram_label_bs: s?.contact_instagram_label_bs ?? "",
    contact_instagram_label_en: s?.contact_instagram_label_en ?? "",
  };
}

export function formValuesToUpdate(v: SiteCopyFormValues) {
  return {
    hero_category_bs: emptyToNull(v.hero_category_bs),
    hero_category_en: emptyToNull(v.hero_category_en),
    hero_tagline_bs: emptyToNull(v.hero_tagline_bs),
    hero_tagline_en: emptyToNull(v.hero_tagline_en),
    hero_cta_work_bs: emptyToNull(v.hero_cta_work_bs),
    hero_cta_work_en: emptyToNull(v.hero_cta_work_en),
    hero_scroll_hint_bs: emptyToNull(v.hero_scroll_hint_bs),
    hero_scroll_hint_en: emptyToNull(v.hero_scroll_hint_en),
    featured_kicker_bs: emptyToNull(v.featured_kicker_bs),
    featured_kicker_en: emptyToNull(v.featured_kicker_en),
    featured_title_bs: emptyToNull(v.featured_title_bs),
    featured_title_en: emptyToNull(v.featured_title_en),
    featured_subtitle_bs: emptyToNull(v.featured_subtitle_bs),
    featured_subtitle_en: emptyToNull(v.featured_subtitle_en),
    albums_kicker_bs: emptyToNull(v.albums_kicker_bs),
    albums_kicker_en: emptyToNull(v.albums_kicker_en),
    albums_title_bs: emptyToNull(v.albums_title_bs),
    albums_title_en: emptyToNull(v.albums_title_en),
    albums_empty_bs: emptyToNull(v.albums_empty_bs),
    albums_empty_en: emptyToNull(v.albums_empty_en),
    albums_open_series_bs: emptyToNull(v.albums_open_series_bs),
    albums_open_series_en: emptyToNull(v.albums_open_series_en),
    about_kicker_bs: emptyToNull(v.about_kicker_bs),
    about_kicker_en: emptyToNull(v.about_kicker_en),
    about_title_bs: emptyToNull(v.about_title_bs),
    about_title_en: emptyToNull(v.about_title_en),
    about_p1_bs: emptyToNull(v.about_p1_bs),
    about_p1_en: emptyToNull(v.about_p1_en),
    about_p2_bs: emptyToNull(v.about_p2_bs),
    about_p2_en: emptyToNull(v.about_p2_en),
    contact_kicker_bs: emptyToNull(v.contact_kicker_bs),
    contact_kicker_en: emptyToNull(v.contact_kicker_en),
    contact_title_bs: emptyToNull(v.contact_title_bs),
    contact_title_en: emptyToNull(v.contact_title_en),
    contact_intro_bs: emptyToNull(v.contact_intro_bs),
    contact_intro_en: emptyToNull(v.contact_intro_en),
    contact_location_bs: emptyToNull(v.contact_location_bs),
    contact_location_en: emptyToNull(v.contact_location_en),
    contact_label_name_bs: emptyToNull(v.contact_label_name_bs),
    contact_label_name_en: emptyToNull(v.contact_label_name_en),
    contact_label_email_bs: emptyToNull(v.contact_label_email_bs),
    contact_label_email_en: emptyToNull(v.contact_label_email_en),
    contact_label_message_bs: emptyToNull(v.contact_label_message_bs),
    contact_label_message_en: emptyToNull(v.contact_label_message_en),
    contact_ph_name_bs: emptyToNull(v.contact_ph_name_bs),
    contact_ph_name_en: emptyToNull(v.contact_ph_name_en),
    contact_ph_email_bs: emptyToNull(v.contact_ph_email_bs),
    contact_ph_email_en: emptyToNull(v.contact_ph_email_en),
    contact_ph_message_bs: emptyToNull(v.contact_ph_message_bs),
    contact_ph_message_en: emptyToNull(v.contact_ph_message_en),
    contact_submit_bs: emptyToNull(v.contact_submit_bs),
    contact_submit_en: emptyToNull(v.contact_submit_en),
    contact_mail_subject_prefix_bs: emptyToNull(v.contact_mail_subject_prefix_bs),
    contact_mail_subject_prefix_en: emptyToNull(v.contact_mail_subject_prefix_en),
    contact_mail_subject_fallback_bs: emptyToNull(v.contact_mail_subject_fallback_bs),
    contact_mail_subject_fallback_en: emptyToNull(v.contact_mail_subject_fallback_en),
    contact_public_email: emptyToNull(v.contact_public_email),
    contact_instagram_url: emptyToNull(v.contact_instagram_url),
    contact_instagram_label_bs: emptyToNull(v.contact_instagram_label_bs),
    contact_instagram_label_en: emptyToNull(v.contact_instagram_label_en),
    updated_at: new Date().toISOString(),
  };
}

export function useUpdateSiteCopy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: SiteCopyFormValues) => {
      const { error } = await supabase
        .from("site_settings")
        .update(formValuesToUpdate(values))
        .eq("id", 1);
      if (error) throw error;
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
        .select("home_hero_slides, home_hero_image_url")
        .eq("id", 1)
        .single();
      if (readErr) throw readErr;

      const slides = parseHomeHeroSlides(row?.home_hero_slides);
      const paths = new Set<string>();
      for (const url of slides) {
        const p = portfolioObjectPathFromPublicUrl(url);
        if (p) paths.add(p);
      }
      const legacy = row?.home_hero_image_url ? portfolioObjectPathFromPublicUrl(row.home_hero_image_url) : null;
      if (legacy) paths.add(legacy);

      if (paths.size > 0) {
        await supabase.storage.from("portfolio").remove([...paths]);
      }

      const { error: updErr } = await supabase
        .from("site_settings")
        .update({
          home_hero_slides: [],
          home_hero_image_url: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
      if (updErr) throw updErr;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}
