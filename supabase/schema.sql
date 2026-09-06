-- ============================================================
--  Base de datos de confirmaciones (RSVP) para el cumple de Melanny
--  Cómo usar: entra a tu proyecto Supabase → SQL Editor → New query
--  → pega TODO esto → RUN.
-- ============================================================

create table if not exists public.confirmaciones (
  id          uuid default gen_random_uuid() primary key,
  nombre      text not null,
  personas    int  not null default 1,
  mensaje     text,
  invitacion  text,
  created_at  timestamptz default now()
);

-- Seguridad a nivel de fila
alter table public.confirmaciones enable row level security;

-- Cualquier invitado puede REGISTRAR su confirmación
drop policy if exists "invitados pueden confirmar" on public.confirmaciones;
create policy "invitados pueden confirmar"
  on public.confirmaciones for insert
  to anon
  with check (true);

-- Permitir LEER las confirmaciones (necesario para la página admin.html).
-- Si prefieres que NADIE más pueda leerlas desde la web y verlas solo en
-- el panel de Supabase, borra o comenta las 4 líneas siguientes.
drop policy if exists "leer confirmaciones" on public.confirmaciones;
create policy "leer confirmaciones"
  on public.confirmaciones for select
  to anon
  using (true);
