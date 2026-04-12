import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSiteSettings,
  useAddHomeHeroSlides,
  useClearHomeHero,
  useRemoveHomeHeroSlideAt,
  useMoveHomeHeroSlide,
  useUpdateHomeHeroInterval,
  useUpdateHomeGridLayout,
} from "@/hooks/useSiteSettings";
import { parseHomeGridColumns, parseHomeLastRowAlign } from "@/lib/homeGridLayout";
import { toast } from "sonner";
import { useI18n } from "@/contexts/LanguageContext";
import { partitionFilesByUploadLimit } from "@/lib/uploadLimits";
import { clampHeroIntervalSeconds, MAX_HOME_HERO_SLIDES, parseHomeHeroSlides } from "@/lib/homeHeroSlides";

export default function AdminHomeHeroPage() {
  const { m } = useI18n();
  const { data: settings, isLoading } = useSiteSettings();
  const addSlides = useAddHomeHeroSlides();
  const clearHero = useClearHomeHero();
  const removeAt = useRemoveHomeHeroSlideAt();
  const moveSlide = useMoveHomeHeroSlide();
  const updateInterval = useUpdateHomeHeroInterval();
  const updateGridLayout = useUpdateHomeGridLayout();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [intervalDraft, setIntervalDraft] = useState("6");

  const slides = parseHomeHeroSlides(settings?.home_hero_slides);

  useEffect(() => {
    setIntervalDraft(String(settings?.home_hero_interval_seconds ?? 6));
  }, [settings?.home_hero_interval_seconds]);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (valid.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      await addSlides.mutateAsync(valid);
      toast.success(m.admin.homeHeroSuccess);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.startsWith("IMAGE_TOO_LARGE:")) {
        toast.error(m.admin.uploadError);
      } else if (msg === "HOME_HERO_FULL") {
        toast.error(m.admin.homeHeroMaxSlides);
      } else {
        toast.error(m.admin.homeHeroError);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveAt = async (index: number) => {
    if (!confirm(m.admin.homeHeroConfirmRemove)) return;
    try {
      await removeAt.mutateAsync(index);
      toast.success(m.admin.homeHeroSlideRemoved);
    } catch {
      toast.error(m.admin.homeHeroClearError);
    }
  };

  const handleClearAll = async () => {
    if (slides.length === 0) return;
    if (!confirm(m.admin.homeHeroConfirmClearAll)) return;
    try {
      await clearHero.mutateAsync();
      toast.success(m.admin.homeHeroClearSuccess);
    } catch {
      toast.error(m.admin.homeHeroClearError);
    }
  };

  const saveInterval = async () => {
    const n = Number(intervalDraft);
    if (!Number.isFinite(n)) return;
    try {
      await updateInterval.mutateAsync(clampHeroIntervalSeconds(n));
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
        <div className="mt-8 space-y-8">
          {settings && (
          <div className="space-y-4 rounded-sm border border-border/60 bg-muted/10 p-4">
            <div>
              <h3 className="text-base font-semibold">{m.admin.homeGridSectionTitle}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{m.admin.homeGridHint}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-sm font-medium text-foreground">{m.admin.homeGridFeaturedTitle}</p>
                <div className="space-y-2">
                  <Label className="text-sm">{m.admin.homeGridColumnsLabel}</Label>
                  <Select
                    disabled={updateGridLayout.isPending}
                    value={String(parseHomeGridColumns(settings.featured_grid_columns))}
                    onValueChange={(v) => {
                      const n = Number(v);
                      if (n !== 2 && n !== 3 && n !== 4) return;
                      updateGridLayout.mutate(
                        { featured_grid_columns: n },
                        {
                          onSuccess: () => toast.success(m.admin.homeGridUpdated),
                          onError: () => toast.error(m.admin.homeGridUpdateError),
                        },
                      );
                    }}
                  >
                    <SelectTrigger className="max-w-xs rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">{m.admin.homeGridCols2}</SelectItem>
                      <SelectItem value="3">{m.admin.homeGridCols3}</SelectItem>
                      <SelectItem value="4">{m.admin.homeGridCols4}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">{m.admin.homeGridLastRowLabel}</Label>
                  <Select
                    disabled={updateGridLayout.isPending}
                    value={parseHomeLastRowAlign(settings.featured_last_row_align)}
                    onValueChange={(v) => {
                      if (v !== "start" && v !== "center") return;
                      updateGridLayout.mutate(
                        { featured_last_row_align: v },
                        {
                          onSuccess: () => toast.success(m.admin.homeGridUpdated),
                          onError: () => toast.error(m.admin.homeGridUpdateError),
                        },
                      );
                    }}
                  >
                    <SelectTrigger className="max-w-xs rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">{m.admin.homeGridLastRowStart}</SelectItem>
                      <SelectItem value="center">{m.admin.homeGridLastRowCenter}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium text-foreground">{m.admin.homeGridAlbumsTitle}</p>
                <div className="space-y-2">
                  <Label className="text-sm">{m.admin.homeGridColumnsLabel}</Label>
                  <Select
                    disabled={updateGridLayout.isPending}
                    value={String(parseHomeGridColumns(settings.albums_grid_columns))}
                    onValueChange={(v) => {
                      const n = Number(v);
                      if (n !== 2 && n !== 3 && n !== 4) return;
                      updateGridLayout.mutate(
                        { albums_grid_columns: n },
                        {
                          onSuccess: () => toast.success(m.admin.homeGridUpdated),
                          onError: () => toast.error(m.admin.homeGridUpdateError),
                        },
                      );
                    }}
                  >
                    <SelectTrigger className="max-w-xs rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">{m.admin.homeGridCols2}</SelectItem>
                      <SelectItem value="3">{m.admin.homeGridCols3}</SelectItem>
                      <SelectItem value="4">{m.admin.homeGridCols4}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">{m.admin.homeGridLastRowLabel}</Label>
                  <Select
                    disabled={updateGridLayout.isPending}
                    value={parseHomeLastRowAlign(settings.albums_last_row_align)}
                    onValueChange={(v) => {
                      if (v !== "start" && v !== "center") return;
                      updateGridLayout.mutate(
                        { albums_last_row_align: v },
                        {
                          onSuccess: () => toast.success(m.admin.homeGridUpdated),
                          onError: () => toast.error(m.admin.homeGridUpdateError),
                        },
                      );
                    }}
                  >
                    <SelectTrigger className="max-w-xs rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">{m.admin.homeGridLastRowStart}</SelectItem>
                      <SelectItem value="center">{m.admin.homeGridLastRowCenter}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="hero-interval" className="text-sm font-medium">
              {m.admin.homeHeroIntervalLabel}
            </Label>
            <p className="text-xs text-muted-foreground">{m.admin.homeHeroIntervalHint}</p>
            <div className="flex max-w-xs flex-col gap-2 sm:flex-row sm:items-end">
              <Input
                id="hero-interval"
                type="number"
                min={3}
                max={120}
                value={intervalDraft}
                onChange={(e) => setIntervalDraft(e.target.value)}
                onBlur={() => void saveInterval()}
                className="rounded-none"
              />
              <Button type="button" variant="secondary" size="sm" className="rounded-none" onClick={() => void saveInterval()}>
                {m.admin.homeHeroApplyInterval}
              </Button>
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold">{m.admin.homeHeroImageSection}</h3>
              <p className="text-xs text-muted-foreground">
                {m.admin.homeHeroSlidesCount
                  .replace("{current}", String(slides.length))
                  .replace("{max}", String(MAX_HOME_HERO_SLIDES))}
              </p>
            </div>

            {slides.length === 0 ? (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-sm border border-border/60 bg-muted/40 px-4 sm:aspect-video md:aspect-[21/9] lg:aspect-[3/1]">
                <p className="text-center text-sm text-muted-foreground">{m.admin.homeHeroEmpty}</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {slides.map((url, index) => (
                  <li
                    key={url}
                    className="flex flex-col gap-3 overflow-hidden rounded-sm border border-border/60 bg-muted/20 sm:flex-row sm:items-stretch"
                  >
                    <img
                      src={url}
                      alt=""
                      className="aspect-[16/10] w-full object-cover object-center sm:aspect-auto sm:h-28 sm:w-44 sm:shrink-0"
                    />
                    <div className="flex flex-1 flex-wrap items-center gap-2 p-3">
                      <span className="text-xs text-muted-foreground">
                        {index + 1}. {url.split("/").pop()?.slice(0, 40) ?? "…"}
                      </span>
                      <div className="ml-auto flex flex-wrap gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-none"
                          disabled={moveSlide.isPending || index === 0}
                          aria-label={m.admin.homeHeroMoveSlideUpAria}
                          onClick={() => void moveSlide.mutateAsync({ from: index, to: index - 1 })}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-none"
                          disabled={moveSlide.isPending || index === slides.length - 1}
                          aria-label={m.admin.homeHeroMoveSlideDownAria}
                          onClick={() => void moveSlide.mutateAsync({ from: index, to: index + 1 })}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-none text-destructive hover:bg-destructive/10 hover:text-destructive"
                          disabled={removeAt.isPending}
                          aria-label={m.admin.homeHeroSlideRemoveAria}
                          onClick={() => void handleRemoveAt(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFiles}
            />
            <Button
              type="button"
              variant="outline"
              disabled={addSlides.isPending || slides.length >= MAX_HOME_HERO_SLIDES}
              onClick={() => fileInputRef.current?.click()}
            >
              {addSlides.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {m.admin.homeHeroUpload}
            </Button>
            {slides.length > 0 && (
              <Button
                type="button"
                variant="outline"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                disabled={clearHero.isPending}
                onClick={() => void handleClearAll()}
              >
                {clearHero.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                {m.admin.homeHeroClearAll}
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
