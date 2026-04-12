import type { Locale } from "@/i18n/messages";

/** Tekst iz baze za aktivni jezik; prazno/null → `fallback` iz i18n bundlea. */
export function siteLine(
  locale: Locale,
  bs: string | null | undefined,
  en: string | null | undefined,
  fallback: string,
): string {
  const raw = locale === "bs" ? bs : en;
  const t = raw?.trim();
  return t ? t : fallback;
}
