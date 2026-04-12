import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Tables } from "@/integrations/supabase/types";
import { useI18n } from "@/contexts/LanguageContext";
import { siteLine } from "@/lib/siteCopy";

type SiteSettings = Tables<"site_settings">;

const DEFAULT_CONTACT_EMAIL = "photachka@gmail.com";
const DEFAULT_INSTAGRAM_URL = "https://instagram.com/photachka/";

function resolvePublicEmail(raw: string | null | undefined): string {
  const t = raw?.trim();
  return t ? t : DEFAULT_CONTACT_EMAIL;
}

function resolveInstagramUrl(raw: string | null | undefined): string {
  const trimmed = raw?.trim() ?? "";
  const href = trimmed || DEFAULT_INSTAGRAM_URL;
  if (/^https?:\/\//i.test(href)) return href;
  return `https://${href}`;
}

interface ContactSectionProps {
  siteSettings?: SiteSettings | null;
}

export default function ContactSection({ siteSettings }: ContactSectionProps) {
  const { m, locale } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailPrefix = siteLine(
    locale,
    siteSettings?.contact_mail_subject_prefix_bs,
    siteSettings?.contact_mail_subject_prefix_en,
    m.contact.mailSubjectPrefix,
  );
  const mailFallback = siteLine(
    locale,
    siteSettings?.contact_mail_subject_fallback_bs,
    siteSettings?.contact_mail_subject_fallback_en,
    m.contact.mailSubjectFallback,
  );

  const publicEmail = resolvePublicEmail(siteSettings?.contact_public_email);
  const instagramHref = resolveInstagramUrl(siteSettings?.contact_instagram_url);
  const instagramLabel = siteLine(
    locale,
    siteSettings?.contact_instagram_label_bs,
    siteSettings?.contact_instagram_label_en,
    m.contact.instagramLinkLabel,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${mailPrefix}${name || mailFallback}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${publicEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/40 py-16 sm:scroll-mt-24 sm:py-20 md:py-36">
      <div className="container">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {siteLine(locale, siteSettings?.contact_kicker_bs, siteSettings?.contact_kicker_en, m.contact.kicker)}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-normal min-[380px]:text-4xl md:mt-4 md:text-5xl">
              {siteLine(locale, siteSettings?.contact_title_bs, siteSettings?.contact_title_en, m.contact.title)}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteLine(locale, siteSettings?.contact_intro_bs, siteSettings?.contact_intro_en, m.contact.intro)}
            </p>

            <ul className="mt-12 space-y-6 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                <a href={`mailto:${publicEmail}`} className="transition-colors hover:text-foreground">
                  {publicEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                <span>
                  {siteLine(locale, siteSettings?.contact_location_bs, siteSettings?.contact_location_en, m.contact.location)}
                </span>
              </li>
            </ul>

            <div className="mt-8 flex gap-6 text-[11px] uppercase tracking-[0.2em]">
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {instagramLabel}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 border border-border/60 bg-card/30 p-4 sm:space-y-8 sm:p-8 md:p-10"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {siteLine(
                    locale,
                    siteSettings?.contact_label_name_bs,
                    siteSettings?.contact_label_name_en,
                    m.contact.labelName,
                  )}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-none border-border bg-background/50"
                  placeholder={siteLine(
                    locale,
                    siteSettings?.contact_ph_name_bs,
                    siteSettings?.contact_ph_name_en,
                    m.contact.phName,
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {siteLine(
                    locale,
                    siteSettings?.contact_label_email_bs,
                    siteSettings?.contact_label_email_en,
                    m.contact.labelEmail,
                  )}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none border-border bg-background/50"
                  placeholder={siteLine(
                    locale,
                    siteSettings?.contact_ph_email_bs,
                    siteSettings?.contact_ph_email_en,
                    m.contact.phEmail,
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {siteLine(
                    locale,
                    siteSettings?.contact_label_message_bs,
                    siteSettings?.contact_label_message_en,
                    m.contact.labelMessage,
                  )}
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="resize-none rounded-none border-border bg-background/50"
                  placeholder={siteLine(
                    locale,
                    siteSettings?.contact_ph_message_bs,
                    siteSettings?.contact_ph_message_en,
                    m.contact.phMessage,
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              >
                {siteLine(locale, siteSettings?.contact_submit_bs, siteSettings?.contact_submit_en, m.contact.submit)}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
