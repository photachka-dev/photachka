import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/LanguageContext";
import type { Locale } from "@/i18n/messages";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, m } = useI18n();

  const btn = (code: Locale, label: string) => (
    <button
      type="button"
      onClick={() => setLocale(code)}
      className={cn(
        "min-w-[2rem] px-1 py-1 font-medium transition-colors",
        locale === code ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
      )}
      aria-pressed={locale === code}
      aria-label={code === "bs" ? "Bosanski" : "English"}
    >
      {label}
    </button>
  );

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-sm border border-border/70 bg-background/40 px-1 py-0.5 backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label="Language / Jezik"
    >
      {btn("bs", m.lang.bs)}
      <span className="text-muted-foreground/40 select-none" aria-hidden>
        |
      </span>
      {btn("en", m.lang.en)}
    </div>
  );
}
