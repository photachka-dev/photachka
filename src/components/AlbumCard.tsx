import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { useI18n } from "@/contexts/LanguageContext";
import { dateLocaleTag } from "@/i18n/messages";
import { albumDisplayTitle } from "@/lib/albumTitle";

type Album = Tables<"albums">;

interface AlbumCardProps {
  album: Album;
  index: number;
}

export default function AlbumCard({ album, index }: AlbumCardProps) {
  const { locale, m } = useI18n();
  const dateLabel = new Date(album.created_at).toLocaleDateString(dateLocaleTag(locale), {
    year: "numeric",
    month: "long",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/gallery/${album.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {album.cover_url ? (
            <img
              src={album.cover_url}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageIcon className="h-16 w-16 text-muted-foreground/20" strokeWidth={1} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{dateLabel}</p>
            <h3 className="mt-2 font-serif text-xl font-normal text-foreground min-[380px]:text-2xl md:text-3xl">
              {albumDisplayTitle(album, locale)}
            </h3>
            <p className="mt-3 max-h-0 overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
              {m.albumCard.viewSeries}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
