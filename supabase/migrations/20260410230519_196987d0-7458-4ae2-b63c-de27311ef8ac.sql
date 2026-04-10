
-- Create albums table
CREATE TABLE public.albums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create photos table
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Public read for albums
CREATE POLICY "Anyone can view albums" ON public.albums FOR SELECT USING (true);
-- Admin write for albums
CREATE POLICY "Authenticated users can create albums" ON public.albums FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update albums" ON public.albums FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete albums" ON public.albums FOR DELETE TO authenticated USING (true);

-- Public read for photos
CREATE POLICY "Anyone can view photos" ON public.photos FOR SELECT USING (true);
-- Admin write for photos
CREATE POLICY "Authenticated users can create photos" ON public.photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update photos" ON public.photos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete photos" ON public.photos FOR DELETE TO authenticated USING (true);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Storage policies
CREATE POLICY "Public can view portfolio images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can upload portfolio images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can update portfolio images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can delete portfolio images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');
