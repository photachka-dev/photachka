import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Album = Tables<"albums">;

interface AlbumCardProps {
  album: Album;
  index: number;
}

export default function AlbumCard({ album, index }: AlbumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/gallery/${album.id}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {album.cover_url ? (
            <img
              src={album.cover_url}
              alt={album.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        </div>
        <h3 className="mt-3 font-heading text-lg">{album.name}</h3>
        <p className="text-sm text-muted-foreground">
          {new Date(album.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </p>
      </Link>
    </motion.div>
  );
}
