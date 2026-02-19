-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create ENUM for user roles
-- owner: Dono da barbearia
-- staff: Barbeiro / Funcionário
-- customer: Cliente final (se tiver login)
create type user_role as enum ('owner', 'staff', 'customer');

-- TABLE: barbershops (Tenants)
create table barbershops (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null unique, -- url da barbearia (ex: /b/barber-king)
  logo_url text,
  phone text,
  address text,
  owner_id uuid references auth.users(id) -- Quem é o dono dessa unidade
);

-- TABLE: profiles (Extends auth.users from Supabase)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  role user_role default 'customer',
  barbershop_id uuid references barbershops(id), -- De qual barbearia esse user faz parte (se for staff/owner)
  email text,
  phone text,
  avatar_url text
);

-- TABLE: services (Serviços oferecidos)
create table services (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  barbershop_id uuid references barbershops(id) not null,
  name text not null,
  description text,
  duration integer not null, -- em minutos
  price decimal(10,2) not null,
  active boolean default true
);

-- TABLE: customers (Cadastro de clientes da barbearia)
create table customers (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  barbershop_id uuid references barbershops(id) not null,
  name text not null,
  email text,
  phone text,
  notes text
);

-- TABLE: bookings (Agendamentos)
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  barbershop_id uuid references barbershops(id) not null,
  service_id uuid references services(id) not null,
  customer_id uuid references customers(id), -- Pode ser nulo se for agendamento rápido sem cadastro completo
  staff_id uuid references profiles(id), -- Quem vai cortar
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  customer_name text not null, -- Snapshot do nome (para nao depender só do ID)
  customer_phone text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'canceled'))
);

-- ROW LEVEL SECURITY (RLS) - Basic Setup

alter table barbershops enable row level security;
alter table profiles enable row level security;
alter table services enable row level security;
alter table bookings enable row level security;
alter table customers enable row level security;

-- Policies (Simplified for initial setup)

-- 1. Barbershops: Public Read (para carregar a landing page)
create policy "Barbershops are public viewable" 
  on barbershops for select 
  using ( true );

-- 2. Profiles: Users can view their own profile
create policy "Users can view own profile" 
  on profiles for select 
  using ( auth.uid() = id );

-- 3. Services: Public Read (para o cliente ver o que agendar/preço)
create policy "Services are public viewable" 
  on services for select 
  using ( true );
  
-- 4. Bookings: 
-- Cliente só vê suas proprias (futuro)
-- Owner/Staff vê todas da sua barbearia (implementaremos depois com auth context)
create policy "Enable insert for everyone (public booking flow)"
    on bookings for insert
    with check (true);
