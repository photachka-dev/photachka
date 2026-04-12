alter table public.site_settings
  add column featured_grid_columns smallint not null default 3
    check (featured_grid_columns in (2, 3, 4)),
  add column featured_last_row_align text not null default 'start'
    check (featured_last_row_align in ('start', 'center')),
  add column albums_grid_columns smallint not null default 3
    check (albums_grid_columns in (2, 3, 4)),
  add column albums_last_row_align text not null default 'start'
    check (albums_last_row_align in ('start', 'center'));
