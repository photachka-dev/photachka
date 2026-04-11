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
          <div className="absolute inset-0 bg-primary/5" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-3xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl tracking-tight leading-tight">
              Hvatam Trenutke,
              <br />
              <span className="text-muted-foreground">Pričam Priče</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Pažljivo odabrana kolekcija fotografija koja istražuje svjetlost, sjenu i ljepotu pronađenu u svakodnevnim trenucima.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="gap-2">
                <Link to="/gallery">
                  Pogledaj Galeriju <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* O meni */}
        <section className="py-24 border-t">
          <div className="container max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl mb-6">O Meni</h2>
              <p className="text-muted-foreground leading-relaxed">
                Dobrodošli u moj fotografski portfolio. Specijaliziram se za hvatanje autentičnih trenutaka — 
                od pejzaža koji oduzimaju dah do intimnih portreta. Svaka fotografija je priča koja čeka 
                da bude otkrivena. Pregledajte moje albume i pustite da slike govore same za sebe.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
