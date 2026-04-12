import type { Tables } from "@/integrations/supabase/types";

export type HomeGridColumns = 2 | 3 | 4;
export type HomeLastRowAlign = "start" | "center";

type SiteSettings = Tables<"site_settings">;

export function parseHomeGridColumns(n: number | null | undefined): HomeGridColumns {
  if (n === 2 || n === 3 || n === 4) return n;
  return 3;
}

export function parseHomeLastRowAlign(s: string | null | undefined): HomeLastRowAlign {
  return s === "center" ? "center" : "start";
}

function featuredGridContainer(cols: HomeGridColumns): string {
  const g = "gap-3 md:gap-4";
  switch (cols) {
    case 2:
      return `grid grid-cols-1 min-[400px]:grid-cols-2 ${g}`;
    case 3:
      return `grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 ${g}`;
    case 4:
      return `grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 ${g}`;
  }
}

/** Flex + fiksne širine: nepotpuni zadnji red se centrira uz justify-center. */
function featuredFlexItem(cols: HomeGridColumns): string {
  switch (cols) {
    case 2:
      return "min-w-0 flex-none w-full min-[400px]:w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-1rem)/2)]";
    case 3:
      return "min-w-0 flex-none w-full min-[400px]:w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-2rem)/3)]";
    case 4:
      return "min-w-0 flex-none w-full min-[400px]:w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-3rem)/4)]";
  }
}

function albumsGridContainer(cols: HomeGridColumns): string {
  const g = "gap-6";
  switch (cols) {
    case 2:
      return `grid grid-cols-1 min-[480px]:grid-cols-2 ${g}`;
    case 3:
      return `grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 ${g}`;
    case 4:
      return `grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 ${g}`;
  }
}

function albumsFlexItem(cols: HomeGridColumns): string {
  switch (cols) {
    case 2:
      return "min-w-0 flex-none w-full min-[480px]:w-[calc((100%-1.5rem)/2)]";
    case 3:
      return "min-w-0 flex-none w-full min-[480px]:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]";
    case 4:
      return "min-w-0 flex-none w-full min-[480px]:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]";
  }
}

export type HomeListLayout = {
  containerClass: string;
  /** Dodati na svaki item samo u flex modu (prazan string u grid modu). */
  itemClass: string;
};

export function featuredSectionLayout(settings: SiteSettings | null | undefined): HomeListLayout {
  const cols = parseHomeGridColumns(settings?.featured_grid_columns ?? undefined);
  const align = parseHomeLastRowAlign(settings?.featured_last_row_align ?? undefined);
  if (align === "start") {
    return { containerClass: featuredGridContainer(cols), itemClass: "" };
  }
  return {
    containerClass: `flex flex-wrap gap-3 md:gap-4 justify-center`,
    itemClass: featuredFlexItem(cols),
  };
}

export function albumsSectionLayout(settings: SiteSettings | null | undefined): HomeListLayout {
  const cols = parseHomeGridColumns(settings?.albums_grid_columns ?? undefined);
  const align = parseHomeLastRowAlign(settings?.albums_last_row_align ?? undefined);
  if (align === "start") {
    return { containerClass: albumsGridContainer(cols), itemClass: "" };
  }
  return {
    containerClass: "flex flex-wrap gap-6 justify-center",
    itemClass: albumsFlexItem(cols),
  };
}
