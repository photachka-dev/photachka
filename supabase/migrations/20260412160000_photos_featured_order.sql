-- Ručni odabir istaknutih radova na početnoj (NULL = nije istaknuto, manji broj = ranije u sekciji)
ALTER TABLE public.photos ADD COLUMN IF NOT EXISTS featured_order integer NULL;
