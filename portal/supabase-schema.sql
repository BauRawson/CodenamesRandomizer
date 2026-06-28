-- Michicho Portal – Supabase Schema
-- Run this in the Supabase SQL editor after creating your project

-- Games table
create table if not exists games (
  id            uuid default gen_random_uuid() primary key,
  slug          text unique not null,
  title         text not null,
  description   text,
  category      text not null,
  thumbnail_url text,
  play_url      text not null,
  is_featured   boolean default false,
  is_new        boolean default false,
  coming_soon   boolean default false,
  player_count  integer default 0,
  tags          text[] default '{}',
  color         text default '#7C3AED',
  created_at    timestamptz default now()
);

-- User game records (progress / play history)
create table if not exists user_games (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  game_id     uuid references games(id) on delete cascade,
  last_played timestamptz default now(),
  play_count  integer default 1,
  unique(user_id, game_id)
);

-- Leaderboard scores
create table if not exists scores (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  game_id    uuid references games(id) on delete cascade,
  score      integer not null,
  created_at timestamptz default now()
);

-- Row-level security
alter table games      enable row level security;
alter table user_games enable row level security;
alter table scores     enable row level security;

-- Games: public read
create policy "games_public_read" on games for select using (true);

-- user_games: users manage their own rows
create policy "user_games_self" on user_games for all using (auth.uid() = user_id);

-- scores: public read, insert own
create policy "scores_public_read" on scores for select using (true);
create policy "scores_insert_own"  on scores for insert with check (auth.uid() = user_id);

-- Seed data
insert into games (slug, title, description, category, play_url, is_featured, color, tags) values
(
  'codigo-secreto',
  'Código Secreto',
  'El clásico juego de palabras clave para toda la familia. Un jugador da pistas de una sola palabra para que su equipo adivine las palabras correctas en el tablero.',
  'family',
  '/play/codigo-secreto.html',
  true,
  '#7C3AED',
  array['family','words','multiplayer','tv']
),
(
  'trivia',
  'Trivia',
  '¿Cuánto sabes? Pon a prueba tus conocimientos en esta divertida trivia para jugar en familia o con amigos.',
  'family',
  '/play/trivia.html',
  true,
  '#0891B2',
  array['family','trivia','multiplayer','tv']
),
(
  'mimica',
  'Mímica',
  'Adivina la palabra con solo mímica. ¡Sin hablar! El juego perfecto para romper el hielo en cualquier reunión.',
  'family',
  '/play/mimica.html',
  true,
  '#059669',
  array['family','acting','multiplayer','party']
),
(
  'star-dash',
  'Star Dash',
  'Race through the galaxy collecting stars and dodging asteroids. How far can you go?',
  'action',
  '/play/star-dash/',
  false,
  '#DC2626',
  array['action','arcade','coming-soon']
)
on conflict (slug) do nothing;
