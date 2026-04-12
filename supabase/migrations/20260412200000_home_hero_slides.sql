-- Do 6 slika heroa na početnoj, interval rotacije u sekundama
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS home_hero_slides jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS home_hero_interval_seconds smallint NOT NULL DEFAULT 6;

ALTER TABLE public.site_settings
  DROP CONSTRAINT IF EXISTS site_settings_home_hero_slides_len;

ALTER TABLE public.site_settings
  ADD CONSTRAINT site_settings_home_hero_slides_len
  CHECK (jsonb_typeof(home_hero_slides) = 'array' AND jsonb_array_length(home_hero_slides) <= 6);

ALTER TABLE public.site_settings
  DROP CONSTRAINT IF EXISTS site_settings_home_hero_interval;

ALTER TABLE public.site_settings
  ADD CONSTRAINT site_settings_home_hero_interval
  CHECK (home_hero_interval_seconds >= 3 AND home_hero_interval_seconds <= 120);

-- Postojeća jedna slika → prvi slide
UPDATE public.site_settings
SET home_hero_slides = jsonb_build_array(home_hero_image_url)
WHERE
  id = 1
  AND jsonb_array_length(home_hero_slides) = 0
  AND home_hero_image_url IS NOT NULL
  AND btrim(home_hero_image_url) <> '';
