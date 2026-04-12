import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/contexts/LanguageContext";
import type { Tables } from "@/integrations/supabase/types";
import { siteLine } from "@/lib/siteCopy";
import { cn } from "@/lib/utils";

type SiteSettings = Tables<"site_settings">;

interface HeroSectionProps {
  imageUrls: string[];
  rotationIntervalSeconds: number;
  siteSettings?: SiteSettings | null;
}

export default function HeroSection({ imageUrls, rotationIntervalSeconds, siteSettings }: HeroSectionProps) {
  const { m, locale } = useI18n();
  const category = siteLine(locale, siteSettings?.hero_category_bs, siteSettings?.hero_category_en, m.hero.category);
  const tagline = siteLine(locale, siteSettings?.hero_tagline_bs, siteSettings?.hero_tagline_en, m.hero.tagline);
  const ctaWork = siteLine(locale, siteSettings?.hero_cta_work_bs, siteSettings?.hero_cta_work_en, m.hero.ctaWork);
  const scrollHint = siteLine(
    locale,
    siteSettings?.hero_scroll_hint_bs,
    siteSettings?.hero_scroll_hint_en,
    m.hero.scrollHint,
  );
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const urlsKey = imageUrls.join("|");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], reduceMotion ? [1, 1] : [1, 0.35]);

  useEffect(() => {
    setActiveIndex(0);
  }, [urlsKey]);

  useEffect(() => {
    if (imageUrls.length <= 1 || reduceMotion) return;
    const ms = Math.max(3000, rotationIntervalSeconds * 1000);
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % imageUrls.length);
    }, ms);
    return () => window.clearInterval(id);
  }, [imageUrls.length, rotationIntervalSeconds, reduceMotion, urlsKey]);

  const hasImages = imageUrls.length > 0;

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {hasImages ? (
          <>
            {imageUrls.map((url, i) => (
              <img
                key={url}
                src={url}
                alt=""
                className={cn(
                  "absolute inset-0 h-full w-full scale-105 object-cover object-center transition-opacity ease-out [transition-duration:1.4s]",
                  i === activeIndex ? "z-[1] opacity-100" : "z-0 opacity-0",
                )}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background via-background/50 to-background/20" />
            <div className="grain absolute inset-0 z-[2]" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted via-background to-accent/30">
            <div className="grain absolute inset-0" />
          </div>
        )}
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(7.5rem,env(safe-area-inset-top)+5.5rem)] sm:pb-16 sm:pt-32 md:pb-24 md:pt-40"
      >
        <div className="container">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:mb-4 sm:text-[11px] sm:tracking-[0.35em]">
            {category}
          </p>
          <h1 className="max-w-[min(100%,56rem)] font-serif text-4xl font-normal leading-[1.05] text-foreground min-[380px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Photachka
          </h1>
          <p className="mt-4 max-w-md text-pretty text-sm font-light leading-relaxed text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
            {tagline}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#featured"
              className="inline-flex w-full items-center justify-center gap-3 border border-foreground/25 bg-foreground/5 px-5 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all duration-300 hover:border-foreground/50 hover:bg-foreground/10 sm:w-auto sm:px-6 sm:text-[11px]"
            >
              {ctaWork}
            </a>
            <a
              href="#featured"
              className="group flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground sm:justify-start sm:text-[11px] sm:tracking-[0.25em]"
            >
              <span>{scrollHint}</span>
              <ChevronDown className="h-4 w-4 animate-scroll-hint" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
