-- Both titles required: backfill empty English titles, then enforce NOT NULL
UPDATE public.albums
SET name_en = name
WHERE name_en IS NULL OR coalesce(trim(name_en), '') = '';

ALTER TABLE public.albums
  ALTER COLUMN name_en SET NOT NULL;
