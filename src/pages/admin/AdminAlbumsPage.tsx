import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Upload,
  Loader2,
  ImageIcon,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAlbums,
  useCreateAlbum,
  useDeleteAlbum,
  useReorderAlbums,
  useSetAlbumCover,
  useUpdateAlbum,
} from "@/hooks/useAlbums";
import { usePhotos, useUploadPhotos, useDeletePhoto, useReorderPhotos } from "@/hooks/usePhotos";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { useI18n } from "@/contexts/LanguageContext";
import { dateLocaleTag } from "@/i18n/messages";
import { albumDisplayTitle } from "@/lib/albumTitle";
import { partitionFilesByUploadLimit } from "@/lib/uploadLimits";

type Photo = Tables<"photos">;
type Album = Tables<"albums">;

function AlbumTitlesEditor({ album }: { album: Album }) {
  const { m } = useI18n();
  const updateAlbum = useUpdateAlbum();
  const [name, setName] = useState(album.name);
  const [nameEn, setNameEn] = useState(album.name_en ?? "");

  useEffect(() => {
    setName(album.name);
    setNameEn(album.name_en ?? "");
  }, [album.id, album.name, album.name_en]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nameEn.trim()) {
      toast.error(m.admin.albumTitlesBothRequired);
      return;
    }
    try {
      await updateAlbum.mutateAsync({
        id: album.id,
        name: name.trim(),
        name_en: nameEn.trim(),
      });
      toast.success(m.admin.albumTitlesUpdated);
    } catch {
      toast.error(m.admin.albumTitlesUpdateError);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="mb-4 space-y-3 rounded-sm border border-border/60 bg-muted/20 p-4"
    >
      <div className="space-y-2">
        <Label htmlFor={`album-bs-${album.id}`} className="text-xs text-muted-foreground">
          {m.admin.albumNameLabelBs}
        </Label>
        <Input
          id={`album-bs-${album.id}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`album-en-${album.id}`} className="text-xs text-muted-foreground">
          {m.admin.albumNameLabelEn}
        </Label>
        <Input
          id={`album-en-${album.id}`}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder={m.admin.createPlaceholderEn}
          required
        />
      </div>
      <Button
        type="submit"
        size="sm"
        disabled={updateAlbum.isPending || !name.trim() || !nameEn.trim()}
      >
        {updateAlbum.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : m.admin.saveAlbumTitles}
      </Button>
    </form>
  );
}

function AlbumManager({
  albumId,
  albumName,
  coverUrl,
}: {
  albumId: string;
  albumName: string;
  coverUrl: string | null;
}) {
  const { m } = useI18n();
  const { data: photos, isLoading } = usePhotos(albumId);
  const uploadPhotos = useUploadPhotos();
  const deletePhoto = useDeletePhoto();
  const reorderPhotos = useReorderPhotos();
  const setAlbumCover = useSetAlbumCover();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const movePhoto = async (photoId: string, dir: "up" | "down") => {
    if (!photos) return;
    const idx = photos.findIndex((p) => p.id === photoId);
    if (idx < 0) return;
    const j = dir === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= photos.length) return;
    const ids = photos.map((p) => p.id);
    [ids[idx], ids[j]] = [ids[j], ids[idx]];
    try {
      await reorderPhotos.mutateAsync({ albumId, orderedPhotoIds: ids });
    } catch {
      toast.error(m.admin.reorderError);
    }
  };

  const handleSetCover = async (photo: Photo) => {
    try {
      await setAlbumCover.mutateAsync({ albumId, coverUrl: photo.image_url });
      toast.success(m.admin.coverSetSuccess);
    } catch {
      toast.error(m.admin.coverSetError);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await uploadPhotos.mutateAsync({ albumId, files: valid });
      toast.success(m.admin.uploadSuccess.replace("{count}", String(valid.length)));
    } catch {
      toast.error(m.admin.uploadError);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeletePhoto = async (photo: Photo) => {
    try {
      await deletePhoto.mutateAsync(photo);
      toast.success(m.admin.photoDeleted);
    } catch {
      toast.error(m.admin.photoDeleteError);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          {m.admin.photosInAlbum.replace("{name}", albumName)}
        </h3>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadPhotos.isPending}
          >
            {uploadPhotos.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span className="ml-2">{m.admin.upload}</span>
          </Button>
        </div>
      </div>

      {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}

      {photos && photos.length === 0 && (
        <p className="text-sm text-muted-foreground">{m.admin.noPhotosYet}</p>
      )}

      {photos && photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {photos.map((photo, index) => {
            const isCover = coverUrl != null && photo.image_url === coverUrl;
            return (
              <div key={photo.id} className="group relative aspect-square overflow-hidden bg-muted">
                <img src={photo.image_url} alt="" className="h-full w-full object-cover" />
                {isCover && (
                  <span className="absolute left-1 top-1 rounded-sm bg-foreground/90 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-background">
                    {m.admin.coverBadge}
                  </span>
                )}
                {!isCover && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute left-1 top-1 h-7 w-7 bg-background/90 shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
                    disabled={setAlbumCover.isPending}
                    aria-label={m.admin.setAsCoverAria}
                    onClick={() => void handleSetCover(photo)}
                  >
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                )}
                <div className="absolute bottom-1 left-1 flex flex-col gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7 bg-background/90 shadow-sm"
                    disabled={index === 0 || reorderPhotos.isPending}
                    aria-label={m.admin.movePhotoUpAria}
                    onClick={() => void movePhoto(photo.id, "up")}
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7 bg-background/90 shadow-sm"
                    disabled={index === photos.length - 1 || reorderPhotos.isPending}
                    aria-label={m.admin.movePhotoDownAria}
                    onClick={() => void movePhoto(photo.id, "down")}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo)}
                  className="absolute right-1 top-1 rounded-sm bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminAlbumsPage() {
  const { locale, m } = useI18n();
  const { data: albums, isLoading } = useAlbums();
  const createAlbum = useCreateAlbum();
  const deleteAlbum = useDeleteAlbum();
  const reorderAlbums = useReorderAlbums();
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newAlbumNameEn, setNewAlbumNameEn] = useState("");
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim() || !newAlbumNameEn.trim()) {
      toast.error(m.admin.albumTitlesBothRequired);
      return;
    }
    try {
      await createAlbum.mutateAsync({
        name: newAlbumName.trim(),
        name_en: newAlbumNameEn.trim(),
      });
      setNewAlbumName("");
      setNewAlbumNameEn("");
      toast.success(m.admin.albumCreated);
    } catch (err: unknown) {
      const e2 = err as { message?: string; details?: string; hint?: string };
      const detail = [e2.message, e2.details, e2.hint].filter(Boolean).join(" — ");
      toast.error(
        detail ? `${m.admin.albumCreateErrorPrefix} ${detail}` : m.admin.albumCreateError,
      );
    }
  };

  const moveAlbum = async (albumId: string, dir: "up" | "down") => {
    if (!albums) return;
    const idx = albums.findIndex((a) => a.id === albumId);
    if (idx < 0) return;
    const j = dir === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= albums.length) return;
    const ids = albums.map((a) => a.id);
    [ids[idx], ids[j]] = [ids[j], ids[idx]];
    try {
      await reorderAlbums.mutateAsync(ids);
    } catch {
      toast.error(m.admin.reorderError);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm(m.admin.confirmDeleteAlbum)) return;
    try {
      await deleteAlbum.mutateAsync(id);
      if (expandedAlbum === id) setExpandedAlbum(null);
      toast.success(m.admin.albumDeleted);
    } catch {
      toast.error(m.admin.albumDeleteError);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <form onSubmit={handleCreateAlbum} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex flex-1 flex-col gap-2">
          <Input
            placeholder={m.admin.createPlaceholder}
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
            aria-label={m.admin.albumNameLabelBs}
            required
          />
          <Input
            placeholder={m.admin.createPlaceholderEn}
            value={newAlbumNameEn}
            onChange={(e) => setNewAlbumNameEn(e.target.value)}
            aria-label={m.admin.albumNameLabelEn}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full shrink-0 sm:mt-0 sm:w-auto"
          disabled={createAlbum.isPending || !newAlbumName.trim() || !newAlbumNameEn.trim()}
        >
          <Plus className="mr-2 h-4 w-4" /> {m.admin.create}
        </Button>
      </form>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {albums && albums.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">{m.admin.emptyList}</p>
      )}

      <div className="space-y-4">
        {albums?.map((album, albumIndex) => (
          <div key={album.id} className="border p-4">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setExpandedAlbum(expandedAlbum === album.id ? null : album.id)}
                className="min-w-0 flex flex-1 items-center gap-3 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-muted">
                  {album.cover_url ? (
                    <img src={album.cover_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="font-heading text-lg leading-tight">{album.name}</h2>
                  <p className="truncate text-xs text-muted-foreground">{album.name_en}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(album.created_at).toLocaleDateString(dateLocaleTag(locale))}
                  </p>
                </div>
              </button>
              <div className="flex shrink-0 items-center gap-1">
                <div className="flex flex-col gap-0.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={albumIndex === 0 || reorderAlbums.isPending}
                    aria-label={m.admin.moveAlbumUpAria}
                    onClick={() => void moveAlbum(album.id, "up")}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={albumIndex === (albums?.length ?? 0) - 1 || reorderAlbums.isPending}
                    aria-label={m.admin.moveAlbumDownAria}
                    onClick={() => void moveAlbum(album.id, "down")}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => handleDeleteAlbum(album.id)}
                  disabled={deleteAlbum.isPending}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>

            {expandedAlbum === album.id && (
              <>
                <AlbumTitlesEditor album={album} />
                <AlbumManager
                  albumId={album.id}
                  albumName={albumDisplayTitle(album, locale)}
                  coverUrl={album.cover_url}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
