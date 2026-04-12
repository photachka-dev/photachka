import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PageShell from "@/components/PageShell";
import Index from "./pages/Index";
import GalleryPage from "./pages/GalleryPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminAlbumsPage from "./pages/admin/AdminAlbumsPage";
import AdminHomeHeroPage from "./pages/admin/AdminHomeHeroPage";
import AdminFeaturedPage from "./pages/admin/AdminFeaturedPage";
import AdminSiteTextPage from "./pages/admin/AdminSiteTextPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageShell>
            <Index />
          </PageShell>
        }
      />
      <Route
        path="/gallery"
        element={
          <PageShell>
            <GalleryPage />
          </PageShell>
        }
      />
      <Route
        path="/gallery/:id"
        element={
          <PageShell>
            <AlbumDetailPage />
          </PageShell>
        }
      />
      <Route
        path="/contact"
        element={
          <PageShell>
            <ContactPage />
          </PageShell>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="albums" replace />} />
        <Route path="albums" element={<AdminAlbumsPage />} />
        <Route path="featured" element={<AdminFeaturedPage />} />
        <Route path="homepage" element={<AdminHomeHeroPage />} />
        <Route path="texts" element={<AdminSiteTextPage />} />
      </Route>
      <Route
        path="*"
        element={
          <PageShell>
            <NotFound />
          </PageShell>
        }
      />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
