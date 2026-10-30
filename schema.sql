-- Una tabla genérica y segura: cada fila pertenece a un usuario (comidas, caminatas, hábitos, etc. según "kind").
create table if not exists records(
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null, kind text not null, date date, data jsonb not null default '{}',
  updated_at timestamptz default now(), primary key(user_id,id));
create index on records(user_id,kind,date);
alter table records enable row level security;
create policy "solo mis datos" on records for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
