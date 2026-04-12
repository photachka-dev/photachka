import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tables } from "@/integrations/supabase/types";
import { useI18n } from "@/contexts/LanguageContext";
import { albumDisplayTitle } from "@/lib/albumTitle";
import { albumsSectionLayout } from "@/lib/homeGridLayout";
import { siteLine } from "@/lib/siteCopy";
import { cn } from "@/lib/utils";

type Album = Tables<"albums">;
type SiteSettings = Tables<"site_settings">;

interface AlbumsSectionProps {
  albums: Album[] | undefined;
  isLoading: boolean;
  siteSettings?: SiteSettings | null;
}

export default function AlbumsSection({ albums, isLoading, siteSettings }: AlbumsSectionProps) {
  const { m, locale } = useI18n();
  const kicker = siteLine(locale, siteSettings?.albums_kicker_bs, siteSettings?.albums_kicker_en, m.albumsSection.kicker);
  const title = siteLine(locale, siteSettings?.albums_title_bs, siteSettings?.albums_title_en, m.albumsSection.title);
  const empty = siteLine(locale, siteSettings?.albums_empty_bs, siteSettings?.albums_empty_en, m.albumsSection.empty);
  const openSeries = siteLine(
    locale,
    siteSettings?.albums_open_series_bs,
    siteSettings?.albums_open_series_en,
    m.albumsSection.openSeries,
  );

  const listLayout = albumsSectionLayout(siteSettings ?? null);

  return (
    <section id="albums" className="scroll-mt-20 border-t border-border/40 py-16 sm:scroll-mt-24 sm:py-20 md:py-32">
      <div className="container">
        <div className="mb-10 sm:mb-16 md:mb-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-[11px] sm:tracking-[0.35em]">
            {kicker}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-normal min-[380px]:text-4xl sm:mt-3 md:text-5xl">
            {title}
          </h2>
        </div>

        {isLoading && (
          <div className={listLayout.containerClass}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className={cn(
                  "aspect-[4/5] rounded-none bg-muted",
                  listLayout.itemClass || "w-full",
                )}
              />
            ))}
          </div>
        )}

        {!isLoading && (!albums || albums.length === 0) && (
          <p className="py-12 text-center text-sm text-muted-foreground">{empty}</p>
        )}

        {albums && albums.length > 0 && (
          <div className={listLayout.containerClass}>
            {albums.map((album, i) => (
              <motion.div
                key={album.id}
                className={listLayout.itemClass}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/gallery/${album.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    {album.cover_url ? (
                      <img
                        src={album.cover_url}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-14 w-14 text-muted-foreground/25" strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/25" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-serif text-2xl text-foreground drop-shadow-md">
                        {albumDisplayTitle(album, locale)}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                        {openSeries}
                      </p>
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-normal md:hidden">
                    {albumDisplayTitle(album, locale)}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
