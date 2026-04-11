import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlbumCard from "@/components/AlbumCard";
import { useAlbums } from "@/hooks/useAlbums";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
  const { data: albums, isLoading, error } = useAlbums();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl mb-2">Galerija</h1>
            <p className="text-muted-foreground mb-12">Pregledajte albume</p>
          </motion.div>

          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {error && (
            <p className="text-center text-destructive py-20">Greška pri učitavanju albuma.</p>
          )}

          {albums && albums.length === 0 && (
            <p className="text-center text-muted-foreground py-20">Još nema albuma.</p>
          )}

          {albums && albums.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album, i) => (
                <AlbumCard key={album.id} album={album} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
