-- Migration: 20260219_saas_features.sql

-- 1. Create table for Super Admins
create table if not exists saas_admins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS on saas_admins
alter table saas_admins enable row level security;

-- Policy: Only super admins can view the list of super admins (recursion check or just open for now if needed, strictly speaking only existing admins should see)
-- For bootstrapping, we might want to allow read if you are in the list.
create policy "Super admins can view saas_admins"
  on saas_admins for select
  using ( true );

-- 3. Modify barbershops table
alter table barbershops 
  add column if not exists is_active boolean default true,
  add column if not exists created_by_saas_admin uuid references auth.users(id);

-- 4. Create subscriptions table
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  barbershop_id uuid references barbershops(id) not null,
  status text not null check (status in ('trial', 'active', 'past_due', 'canceled')),
  plan text not null check (plan in ('mensal', 'trimestral', 'semestral')),
  price_monthly numeric(10,2) not null default 0,
  started_at timestamp with time zone not null default now(),
  renew_at timestamp with time zone not null,
  trial_ends_at timestamp with time zone,
  canceled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable RLS on subscriptions
alter table subscriptions enable row level security;

-- Policies for subscriptions
-- Super Admin can do everything
create policy "Super admins can do everything on subscriptions"
  on subscriptions for all
  using ( auth.uid() in (select user_id from saas_admins) );

-- Barbershop owners can view their own subscription
create policy "Owners can view their own subscription"
  on subscriptions for select
  using ( 
    exists (
      select 1 from barbershops 
      where barbershops.id = subscriptions.barbershop_id 
      and barbershops.owner_id = auth.uid()
    )
  );

-- 6. Update RLS policies for Barbershops to allow Super Admin access
create policy "Super admins can do everything on barbershops"
  on barbershops for all
  using ( auth.uid() in (select user_id from saas_admins) );

-- 7. Update other tables to allow Super Admin access
-- Profiles
create policy "Super admins can view all profiles"
  on profiles for select
  using ( auth.uid() in (select user_id from saas_admins) );

-- Bookings
create policy "Super admins can view all bookings"
  on bookings for select
  using ( auth.uid() in (select user_id from saas_admins) );

-- Services
create policy "Super admins can view all services"
  on services for select
  using ( auth.uid() in (select user_id from saas_admins) );

-- Customers
create policy "Super admins can view all customers"
  on customers for select
  using ( auth.uid() in (select user_id from saas_admins) );
