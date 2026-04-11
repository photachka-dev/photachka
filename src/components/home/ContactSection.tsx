import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { m } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${m.contact.mailSubjectPrefix}${name || m.contact.mailSubjectFallback}`,
    );
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:photachka@gmail.com?subject=${subject}&body=${body}`;
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
              {m.contact.kicker}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-normal min-[380px]:text-4xl md:mt-4 md:text-5xl">
              {m.contact.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{m.contact.intro}</p>

            <ul className="mt-12 space-y-6 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                <a href="mailto:photachka@gmail.com" className="transition-colors hover:text-foreground">
                  photachka@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                <span>{m.contact.location}</span>
              </li>
            </ul>

            <div className="mt-8 flex gap-6 text-[11px] uppercase tracking-[0.2em]">
              <a
                href="https://instagram.com/photachka/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Instagram
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
                  {m.contact.labelName}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-none border-border bg-background/50"
                  placeholder={m.contact.phName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {m.contact.labelEmail}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none border-border bg-background/50"
                  placeholder={m.contact.phEmail}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {m.contact.labelMessage}
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="resize-none rounded-none border-border bg-background/50"
                  placeholder={m.contact.phMessage}
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              >
                {m.contact.submit}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
