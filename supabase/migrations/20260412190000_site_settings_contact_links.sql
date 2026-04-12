-- Javna e-adresa i Instagram; prazno = zadano u aplikaciji
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS contact_public_email text,
  ADD COLUMN IF NOT EXISTS contact_instagram_url text,
  ADD COLUMN IF NOT EXISTS contact_instagram_label_bs text,
  ADD COLUMN IF NOT EXISTS contact_instagram_label_en text;
