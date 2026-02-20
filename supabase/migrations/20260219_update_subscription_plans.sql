-- Migration: 20260219_update_subscription_plans.sql

-- Drop the old constraint
alter table subscriptions drop constraint if exists subscriptions_plan_check;

-- Add new constraint with updated plan names
alter table subscriptions add constraint subscriptions_plan_check 
  check (plan in ('mensal', 'trimestral', 'semestral'));
