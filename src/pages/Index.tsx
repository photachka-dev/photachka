import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { clampHeroIntervalSeconds, parseHomeHeroSlides } from "@/lib/homeHeroSlides";
import { isHomeHashSectionId, scrollHomeSectionIntoView } from "@/lib/homeSectionScroll";

export default function Index() {
  const { hash, pathname } = useLocation();

  const { data: siteSettings } = useSiteSettings();
  const { data: albums, isLoading: albumsLoading } = useAlbums();
  const { data: featuredPhotos, isLoading: featuredLoading } = useFeaturedPhotos(12);

  const heroSlides = parseHomeHeroSlides(siteSettings?.home_hero_slides);
  const legacyHero = siteSettings?.home_hero_image_url?.trim();
  const fallbackSingle =
    albums?.find((a) => a.cover_url)?.cover_url ?? featuredPhotos?.[0]?.image_url ?? null;

  const heroImageUrls =
    heroSlides.length > 0 ? heroSlides : legacyHero ? [legacyHero] : fallbackSingle ? [fallbackSingle] : [];

  const heroRotationSeconds = clampHeroIntervalSeconds(Number(siteSettings?.home_hero_interval_seconds) || 6);

  useLayoutEffect(() => {
    if (pathname !== "/" || !hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    if (!isHomeHashSectionId(id)) return;

    const run = () => scrollHomeSectionIntoView(id);

    run();
    const raf = requestAnimationFrame(() => requestAnimationFrame(run));
    const t1 = window.setTimeout(run, 200);
    const t2 = window.setTimeout(run, 500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [hash, pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article>
          <HeroSection
            imageUrls={heroImageUrls}
            rotationIntervalSeconds={heroRotationSeconds}
            siteSettings={siteSettings}
          />
          <FeaturedWork photos={featuredPhotos} isLoading={featuredLoading} siteSettings={siteSettings} />
          <AlbumsSection albums={albums} isLoading={albumsLoading} siteSettings={siteSettings} />
          <AboutSection siteSettings={siteSettings} />
          <ContactSection siteSettings={siteSettings} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
