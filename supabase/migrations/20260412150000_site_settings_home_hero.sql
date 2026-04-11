-- Singleton: homepage hero image URL (javno čitljivo, ažurira admin)
CREATE TABLE public.site_settings (
  id smallint PRIMARY KEY DEFAULT 1,
  CONSTRAINT site_settings_singleton CHECK (id = 1),
  home_hero_image_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.site_settings (id) VALUES (1);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
