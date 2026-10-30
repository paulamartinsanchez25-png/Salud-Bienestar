-- Ejecutar completo en Supabase > SQL Editor > New query > Run (se puede repetir sin problemas).
create table if not exists public.records(
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null,
  kind text not null,          -- meal | fav | walk | train | habit | hlog | joy ...
  date date,
  data jsonb not null default '{}',
  updated_at timestamptz default now(),
  primary key(user_id,id));
create index if not exists records_user_kind_date on public.records(user_id,kind,date);
alter table public.records enable row level security;
drop policy if exists "solo mis datos" on public.records;
create policy "solo mis datos" on public.records for all to authenticated
  using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
revoke all on public.records from anon;
