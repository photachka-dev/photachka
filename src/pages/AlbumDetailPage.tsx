import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MasonryGrid from "@/components/MasonryGrid";
import Lightbox from "@/components/Lightbox";
import { useAlbum } from "@/hooks/useAlbums";
import { usePhotos } from "@/hooks/usePhotos";

export default function AlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: album, isLoading: albumLoading } = useAlbum(id!);
  const { data: photos, isLoading: photosLoading } = usePhotos(id!);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isLoading = albumLoading || photosLoading;
  const imageUrls = photos?.map((p) => p.image_url) ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>

          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {album && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl mb-2">{album.name}</h1>
              <p className="text-muted-foreground mb-12">
                {photos?.length ?? 0} photo{(photos?.length ?? 0) !== 1 ? "s" : ""}
              </p>
            </motion.div>
          )}

          {photos && photos.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              No photos in this album yet.
            </p>
          )}

          {photos && photos.length > 0 && (
            <MasonryGrid
              images={photos.map((p) => ({ id: p.id, url: p.image_url }))}
              onImageClick={(index) => setLightboxIndex(index)}
            />
          )}
        </div>
      </main>

      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          images={imageUrls}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
