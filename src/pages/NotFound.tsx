import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { m } = useI18n();
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:py-32">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground sm:text-[11px] sm:tracking-[0.35em]">
          404
        </p>
        <h1 className="mt-3 text-center font-serif text-4xl font-normal min-[380px]:text-5xl md:mt-4 md:text-6xl">
          {m.notFound.title}
        </h1>
        <p className="mt-4 max-w-md text-center text-muted-foreground">{m.notFound.description}</p>
        <Link
          to="/"
          className="mt-10 border border-border px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground/60 hover:bg-muted/30"
        >
          {m.notFound.backHome}
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
