import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/LanguageContext";

export default function Footer() {
  const { m } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80">
      <div className="container flex flex-col gap-6 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-12 md:flex-row md:items-center md:justify-between">
        <p className="text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px] sm:tracking-[0.25em] md:text-left">
          © {year} Photachka · {m.footer.copyrightNote}
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.2em] sm:justify-start sm:gap-8 sm:text-[11px] md:justify-end">
          <Link to="/gallery" className="text-muted-foreground transition-colors hover:text-foreground">
            {m.footer.gallery}
          </Link>
          <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
            {m.footer.inquiries}
          </Link>
          <Link to="/#about" className="text-muted-foreground transition-colors hover:text-foreground">
            {m.footer.studio}
          </Link>
        </div>
      </div>
    </footer>
  );
}
