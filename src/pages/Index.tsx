import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import AlbumsSection from "@/components/home/AlbumsSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import { useAlbums } from "@/hooks/useAlbums";
import { useFeaturedPhotos } from "@/hooks/usePhotos";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Index() {
  const { data: siteSettings } = useSiteSettings();
  const { data: albums, isLoading: albumsLoading } = useAlbums();
  const { data: featuredPhotos, isLoading: featuredLoading } = useFeaturedPhotos(12);

  const heroUrl =
    siteSettings?.home_hero_image_url ??
    albums?.find((a) => a.cover_url)?.cover_url ??
    featuredPhotos?.[0]?.image_url ??
    null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article>
          <HeroSection imageUrl={heroUrl} />
          <FeaturedWork photos={featuredPhotos} isLoading={featuredLoading} />
          <AlbumsSection albums={albums} isLoading={albumsLoading} />
          <AboutSection />
          <ContactSection />
        </article>
      </main>
      <Footer />
    </div>
  );
}
