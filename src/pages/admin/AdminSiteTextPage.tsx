import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useI18n } from "@/contexts/LanguageContext";
import HomePageCopyForm from "./HomePageCopyForm";

export default function AdminSiteTextPage() {
  const { m } = useI18n();
  const { data: settings, isLoading } = useSiteSettings();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="font-heading text-xl sm:text-2xl">{m.admin.siteTextPageTitle}</h2>
      <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">{m.admin.homePageCopyHint}</p>

      {isLoading && (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && <HomePageCopyForm settings={settings} />}
    </motion.div>
  );
}
