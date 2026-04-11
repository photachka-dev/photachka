import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function NavLinks({
  className,
  onNavigate,
  activePath,
}: {
  className?: string;
  onNavigate?: () => void;
  activePath: string;
}) {
  const { m } = useI18n();
  const items = useMemo(
    () =>
      [
        { label: m.nav.about, href: "/#about" },
        { label: m.nav.gallery, href: "/gallery" },
        { label: m.nav.contact, href: "/contact" },
      ] as const,
    [m],
  );

  return (
    <ul className={cn("flex flex-col gap-1 md:flex-row md:items-center md:gap-10", className)}>
      {items.map((item) => {
        const isGallery = item.href === "/gallery";
        const isContact = item.href === "/contact";
        const active = isGallery
          ? activePath.startsWith("/gallery")
          : isContact
            ? activePath === "/contact"
            : false;
        return (
          <li key={item.href}>
            <Link
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const { m } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        "pt-[env(safe-area-inset-top)]",
        scrolled
          ? "border-b border-border/60 bg-background/90 py-2.5 backdrop-blur-xl sm:py-3"
          : "border-b border-transparent bg-transparent py-4 md:py-6",
      )}
    >
      <nav className="container flex items-center justify-between gap-2 sm:gap-3">
        <Link
          to="/"
          className="shrink-0 font-serif text-lg font-medium tracking-[0.02em] text-foreground min-[380px]:text-xl md:text-2xl"
        >
          Photachka
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4 md:gap-6">
          <NavLinks className="hidden md:flex" activePath={pathname} />
          <LanguageSwitcher className="shrink-0" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border/80 text-foreground transition-colors hover:bg-muted/50"
                aria-label={m.navAria.openMenu}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,320px)] border-border bg-background">
              <SheetHeader>
                <SheetTitle className="font-serif text-left text-xl">{m.sheet.menuTitle}</SheetTitle>
              </SheetHeader>
              <div className="mt-10">
                <NavLinks activePath={pathname} onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
