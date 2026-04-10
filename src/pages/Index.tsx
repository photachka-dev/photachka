import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-foreground/5" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl tracking-tight leading-tight">
              Capturing Moments,
              <br />
              <span className="text-muted-foreground">Telling Stories</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A curated collection of photographs exploring light, shadow, and the beauty found in everyday moments.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="gap-2">
                <Link to="/gallery">
                  View Gallery <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* About section */}
        <section className="py-24 border-t">
          <div className="container max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl mb-6">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to my photography portfolio. I specialize in capturing authentic moments — 
                from sweeping landscapes to intimate portraits. Each photograph is a story waiting 
                to be discovered. Browse through my albums and let the images speak for themselves.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
