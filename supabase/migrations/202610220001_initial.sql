-- Execute no SQL Editor de um novo projeto Supabase.
create table public.clients (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 name text not null check (char_length(name) between 1 and 120),
 phone text, instagram text, email text, notes text,
 created_at timestamptz not null default now()
);
create index clients_owner_idx on public.clients(owner_id);
alter table public.clients enable row level security;
create policy "Owner manages clients" on public.clients for all to authenticated
 using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
-- Demais tabelas serão adicionadas nas migrações de cada módulo.
-- Não há dados reais nem chave service_role no frontend.
