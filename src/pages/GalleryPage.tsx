import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlbumCard from "@/components/AlbumCard";
import { useAlbums } from "@/hooks/useAlbums";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/contexts/LanguageContext";

export default function GalleryPage() {
  const { m } = useI18n();
  const { data: albums, isLoading, error } = useAlbums();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pb-16 pt-[max(7rem,env(safe-area-inset-top)+5.5rem)] sm:pb-20 sm:pt-28 md:pb-28 md:pt-36">
        <div className="container">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 max-w-2xl sm:mb-16 md:mb-24"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-[11px] sm:tracking-[0.35em]">
              {m.galleryPage.kicker}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-normal min-[380px]:text-5xl md:mt-4 md:text-6xl">
              {m.galleryPage.title}
            </h1>
            <p className="mt-4 text-pretty text-sm font-light leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
              {m.galleryPage.subtitle}
            </p>
          </motion.header>

          {isLoading && (
            <div className="grid grid-cols-1 gap-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] w-full rounded-none bg-muted" />
                  <Skeleton className="h-5 w-2/3 rounded-none bg-muted" />
                  <Skeleton className="h-3 w-1/3 rounded-none bg-muted" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="py-24 text-center text-sm text-destructive">{m.galleryPage.errorLoad}</p>
          )}

          {!isLoading && albums && albums.length === 0 && (
            <p className="py-24 text-center text-muted-foreground">{m.galleryPage.empty}</p>
          )}

          {albums && albums.length > 0 && (
            <div className="grid grid-cols-1 gap-10 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16 xl:gap-x-12">
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
