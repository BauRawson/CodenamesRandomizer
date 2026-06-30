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

-- Playgama games (clid in play_url links plays to Michicho publisher account)
insert into games (slug, title, description, category, thumbnail_url, play_url, is_featured, is_new, color, tags) values
(
  'fruit-merge',
  'Fruit Merge',
  'Drop and merge matching fruits to grow them into bigger and bigger ones. Sounds simple — but keeping the container from overflowing is the real challenge. Only 1% of players have created the biggest fruit.',
  'puzzle',
  'https://static.playgama.com/p-img/pg/backfill/game-59/preview/084fbd464d9e4d6e7a8c17eb4981110353d604595566c4b454626ec275674140?width=448',
  'https://playgama.com/export/game/fruit-merge-playgama?clid=p_77ef8e1c-c1e4-457d-8452-2aa9421b65ed',
  true, true, '#EA580C', array['puzzle','merge','casual','brain']
),
(
  'bubble-blast',
  'Bubble Blast',
  'A classic bubble shooter with hundreds of levels and satisfying bonuses. Aim carefully, match colors, and pop every bubble to clear the board — it gets trickier than it looks.',
  'puzzle',
  'https://static.playgama.com/p-img/pg/backfill/game-72/preview/d69e6c296dd5feca6b0af15e281b9eed56d21ed21eec786588bf6ae0194cfcdc?width=448',
  'https://playgama.com/export/game/bubble-blast?clid=p_77ef8e1c-c1e4-457d-8452-2aa9421b65ed',
  false, true, '#0284C7', array['puzzle','bubble-shooter','casual','match-3']
),
(
  'find-the-frog',
  'Find the Frog',
  'Explore beautifully drawn black-and-white scenes — farms, swamps, cities, forests, beaches, pirate islands — and tap hidden frogs to reveal their colours. Collect every frog to complete your album.',
  'puzzle',
  'https://static.playgama.com/p-img/pg/backfill/game-99734/preview/0a47981a16dd22ccfdb64d11561018e48011c956e10d9a2dac1ab9867082e50c?width=448',
  'https://playgama.com/export/game/find-the-frog--hidden-objects?clid=p_77ef8e1c-c1e4-457d-8452-2aa9421b65ed',
  false, true, '#15803D', array['puzzle','hidden-object','casual','relaxing']
),
(
  'bubble-pop-legend',
  'Bubble Pop Legend',
  'Aim, shoot, and pop colourful bubbles to clear the board. Match 3 or more of the same colour, use fewer shots to earn 3 stars, and plan your boosters wisely to blast through every level.',
  'puzzle',
  'https://static.playgama.com/p-img/pg/backfill/game-117896/preview/11ffd47324fb22de997946a2c52342a7862f8aea99a0ebdeed7c91574d9bbae6?width=448',
  'https://playgama.com/export/game/bubble-pop-legend?clid=p_77ef8e1c-c1e4-457d-8452-2aa9421b65ed',
  false, true, '#9333EA', array['puzzle','bubble-shooter','casual','match-3']
),
(
  'word-cross',
  'Word Cross',
  'Crossword meets word search in this relaxing brain-teaser with 6000+ levels. Swipe to connect letters in any direction, uncover hidden words, and fill the grid — no time limit, no pressure.',
  'words',
  'https://static.playgama.com/p-img/pg/backfill/game-117810/preview/813f1d81490184f5199dc2f8fc75c666d159d354561fa5c0a1da9190c9de12f8?width=448',
  'https://playgama.com/export/game/word-cross?clid=p_77ef8e1c-c1e4-457d-8452-2aa9421b65ed',
  false, true, '#0D9488', array['words','puzzle','brain','educational']
),
(
  'soccer-legends-2026',
  'Soccer Legends 2026',
  'Fast-paced arcade soccer with solo, 1v1, and 2v2 matches. Choose a player with unique abilities — superkicks, teleportation — compete in tournaments, and score spectacular goals to become champion.',
  'sports',
  'https://static.playgama.com/p-img/pg/backfill/game-120621/preview/05d5a6b93d936a5ae0c0a80bc0acfee262fe31276b3828c24689471858e8e330?width=448',
  'https://playgama.com/export/game/soccer-legends-2026?clid=p_77ef8e1c-c1e4-457d-8452-2aa9421b65ed',
  true, true, '#16A34A', array['sports','soccer','multiplayer','2-player']
),
(
  'last-knight',
  'Last Knight',
  'A dodge-and-escape arcade game where you outrun an ever-growing horde of monsters on a random map. Grab speed boosts and freeze items to stay alive longer — and beat your high score.',
  'action',
  'https://static.playgama.com/p-img/pg/preview/ac448ca9051e4c10baae6e0b00df0a44?width=448',
  'https://playgama.com/export/game/last-knight-kings-throne?clid=p_77ef8e1c-c1e4-457d-8452-2aa9421b65ed',
  false, true, '#B91C1C', array['action','casual','endless','dodge']
)
on conflict (slug) do nothing;
