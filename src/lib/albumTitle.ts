import type { Tables } from "@/integrations/supabase/types";
import type { Locale } from "@/i18n/messages";

export type AlbumRow = Tables<"albums">;

/** `name` = bosanski naslov; `name_en` = engleski naslov (oba obavezna u bazi). */
export function albumDisplayTitle(album: AlbumRow, locale: Locale): string {
  return locale === "en" ? album.name_en : album.name;
}
