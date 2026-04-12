import { useI18n } from "@/contexts/LanguageContext";

export default function Footer() {
  const { m } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80">
      <div className="container py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center sm:py-12">
        <p className="font-serif text-lg font-normal text-foreground sm:text-xl">{m.footer.brand}</p>
        <p className="mt-2 text-[11px] tabular-nums tracking-wide text-muted-foreground sm:text-xs">
          © {year} · {m.footer.rights}
        </p>
      </div>
    </footer>
  );
}
