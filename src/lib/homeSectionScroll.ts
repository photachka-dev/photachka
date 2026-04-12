export const HOME_HASH_SECTION_IDS = ["featured", "albums", "about", "contact"] as const;
export type HomeHashSectionId = (typeof HOME_HASH_SECTION_IDS)[number];

export function isHomeHashSectionId(id: string): id is HomeHashSectionId {
  return (HOME_HASH_SECTION_IDS as readonly string[]).includes(id);
}

/** Glatki skrol do sekcije na početnoj (hash u URL-u postavlja React Router / Link). */
export function scrollHomeSectionIntoView(id: HomeHashSectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
