import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
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
            <h1 className="font-heading text-4xl md:text-5xl mb-4">Get in Touch</h1>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Interested in working together? I'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <a href="mailto:hello@example.com" className="hover:text-foreground transition-colors">
                  hello@example.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>New York, NY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
