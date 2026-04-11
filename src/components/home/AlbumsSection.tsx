import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tables } from "@/integrations/supabase/types";
import { useI18n } from "@/contexts/LanguageContext";
import { albumDisplayTitle } from "@/lib/albumTitle";

type Album = Tables<"albums">;

interface AlbumsSectionProps {
  albums: Album[] | undefined;
  isLoading: boolean;
}

export default function AlbumsSection({ albums, isLoading }: AlbumsSectionProps) {
  const { m, locale } = useI18n();

  return (
    <section id="albums" className="scroll-mt-20 border-t border-border/40 py-16 sm:scroll-mt-24 sm:py-20 md:py-32">
      <div className="container">
        <div className="mb-10 sm:mb-16 md:mb-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-[11px] sm:tracking-[0.35em]">
            {m.albumsSection.kicker}
          </p>
          <div className="mt-2 flex flex-col gap-4 sm:mt-3 sm:gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-3xl font-normal min-[380px]:text-4xl md:text-5xl">
              {m.albumsSection.title}
            </h2>
            <Link
              to="/gallery"
              className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {m.albumsSection.viewAll}
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full rounded-none bg-muted" />
            ))}
          </div>
        )}

        {!isLoading && (!albums || albums.length === 0) && (
          <p className="py-12 text-center text-sm text-muted-foreground">{m.albumsSection.empty}</p>
        )}

        {albums && albums.length > 0 && (
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, i) => (
              <motion.div
                key={album.id}
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
                        {m.albumsSection.openSeries}
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
