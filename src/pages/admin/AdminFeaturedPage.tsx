import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Loader2, Plus, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAdminPhotosForFeatured,
  useSyncFeaturedPhotos,
  type PhotoWithAlbum,
} from "@/hooks/usePhotos";
import { toast } from "sonner";
import { useI18n } from "@/contexts/LanguageContext";
import { albumDisplayTitle } from "@/lib/albumTitle";

export default function AdminFeaturedPage() {
  const { locale, m } = useI18n();
  const { data: allPhotos, isLoading } = useAdminPhotosForFeatured();
  const syncFeatured = useSyncFeaturedPhotos();

  const { featured, pool } = useMemo(() => {
    if (!allPhotos) return { featured: [] as PhotoWithAlbum[], pool: [] as PhotoWithAlbum[] };
    const f: PhotoWithAlbum[] = [];
    const p: PhotoWithAlbum[] = [];
    for (const ph of allPhotos) {
      if (ph.featured_order != null) f.push(ph);
      else p.push(ph);
    }
    f.sort((a, b) => (a.featured_order ?? 0) - (b.featured_order ?? 0));
    return { featured: f, pool: p };
  }, [allPhotos]);

  const applyOrder = async (orderedIds: string[]) => {
    try {
      await syncFeatured.mutateAsync(orderedIds);
    } catch {
      toast.error(m.admin.featuredSyncError);
    }
  };

  const moveFeatured = (id: string, dir: "up" | "down") => {
    const ids = featured.map((p) => p.id);
    const i = ids.indexOf(id);
    if (i < 0) return;
    const j = dir === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    void applyOrder(ids);
  };

  const removeFeatured = (id: string) => {
    void applyOrder(featured.filter((p) => p.id !== id).map((p) => p.id));
  };

  const addFeatured = (id: string) => {
    void applyOrder([...featured.map((p) => p.id), id]);
  };

  const pending = syncFeatured.isPending;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="font-heading text-xl sm:text-2xl">{m.admin.featuredAdminTitle}</h2>
      <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">{m.admin.featuredAdminHint}</p>

      {isLoading && (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && allPhotos && allPhotos.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">{m.admin.featuredAdminNoPhotos}</p>
      )}

      {!isLoading && allPhotos && allPhotos.length > 0 && (
        <div className="mt-10 space-y-12">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-foreground/80" />
              <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {m.admin.featuredAdminSelected}
              </h3>
              <span className="text-xs text-muted-foreground">({featured.length})</span>
            </div>
            {featured.length === 0 ? (
              <p className="rounded-sm border border-dashed border-border/60 bg-muted/20 p-6 text-sm text-muted-foreground">
                {m.admin.featuredAdminEmptySelection}
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {featured.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square overflow-hidden border border-border/60 bg-muted"
                  >
                    <img src={photo.image_url} alt="" className="h-full w-full object-cover" />
                    <p className="absolute inset-x-0 bottom-0 truncate bg-background/85 px-1 py-0.5 text-[10px] text-muted-foreground">
                      {albumDisplayTitle(photo.album, locale)}
                    </p>
                    <div className="absolute left-1 top-1 flex flex-col gap-0.5 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-7 w-7 bg-background/90 shadow-sm"
                        disabled={index === 0 || pending}
                        aria-label={m.admin.featuredAdminMoveUpAria}
                        onClick={() => moveFeatured(photo.id, "up")}
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-7 w-7 bg-background/90 shadow-sm"
                        disabled={index === featured.length - 1 || pending}
                        aria-label={m.admin.featuredAdminMoveDownAria}
                        onClick={() => moveFeatured(photo.id, "down")}
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute right-1 top-1 h-7 w-7 bg-background/90 shadow-sm opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
                      disabled={pending}
                      aria-label={m.admin.featuredAdminRemoveAria}
                      onClick={() => removeFeatured(photo.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
              {m.admin.featuredAdminPool}
            </h3>
            {pool.length === 0 ? (
              <p className="text-sm text-muted-foreground">{m.admin.featuredAdminPoolEmpty}</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {pool.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square overflow-hidden border border-border/40 bg-muted"
                  >
                    <img src={photo.image_url} alt="" className="h-full w-full object-cover" />
                    <p className="absolute inset-x-0 bottom-0 truncate bg-background/85 px-1 py-0.5 text-[10px] text-muted-foreground">
                      {albumDisplayTitle(photo.album, locale)}
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-7 right-1 z-[1] h-7 gap-0.5 px-2 text-[10px] shadow-md sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-8 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-3 sm:text-xs sm:opacity-0 sm:group-hover:opacity-100"
                      disabled={pending}
                      onClick={() => addFeatured(photo.id)}
                    >
                      <Plus className="h-3 w-3 sm:mr-1 sm:h-3.5 sm:w-3.5" />
                      <span className="hidden sm:inline">{m.admin.featuredAdminAdd}</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </motion.div>
  );
}
