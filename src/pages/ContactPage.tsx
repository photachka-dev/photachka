import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/home/ContactSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ContactPage() {
  const { data: siteSettings } = useSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[max(7rem,env(safe-area-inset-top)+5.5rem)] sm:pt-28 md:pt-36">
        <ContactSection siteSettings={siteSettings} />
      </main>
      <Footer />
    </div>
  );
}
