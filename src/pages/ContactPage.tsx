import { motion } from "framer-motion";
import { Mail, MapPin, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Kontaktirajte Me</h1>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Zainteresirani ste za saradnju? Rado bih čuo/čula od vas.
            </p>

            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Instagram className="w-5 h-5" />
                <a href="https://instagram.com/photachka/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  @photachka
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <a href="mailto:photachka@gmail.com" className="hover:text-foreground transition-colors">
                  photachka@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Sarajevo, BiH · Radim i na drugim lokacijama</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
