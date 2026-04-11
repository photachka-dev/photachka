import { useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings, useUploadHomeHero, useClearHomeHero } from "@/hooks/useSiteSettings";
import { toast } from "sonner";
import { useI18n } from "@/contexts/LanguageContext";
import { partitionFilesByUploadLimit } from "@/lib/uploadLimits";

export default function AdminHomeHeroPage() {
  const { m } = useI18n();
  const { data: settings, isLoading } = useSiteSettings();
  const uploadHero = useUploadHomeHero();
  const clearHero = useClearHomeHero();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const { valid, tooLarge } = partitionFilesByUploadLimit(files);
    if (tooLarge.length > 0) {
      toast.warning(
        m.admin.uploadFilesSkippedOverLimit.replace(
          "{names}",
          tooLarge.map((f) => f.name).join(", "),
        ),
      );
    }
    const file = valid[0];
    if (!file) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      await uploadHero.mutateAsync(file);
      toast.success(m.admin.homeHeroSuccess);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.startsWith("IMAGE_TOO_LARGE:")) {
        toast.error(m.admin.uploadError);
      } else {
        toast.error(m.admin.homeHeroError);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClear = async () => {
    if (!settings?.home_hero_image_url) return;
    if (!confirm(m.admin.homeHeroConfirmRemove)) return;
    try {
      await clearHero.mutateAsync();
      toast.success(m.admin.homeHeroClearSuccess);
    } catch {
      toast.error(m.admin.homeHeroClearError);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="font-heading text-xl sm:text-2xl">{m.admin.homeHeroTitle}</h2>
      <p className="mt-2 max-w-xl text-pretty text-sm text-muted-foreground">{m.admin.homeHeroHint}</p>

      {isLoading && (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && (
        <div className="mt-8 space-y-6">
          <div className="overflow-hidden rounded-sm border border-border/60 bg-muted/20">
            {settings?.home_hero_image_url ? (
              <img
                src={settings.home_hero_image_url}
                alt=""
                className="aspect-[4/5] w-full object-cover object-center sm:aspect-video md:aspect-[21/9] lg:aspect-[3/1]"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center bg-muted/40 px-4 sm:aspect-video md:aspect-[21/9] lg:aspect-[3/1]">
                <p className="text-center text-sm text-muted-foreground">{m.admin.homeHeroEmpty}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploadHero.isPending}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadHero.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {m.admin.homeHeroUpload}
            </Button>
            {settings?.home_hero_image_url && (
              <Button
                type="button"
                variant="outline"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                disabled={clearHero.isPending}
                onClick={() => void handleClear()}
              >
                {clearHero.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                {m.admin.homeHeroRemove}
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
