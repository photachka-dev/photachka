import { motion } from "framer-motion";
import { useI18n } from "@/contexts/LanguageContext";
import type { Tables } from "@/integrations/supabase/types";
import { siteLine } from "@/lib/siteCopy";

type SiteSettings = Tables<"site_settings">;

export default function AboutSection({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const { m, locale } = useI18n();
  const kicker = siteLine(locale, siteSettings?.about_kicker_bs, siteSettings?.about_kicker_en, m.about.kicker);
  const title = siteLine(locale, siteSettings?.about_title_bs, siteSettings?.about_title_en, m.about.title);
  const p1 = siteLine(locale, siteSettings?.about_p1_bs, siteSettings?.about_p1_en, m.about.p1);
  const p2 = siteLine(locale, siteSettings?.about_p2_bs, siteSettings?.about_p2_en, m.about.p2);

  return (
    <section id="about" className="scroll-mt-20 border-t border-border/40 py-16 sm:scroll-mt-24 sm:py-20 md:py-36">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {kicker}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-normal leading-tight min-[380px]:text-4xl md:mt-4 md:text-5xl">
              {title}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 lg:col-start-6"
          >
            <div className="space-y-5 text-[15px] font-light leading-[1.85] text-muted-foreground sm:space-y-6 sm:text-base md:text-lg">
              <p className="text-balance">{p1}</p>
              <p className="text-balance">{p2}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
