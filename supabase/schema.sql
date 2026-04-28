-- ============================================================
-- MEONG Project — Supabase Schema
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- ============================================================

-- Forum Posts
create table if not exists public.forum_posts (
  id text primary key,
  title text not null,
  content text not null,
  author text not null default 'Anonim',
  category text not null default 'Cerita',
  created_at timestamptz not null default now(),
  replies_count integer not null default 0
);

-- Forum Replies
create table if not exists public.forum_replies (
  id text primary key,
  post_id text not null references public.forum_posts(id) on delete cascade,
  content text not null,
  author text not null default 'Anonim',
  created_at timestamptz not null default now()
);

-- Donations
create table if not exists public.donations (
  id text primary key,
  name text not null default 'Anonim',
  amount integer not null,
  message text default '',
  created_at timestamptz not null default now()
);

-- Adopt Listings
create table if not exists public.adopt_listings (
  id text primary key,
  cat_name text not null,
  description text not null,
  location text not null,
  contact_name text not null,
  contact_phone text not null,
  image_url text default '',
  status text not null default 'available',
  created_at timestamptz not null default now()
);

-- RPC to increment reply count
create or replace function increment_replies(post_id text)
returns void as $$
  update forum_posts set replies_count = replies_count + 1 where id = post_id;
$$ language sql;

-- Row Level Security (allow public read, public insert)
alter table public.forum_posts enable row level security;
alter table public.forum_replies enable row level security;
alter table public.donations enable row level security;
alter table public.adopt_listings enable row level security;

-- Policies: anyone can read
create policy "Public read forum_posts" on public.forum_posts for select using (true);
create policy "Public insert forum_posts" on public.forum_posts for insert with check (true);
create policy "Public read forum_replies" on public.forum_replies for select using (true);
create policy "Public insert forum_replies" on public.forum_replies for insert with check (true);
create policy "Public read donations" on public.donations for select using (true);
create policy "Public insert donations" on public.donations for insert with check (true);
create policy "Public read adopt_listings" on public.adopt_listings for select using (true);
create policy "Public insert adopt_listings" on public.adopt_listings for insert with check (true);
