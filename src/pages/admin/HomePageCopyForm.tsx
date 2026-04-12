import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useUpdateSiteCopy,
  settingsToFormValues,
  type SiteCopyFormValues,
} from "@/hooks/useSiteSettings";
import type { Tables } from "@/integrations/supabase/types";
import { useI18n } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type SiteSettings = Tables<"site_settings">;

function pair(
  set: Dispatch<SetStateAction<SiteCopyFormValues>>,
  keyBs: keyof SiteCopyFormValues,
  keyEn: keyof SiteCopyFormValues,
) {
  return {
    onBs: (v: string) => set((p) => ({ ...p, [keyBs]: v })),
    onEn: (v: string) => set((p) => ({ ...p, [keyEn]: v })),
  };
}

export default function HomePageCopyForm({ settings }: { settings: SiteSettings | null | undefined }) {
  const { m } = useI18n();
  const updateCopy = useUpdateSiteCopy();
  const [copy, setCopy] = useState<SiteCopyFormValues>(() => settingsToFormValues(null));

  useEffect(() => {
    setCopy(settingsToFormValues(settings ?? null));
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCopy.mutateAsync(copy);
      toast.success(m.admin.homePageCopySaved);
    } catch {
      toast.error(m.admin.homePageCopySaveError);
    }
  };

  const h = pair(setCopy, "hero_category_bs", "hero_category_en");
  const ht = pair(setCopy, "hero_tagline_bs", "hero_tagline_en");
  const hc = pair(setCopy, "hero_cta_work_bs", "hero_cta_work_en");
  const hs = pair(setCopy, "hero_scroll_hint_bs", "hero_scroll_hint_en");
  const fk = pair(setCopy, "featured_kicker_bs", "featured_kicker_en");
  const ft = pair(setCopy, "featured_title_bs", "featured_title_en");
  const fs = pair(setCopy, "featured_subtitle_bs", "featured_subtitle_en");
  const alk = pair(setCopy, "albums_kicker_bs", "albums_kicker_en");
  const alt = pair(setCopy, "albums_title_bs", "albums_title_en");
  const ale = pair(setCopy, "albums_empty_bs", "albums_empty_en");
  const alo = pair(setCopy, "albums_open_series_bs", "albums_open_series_en");
  const ak = pair(setCopy, "about_kicker_bs", "about_kicker_en");
  const at = pair(setCopy, "about_title_bs", "about_title_en");
  const a1 = pair(setCopy, "about_p1_bs", "about_p1_en");
  const a2 = pair(setCopy, "about_p2_bs", "about_p2_en");
  const ck = pair(setCopy, "contact_kicker_bs", "contact_kicker_en");
  const ct = pair(setCopy, "contact_title_bs", "contact_title_en");
  const ci = pair(setCopy, "contact_intro_bs", "contact_intro_en");
  const cl = pair(setCopy, "contact_location_bs", "contact_location_en");
  const cln = pair(setCopy, "contact_label_name_bs", "contact_label_name_en");
  const cle = pair(setCopy, "contact_label_email_bs", "contact_label_email_en");
  const clm = pair(setCopy, "contact_label_message_bs", "contact_label_message_en");
  const cpn = pair(setCopy, "contact_ph_name_bs", "contact_ph_name_en");
  const cpe = pair(setCopy, "contact_ph_email_bs", "contact_ph_email_en");
  const cpm = pair(setCopy, "contact_ph_message_bs", "contact_ph_message_en");
  const cs = pair(setCopy, "contact_submit_bs", "contact_submit_en");
  const cmp = pair(setCopy, "contact_mail_subject_prefix_bs", "contact_mail_subject_prefix_en");
  const cmf = pair(setCopy, "contact_mail_subject_fallback_bs", "contact_mail_subject_fallback_en");
  const cil = pair(setCopy, "contact_instagram_label_bs", "contact_instagram_label_en");

  const block = (
    label: string,
    bs: string,
    en: string,
    onBs: (v: string) => void,
    onEn: (v: string) => void,
    rows: number,
  ) => (
    <div className="space-y-2 rounded-sm border border-border/50 bg-muted/10 p-3 sm:p-4">
      <p className="text-xs font-medium text-foreground">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {m.admin.albumNameLabelBs}
          </Label>
          <Textarea value={bs} onChange={(e) => onBs(e.target.value)} rows={rows} className="resize-y" />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {m.admin.albumNameLabelEn}
          </Label>
          <Textarea value={en} onChange={(e) => onEn(e.target.value)} rows={rows} className="resize-y" />
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="mt-8 space-y-8 sm:mt-10">
      <Accordion type="multiple" defaultValue={[]} className="w-full rounded-md border border-border/60 px-1 sm:px-2">
        <AccordionItem value="hero" className="border-border/50">
          <AccordionTrigger className="py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:no-underline sm:py-4">
            {m.admin.copySectionHero}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-2">
              {block(m.admin.copyHeroCategory, copy.hero_category_bs, copy.hero_category_en, h.onBs, h.onEn, 2)}
              {block(m.admin.copyHeroTagline, copy.hero_tagline_bs, copy.hero_tagline_en, ht.onBs, ht.onEn, 3)}
              {block(m.admin.copyHeroCta, copy.hero_cta_work_bs, copy.hero_cta_work_en, hc.onBs, hc.onEn, 2)}
              {block(m.admin.copyHeroScroll, copy.hero_scroll_hint_bs, copy.hero_scroll_hint_en, hs.onBs, hs.onEn, 2)}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="featured" className="border-border/50">
          <AccordionTrigger className="py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:no-underline sm:py-4">
            {m.admin.copySectionFeatured}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-2">
              {block(m.admin.copyFeaturedKicker, copy.featured_kicker_bs, copy.featured_kicker_en, fk.onBs, fk.onEn, 2)}
              {block(m.admin.copyFeaturedTitle, copy.featured_title_bs, copy.featured_title_en, ft.onBs, ft.onEn, 2)}
              {block(
                m.admin.copyFeaturedSubtitle,
                copy.featured_subtitle_bs,
                copy.featured_subtitle_en,
                fs.onBs,
                fs.onEn,
                3,
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="albums" className="border-border/50">
          <AccordionTrigger className="py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:no-underline sm:py-4">
            {m.admin.copySectionAlbums}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-2">
              {block(m.admin.copyAlbumsKicker, copy.albums_kicker_bs, copy.albums_kicker_en, alk.onBs, alk.onEn, 2)}
              {block(m.admin.copyAlbumsTitle, copy.albums_title_bs, copy.albums_title_en, alt.onBs, alt.onEn, 2)}
              {block(m.admin.copyAlbumsEmpty, copy.albums_empty_bs, copy.albums_empty_en, ale.onBs, ale.onEn, 3)}
              {block(
                m.admin.copyAlbumsOpenSeries,
                copy.albums_open_series_bs,
                copy.albums_open_series_en,
                alo.onBs,
                alo.onEn,
                2,
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="about" className="border-border/50">
          <AccordionTrigger className="py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:no-underline sm:py-4">
            {m.admin.copySectionAbout}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-2">
              {block(m.admin.copyAboutKicker, copy.about_kicker_bs, copy.about_kicker_en, ak.onBs, ak.onEn, 2)}
              {block(m.admin.copyAboutTitle, copy.about_title_bs, copy.about_title_en, at.onBs, at.onEn, 2)}
              {block(m.admin.copyAboutP1, copy.about_p1_bs, copy.about_p1_en, a1.onBs, a1.onEn, 4)}
              {block(m.admin.copyAboutP2, copy.about_p2_bs, copy.about_p2_en, a2.onBs, a2.onEn, 4)}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact" className="border-border/50">
          <AccordionTrigger className="py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:no-underline sm:py-4">
            {m.admin.copySectionContact}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-2">
              <div className="space-y-2 rounded-sm border border-border/50 bg-muted/10 p-3 sm:p-4">
                <p className="text-xs font-medium text-foreground">{m.admin.copyContactPublicEmail}</p>
                <Input
                  type="email"
                  autoComplete="off"
                  value={copy.contact_public_email}
                  onChange={(e) => setCopy((p) => ({ ...p, contact_public_email: e.target.value }))}
                  className="max-w-xl rounded-none border-border bg-background/80"
                  placeholder="photachka@gmail.com"
                />
              </div>
              <div className="space-y-2 rounded-sm border border-border/50 bg-muted/10 p-3 sm:p-4">
                <p className="text-xs font-medium text-foreground">{m.admin.copyContactInstagramUrl}</p>
                <Input
                  type="url"
                  autoComplete="off"
                  value={copy.contact_instagram_url}
                  onChange={(e) => setCopy((p) => ({ ...p, contact_instagram_url: e.target.value }))}
                  className="max-w-xl rounded-none border-border bg-background/80"
                  placeholder="https://instagram.com/photachka/"
                />
              </div>
              {block(
                m.admin.copyContactInstagramLabel,
                copy.contact_instagram_label_bs,
                copy.contact_instagram_label_en,
                cil.onBs,
                cil.onEn,
                2,
              )}
              {block(m.admin.copyContactKicker, copy.contact_kicker_bs, copy.contact_kicker_en, ck.onBs, ck.onEn, 2)}
              {block(m.admin.copyContactTitle, copy.contact_title_bs, copy.contact_title_en, ct.onBs, ct.onEn, 2)}
              {block(m.admin.copyContactIntro, copy.contact_intro_bs, copy.contact_intro_en, ci.onBs, ci.onEn, 4)}
              {block(m.admin.copyContactLocation, copy.contact_location_bs, copy.contact_location_en, cl.onBs, cl.onEn, 2)}
              {block(
                m.admin.copyContactLabelName,
                copy.contact_label_name_bs,
                copy.contact_label_name_en,
                cln.onBs,
                cln.onEn,
                2,
              )}
              {block(
                m.admin.copyContactLabelEmail,
                copy.contact_label_email_bs,
                copy.contact_label_email_en,
                cle.onBs,
                cle.onEn,
                2,
              )}
              {block(
                m.admin.copyContactLabelMessage,
                copy.contact_label_message_bs,
                copy.contact_label_message_en,
                clm.onBs,
                clm.onEn,
                2,
              )}
              {block(m.admin.copyContactPhName, copy.contact_ph_name_bs, copy.contact_ph_name_en, cpn.onBs, cpn.onEn, 2)}
              {block(m.admin.copyContactPhEmail, copy.contact_ph_email_bs, copy.contact_ph_email_en, cpe.onBs, cpe.onEn, 2)}
              {block(
                m.admin.copyContactPhMessage,
                copy.contact_ph_message_bs,
                copy.contact_ph_message_en,
                cpm.onBs,
                cpm.onEn,
                3,
              )}
              {block(m.admin.copyContactSubmit, copy.contact_submit_bs, copy.contact_submit_en, cs.onBs, cs.onEn, 2)}
              {block(
                m.admin.copyContactMailPrefix,
                copy.contact_mail_subject_prefix_bs,
                copy.contact_mail_subject_prefix_en,
                cmp.onBs,
                cmp.onEn,
                2,
              )}
              {block(
                m.admin.copyContactMailFallback,
                copy.contact_mail_subject_fallback_bs,
                copy.contact_mail_subject_fallback_en,
                cmf.onBs,
                cmf.onEn,
                2,
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button type="submit" disabled={updateCopy.isPending}>
        {updateCopy.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {m.admin.homePageCopySave}
      </Button>
    </form>
  );
}
