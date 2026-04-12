import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  HOME_HASH_SECTION_IDS,
  scrollHomeSectionIntoView,
  type HomeHashSectionId,
} from "@/lib/homeSectionScroll";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { siteLine } from "@/lib/siteCopy";
import { useI18n } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Tables } from "@/integrations/supabase/types";
import type { Locale, Messages } from "@/i18n/messages";

/** Pomak ispod fiksne trake (usklađeno sa scroll-mt sekcija). */
const NAV_SCROLL_OFFSET_PX = 104;

function computeHomeActiveSection(): HomeHashSectionId | null {
  const featured = document.getElementById("featured");
  if (!featured) return null;
  const y = window.scrollY + NAV_SCROLL_OFFSET_PX;
  const featuredTop = featured.getBoundingClientRect().top + window.scrollY;
  if (y < featuredTop - 40) return null;

  let current: HomeHashSectionId | null = null;
  for (const id of HOME_HASH_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= y) current = id;
  }
  return current;
}

type NavItem = { key: string; label: string; sectionId: HomeHashSectionId };

function NavLinks({
  className,
  items,
  pathname,
  navigate,
  isActive,
  onNavigate,
}: {
  className?: string;
  items: NavItem[];
  pathname: string;
  navigate: ReturnType<typeof useNavigate>;
  isActive: (item: NavItem) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <ul className={cn("flex flex-col gap-1 md:flex-row md:items-center md:gap-5 lg:gap-7", className)}>
      {items.map((item) => {
        const active = isActive(item);
        return (
          <li key={item.key}>
            <Link
              to={{ pathname: "/", hash: item.sectionId }}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  void navigate({ pathname: "/", hash: item.sectionId }, { replace: true, preventScrollReset: true });
                  requestAnimationFrame(() => scrollHomeSectionIntoView(item.sectionId));
                }
                onNavigate?.();
              }}
              aria-current={active ? "true" : undefined}
              className={cn(
                "text-[11px] font-medium leading-snug tracking-[0.12em] transition-colors duration-300",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              title={item.label}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

type SiteSettings = Tables<"site_settings">;

function navLabelsFromSettings(m: Messages, locale: Locale, s: SiteSettings | null | undefined) {
  return {
    featured: siteLine(locale, s?.featured_title_bs, s?.featured_title_en, m.featured.title),
    albums: siteLine(locale, s?.albums_title_bs, s?.albums_title_en, m.albumsSection.title),
    about: siteLine(locale, s?.about_title_bs, s?.about_title_en, m.about.title),
    contact: siteLine(locale, s?.contact_title_bs, s?.contact_title_en, m.contact.title),
  };
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { m, locale } = useI18n();
  const { data: siteSettings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<HomeHashSectionId | null>(null);

  const labels = useMemo(
    () => navLabelsFromSettings(m, locale, siteSettings),
    [m, locale, siteSettings],
  );

  const navItems = useMemo<NavItem[]>(
    () => [
      { key: "featured", label: labels.featured, sectionId: "featured" },
      { key: "albums", label: labels.albums, sectionId: "albums" },
      { key: "about", label: labels.about, sectionId: "about" },
      { key: "contact", label: labels.contact, sectionId: "contact" },
    ],
    [labels],
  );

  const isActive = useCallback(
    (item: NavItem) => {
      if (pathname === "/contact" && item.sectionId === "contact") return true;
      if (pathname.startsWith("/gallery") && item.sectionId === "albums") return true;
      if (pathname !== "/") return false;
      return activeSection === item.sectionId;
    },
    [pathname, activeSection],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const tick = () => setActiveSection(computeHomeActiveSection());
    tick();
    const t0 = window.setTimeout(tick, 0);
    const t1 = window.setTimeout(tick, 120);
    const t2 = window.setTimeout(tick, 400);
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    window.addEventListener("hashchange", tick);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      window.removeEventListener("hashchange", tick);
    };
  }, [pathname]);

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
      <nav className="container flex items-center justify-between gap-2 sm:gap-3" aria-label="Main">
        <Link
          to="/"
          onClick={(e) => {
            if (pathname !== "/") return;
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            void navigate({ pathname: "/", hash: "" }, { replace: true, preventScrollReset: true });
          }}
          className="shrink-0 font-serif text-lg font-medium tracking-[0.02em] text-foreground min-[380px]:text-xl md:text-2xl"
        >
          Photachka
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4 md:gap-6">
          <NavLinks
            className="hidden md:flex"
            items={navItems}
            pathname={pathname}
            navigate={navigate}
            isActive={isActive}
          />
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
                <NavLinks
                  items={navItems}
                  pathname={pathname}
                  navigate={navigate}
                  isActive={isActive}
                  onNavigate={() => setOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
