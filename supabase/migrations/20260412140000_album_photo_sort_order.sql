-- Redoslijed albuma na sajtu (manji broj = ranije u listi)
ALTER TABLE public.albums ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0;

UPDATE public.albums AS a
SET display_order = sub.rn
FROM (
  SELECT id, (ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1)::integer AS rn
  FROM public.albums
) AS sub
WHERE a.id = sub.id;

-- Redoslijed fotografija unutar albuma (manji broj = ranije u galeriji)
ALTER TABLE public.photos ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

UPDATE public.photos AS p
SET sort_order = sub.rn
FROM (
  SELECT
    id,
    (ROW_NUMBER() OVER (PARTITION BY album_id ORDER BY created_at DESC) - 1)::integer AS rn
  FROM public.photos
) AS sub
WHERE p.id = sub.id;
