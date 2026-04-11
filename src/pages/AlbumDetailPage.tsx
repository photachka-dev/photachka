import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MasonryGrid from "@/components/MasonryGrid";
import Lightbox from "@/components/Lightbox";
import { useAlbum } from "@/hooks/useAlbums";
import { usePhotos } from "@/hooks/usePhotos";
import { useI18n } from "@/contexts/LanguageContext";
import { photoWordBs, photoWordEn } from "@/i18n/messages";
import { albumDisplayTitle } from "@/lib/albumTitle";

export default function AlbumDetailPage() {
  const { locale, m } = useI18n();
  const { id } = useParams<{ id: string }>();
  const { data: album, isLoading: albumLoading } = useAlbum(id!);
  const { data: photos, isLoading: photosLoading } = usePhotos(id!);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "22%"]);

  const isLoading = albumLoading || photosLoading;
  const imageUrls = photos?.map((p) => p.image_url) ?? [];
  const heroImage = album?.cover_url ?? photos?.[0]?.image_url ?? null;

  const n = photos?.length ?? 0;
  const photoLabel = locale === "bs" ? photoWordBs(n) : photoWordEn(n);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div
          ref={heroRef}
          className="relative h-[min(42vh,360px)] min-h-[220px] max-h-[520px] overflow-hidden min-[380px]:h-[45vh] min-[380px]:min-h-[260px] md:h-[50vh] md:min-h-[300px] xl:max-h-[min(60vh,640px)]"
        >
          {heroImage && (
            <motion.div style={{ y: heroY }} className="absolute inset-0">
              <img src={heroImage} alt="" className="h-[115%] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
              <div className="grain absolute inset-0" />
            </motion.div>
          )}
          {!heroImage && !isLoading && (
            <div className="h-full w-full bg-muted">
              <div className="grain absolute inset-0" />
            </div>
          )}

          <div className="container relative z-10 flex h-full flex-col justify-end pb-8 pt-[max(6.5rem,env(safe-area-inset-top)+4.5rem)] sm:pb-10 sm:pt-28 md:pb-14 md:pt-32">
            <Link
              to="/gallery"
              className="mb-6 inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {m.albumDetail.backToGallery}
            </Link>
            {album && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="font-serif text-3xl font-normal min-[380px]:text-4xl md:text-6xl lg:text-7xl">
                  {albumDisplayTitle(album, locale)}
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                  {n} {photoLabel}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="container py-12 sm:py-16 md:py-24">
          {isLoading && (
            <div className="flex justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {photos && photos.length === 0 && !isLoading && (
            <p className="py-24 text-center text-muted-foreground">{m.albumDetail.empty}</p>
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
