-- Languages
create table languages (
  id text primary key,
  name_he text not null,
  name_native text not null,
  flag_emoji text,
  tts_locale text not null,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Profiles
create table profiles (
  id uuid references auth.users primary key,
  display_name text,
  active_language_id text references languages(id) default 'ro',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User language progress
create table user_language_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  language_id text references languages(id),
  proficiency int default 1,
  placement_done boolean default false,
  total_xp int default 0,
  streak int default 0,
  last_played_date date,
  unique(user_id, language_id)
);

-- Categories (shared across languages)
create table categories (
  id text primary key,
  name_he text not null,
  emoji text,
  sort_order int default 0,
  color text
);

-- Levels (per language + category)
create table levels (
  id text primary key,
  language_id text references languages(id),
  category_id text references categories(id),
  level_number int not null,
  label_he text,
  required_xp int default 0
);

-- Vocabulary
create table vocabulary (
  id uuid default gen_random_uuid() primary key,
  level_id text references levels(id),
  target_text text not null,
  he text not null,
  translit text,
  is_phrase boolean default false,
  audio_url text,
  sort_order int default 0
);

-- User level progress
create table user_level_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  level_id text references levels(id),
  best_score int default 0,
  attempts int default 0,
  completed boolean default false,
  last_attempt_at timestamptz,
  unique(user_id, level_id)
);

-- User word stats
create table user_word_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  vocabulary_id uuid references vocabulary(id),
  times_seen int default 0,
  times_correct int default 0,
  last_seen_at timestamptz,
  mastery float default 0,
  unique(user_id, vocabulary_id)
);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'לומד חדש'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table languages enable row level security;
alter table profiles enable row level security;
alter table user_language_progress enable row level security;
alter table categories enable row level security;
alter table levels enable row level security;
alter table vocabulary enable row level security;
alter table user_level_progress enable row level security;
alter table user_word_stats enable row level security;

-- Public read for content tables
create policy "public read languages" on languages for select using (true);
create policy "public read categories" on categories for select using (true);
create policy "public read levels" on levels for select using (true);
create policy "public read vocabulary" on vocabulary for select using (true);
create policy "public insert vocabulary" on vocabulary for insert with check (true);

-- Profiles
create policy "users read own profile" on profiles for select using (auth.uid() = id);
create policy "users update own profile" on profiles for update using (auth.uid() = id);
create policy "users insert own profile" on profiles for insert with check (auth.uid() = id);

-- User language progress
create policy "users manage own lang progress" on user_language_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- User level progress
create policy "users manage own level progress" on user_level_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- User word stats
create policy "users manage own word stats" on user_word_stats
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
