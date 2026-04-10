import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Trash2, Upload, LogOut, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useAlbums, useCreateAlbum, useDeleteAlbum } from "@/hooks/useAlbums";
import { usePhotos, useUploadPhotos, useDeletePhoto } from "@/hooks/usePhotos";
import { toast } from "sonner";

function AlbumManager({ albumId, albumName }: { albumId: string; albumName: string }) {
  const { data: photos, isLoading } = usePhotos(albumId);
  const uploadPhotos = useUploadPhotos();
  const deletePhoto = useDeletePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      await uploadPhotos.mutateAsync({ albumId, files });
      toast.success(`Uploaded ${files.length} photo(s)`);
    } catch {
      toast.error("Failed to upload photos");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeletePhoto = async (photo: any) => {
    try {
      await deletePhoto.mutateAsync(photo);
      toast.success("Photo deleted");
    } catch {
      toast.error("Failed to delete photo");
    }
  };

  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm text-muted-foreground">
          Photos in "{albumName}"
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
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span className="ml-2">Upload</span>
          </Button>
        </div>
      </div>

      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}

      {photos && photos.length === 0 && (
        <p className="text-sm text-muted-foreground">No photos yet.</p>
      )}

      {photos && photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-square bg-muted overflow-hidden">
              <img
                src={photo.image_url}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDeletePhoto(photo)}
                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { signOut } = useAuth();
  const { data: albums, isLoading } = useAlbums();
  const createAlbum = useCreateAlbum();
  const deleteAlbum = useDeleteAlbum();
  const [newAlbumName, setNewAlbumName] = useState("");
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;
    try {
      await createAlbum.mutateAsync(newAlbumName.trim());
      setNewAlbumName("");
      toast.success("Album created");
    } catch {
      toast.error("Failed to create album");
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm("Delete this album and all its photos?")) return;
    try {
      await deleteAlbum.mutateAsync(id);
      if (expandedAlbum === id) setExpandedAlbum(null);
      toast.success("Album deleted");
    } catch {
      toast.error("Failed to delete album");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-heading text-xl">Admin Panel</h1>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Create album */}
          <form onSubmit={handleCreateAlbum} className="flex gap-3 mb-8">
            <Input
              placeholder="New album name..."
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={createAlbum.isPending}>
              <Plus className="w-4 h-4 mr-2" /> Create
            </Button>
          </form>

          {/* Albums list */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {albums && albums.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No albums yet. Create one above.
            </p>
          )}

          <div className="space-y-4">
            {albums?.map((album) => (
              <div key={album.id} className="border p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setExpandedAlbum(expandedAlbum === album.id ? null : album.id)}
                    className="flex items-center gap-3 text-left"
                  >
                    <div className="w-10 h-10 bg-muted flex items-center justify-center overflow-hidden">
                      {album.cover_url ? (
                        <img src={album.cover_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-heading text-lg">{album.name}</h2>
                      <p className="text-xs text-muted-foreground">
                        {new Date(album.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAlbum(album.id)}
                    disabled={deleteAlbum.isPending}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>

                {expandedAlbum === album.id && (
                  <AlbumManager albumId={album.id} albumName={album.name} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
