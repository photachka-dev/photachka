import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tables } from "@/integrations/supabase/types";
import { useI18n } from "@/contexts/LanguageContext";

type Photo = Tables<"photos">;

interface FeaturedWorkProps {
  photos: Photo[] | undefined;
  isLoading: boolean;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeaturedWork({ photos, isLoading }: FeaturedWorkProps) {
  const { m } = useI18n();

  return (
    <section id="featured" className="scroll-mt-20 border-t border-border/40 py-16 sm:scroll-mt-24 sm:py-20 md:py-32">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 sm:mb-16 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-[11px] sm:tracking-[0.35em]">
              {m.featured.kicker}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-normal min-[380px]:text-4xl md:mt-3 md:text-5xl">
              {m.featured.title}
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {m.featured.subtitle}
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 md:grid-cols-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full rounded-none bg-muted" />
            ))}
          </div>
        )}

        {!isLoading && (!photos || photos.length === 0) && (
          <p className="py-16 text-center text-sm text-muted-foreground">{m.featured.empty}</p>
        )}

        {photos && photos.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 md:grid-cols-3 md:gap-4"
          >
            {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  variants={item}
                  className="group relative aspect-[4/5] cursor-default overflow-hidden bg-muted"
                >
                  <img
                    src={photo.image_url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
