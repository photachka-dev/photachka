import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/home/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[max(7rem,env(safe-area-inset-top)+5.5rem)] sm:pt-28 md:pt-36">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
