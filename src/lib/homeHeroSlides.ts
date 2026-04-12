import type { Json } from "@/integrations/supabase/types";

export const MAX_HOME_HERO_SLIDES = 6;

/** Parsira JSON niz URL-ova iz `site_settings.home_hero_slides` (max 6). */
export function parseHomeHeroSlides(value: Json | null | undefined): string[] {
  if (value == null || !Array.isArray(value)) return [];
  const urls = value.filter((u): u is string => typeof u === "string" && u.trim() !== "");
  return urls.slice(0, MAX_HOME_HERO_SLIDES);
}

export function clampHeroIntervalSeconds(n: number): number {
  if (!Number.isFinite(n)) return 6;
  return Math.min(120, Math.max(3, Math.round(n)));
}
