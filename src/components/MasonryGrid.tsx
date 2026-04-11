import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/LanguageContext";

interface MasonryGridProps {
  images: { id: string; url: string }[];
  onImageClick: (index: number) => void;
}

function LazyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {(!inView || !loaded) && <div className="absolute inset-0 animate-pulse bg-muted" />}
    </div>
  );
}

export default function MasonryGrid({ images, onImageClick }: MasonryGridProps) {
  const { m } = useI18n();

  return (
    <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 lg:gap-5 lg:space-y-5">
      {images.map((image, index) => (
        <motion.button
          type="button"
          key={image.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
          className="group relative mb-4 block w-full break-inside-avoid cursor-zoom-in overflow-hidden bg-muted text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:mb-5"
          onClick={() => onImageClick(index)}
        >
          <LazyImage src={image.url} alt="" className="relative min-h-[160px] sm:min-h-[200px] md:min-h-[220px]" />
          <div className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/15" />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.2em] text-foreground/90">
              {m.masonry.open}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
