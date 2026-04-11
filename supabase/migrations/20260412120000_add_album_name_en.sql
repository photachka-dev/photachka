-- English album title (`name` = Bosnian). Follow-up migration sets NOT NULL.
ALTER TABLE public.albums ADD COLUMN IF NOT EXISTS name_en text;
