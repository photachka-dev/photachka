import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useI18n } from "@/contexts/LanguageContext";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SLIDE_MS = 4500;

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const { m } = useI18n();
  const [playing, setPlaying] = useState(false);
  const lb = m.lightbox;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    },
    [currentIndex, images.length, onClose, onNavigate],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!playing || images.length <= 1) return;
    const t = window.setInterval(() => {
      if (currentIndex >= images.length - 1) {
        onNavigate(0);
      } else {
        onNavigate(currentIndex + 1);
      }
    }, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [playing, currentIndex, images.length, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/97 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={lb.ariaDialog}
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center border border-border/80 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground sm:right-6 sm:top-6 md:right-8 md:top-8"
          aria-label={lb.ariaClose}
        >
          <X className="h-5 w-5" />
        </button>

        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPlaying((p) => !p);
            }}
            className="absolute left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center border border-border/80 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground sm:left-6 sm:top-6 md:left-8 md:top-8"
            aria-label={playing ? lb.ariaPauseSlideshow : lb.ariaPlaySlideshow}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        )}

        {currentIndex > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-[max(0.25rem,env(safe-area-inset-left))] z-10 min-h-[44px] min-w-[44px] p-3 text-muted-foreground transition-colors hover:text-foreground sm:left-2 md:left-6"
            aria-label={lb.ariaPrev}
          >
            <ChevronLeft className="h-10 w-10 md:h-12 md:w-12" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-[max(0.25rem,env(safe-area-inset-right))] z-10 min-h-[44px] min-w-[44px] p-3 text-muted-foreground transition-colors hover:text-foreground sm:right-2 md:right-6"
            aria-label={lb.ariaNext}
          >
            <ChevronRight className="h-10 w-10 md:h-12 md:w-12" />
          </button>
        )}

        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          src={images[currentIndex]}
          alt=""
          className="max-h-[min(88dvh,88vh)] max-w-[min(92vw,calc(100vw-1rem))] object-contain shadow-2xl sm:max-w-[92vw]"
          onClick={(e) => e.stopPropagation()}
        />

        <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:bottom-6 sm:gap-3 sm:text-[11px] sm:tracking-[0.25em]">
          <span>
            {currentIndex + 1} / {images.length}
          </span>
          {playing && <span className="text-foreground/60">{lb.slideshowLabel}</span>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
