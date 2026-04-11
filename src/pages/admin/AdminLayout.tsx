import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-secondary text-secondary-foreground"
      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  );

export default function AdminLayout() {
  const { m } = useI18n();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b pt-[env(safe-area-inset-top)]">
        <div className="container flex min-h-14 flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:h-16 sm:flex-nowrap sm:py-0">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 sm:flex-initial">
            <Button variant="ghost" size="sm" className="shrink-0 px-2 sm:px-3" asChild>
              <Link to="/">
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden min-[360px]:inline">{m.admin.home}</span>
              </Link>
            </Button>
            <h1 className="min-w-0 truncate font-heading text-lg sm:text-xl">{m.admin.title}</h1>
          </div>
          <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" className="shrink-0 px-2 sm:px-3" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">{m.admin.signOut}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl py-6 sm:py-8 xl:max-w-4xl 2xl:max-w-5xl">
        <nav className="mb-6 flex flex-wrap gap-2 border-b border-border/60 pb-4 sm:mb-8">
          <NavLink to="/admin/albums" className={navClass} end>
            {m.admin.navAlbums}
          </NavLink>
          <NavLink to="/admin/featured" className={navClass}>
            {m.admin.navFeatured}
          </NavLink>
          <NavLink to="/admin/homepage" className={navClass}>
            {m.admin.navHomepage}
          </NavLink>
        </nav>
        <Outlet />
      </main>
    </div>
  );
}
