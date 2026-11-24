create table public.website_callbacks (
  id uuid primary key,
  created_at timestamptz not null default now(),
  name text not null,
  channel text not null check (channel in ('phone','email')),
  contact text not null,
  topic text not null,
  notice_version text not null,
  source_page text not null,
  status text not null default 'new'
);
alter table public.website_callbacks enable row level security;
revoke all on public.website_callbacks from public, anon, authenticated;
grant insert, select on public.website_callbacks to service_role;
