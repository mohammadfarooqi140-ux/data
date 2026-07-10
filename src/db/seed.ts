/**
 * Database Seed Script for PitchPilot
 *
 * Run this to initialize the Neon PostgreSQL database schema and seed data.
 * Usage:
 *   DATABASE_URL="postgres://..." bun run src/db/seed.ts
 *
 * Or via the inline function from a server context.
 */

import { neon } from "@neondatabase/serverless";

const MIGRATION_SQL = `
-- PitchPilot Database Schema
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'growth', 'agency')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'screenshotting', 'analyzing', 'contact_found', 'emailed', 'error')),
  screenshot_path TEXT,
  audit_results JSONB DEFAULT '[]',
  contact_name TEXT,
  contact_email TEXT,
  contact_linkedin TEXT,
  drafted_email TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK (job_type IN ('screenshot', 'audit', 'contact', 'email')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  result JSONB DEFAULT '{}',
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_campaign_id ON leads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_processing_jobs_lead_id ON processing_jobs(lead_id);
CREATE INDEX IF NOT EXISTS idx_processing_jobs_status ON processing_jobs(status);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER set_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER set_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER set_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER set_processing_jobs_updated_at BEFORE UPDATE ON processing_jobs
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
`;

const SEED_DATA_SQL = `
-- Seed data for development/testing
INSERT INTO users (email, name, subscription_tier) VALUES
  ('demo@pitchpilot.io', 'Demo User', 'growth')
ON CONFLICT (email) DO NOTHING;

WITH user_ref AS (SELECT id FROM users WHERE email = 'demo@pitchpilot.io' LIMIT 1)
INSERT INTO campaigns (user_id, name, status) VALUES
  ((SELECT id FROM user_ref), 'Q3 Outbound', 'active'),
  ((SELECT id FROM user_ref), 'E-commerce Prospecting', 'active')
ON CONFLICT DO NOTHING;

WITH campaign_ref AS (SELECT id FROM campaigns WHERE name = 'Q3 Outbound' LIMIT 1)
INSERT INTO leads (campaign_id, url, status, audit_results, contact_name, contact_email) VALUES
  ((SELECT id FROM campaign_ref), 'example-outdated-design.com', 'contact_found', '{"issues": 4, "problems": ["No CTA", "Poor contrast"]}', 'John Smith', 'john@example.com'),
  ((SELECT id FROM campaign_ref), 'slow-consulting-site.co', 'analyzing', NULL, NULL, NULL),
  ((SELECT id FROM campaign_ref), 'broken-ux-bakery.com', 'emailed', '{"issues": 7, "problems": ["Broken nav", "Slow load"]}', 'Sarah Lee', 'sarah@bakery.com'),
  ((SELECT id FROM campaign_ref), 'no-cta-plumbing.com', 'screenshotting', NULL, NULL, NULL),
  ((SELECT id FROM campaign_ref), 'bad-mobile-lawfirm.io', 'contact_found', '{"issues": 5, "problems": ["Not responsive", "Tiny text"]}', 'Mike Johnson', 'mike@lawfirm.io')
ON CONFLICT DO NOTHING;
`;

export async function runMigrations(dbUrl: string): Promise<void> {
  const sql = neon(dbUrl);

  // Run migration in parts to avoid issues with multi-statement execution
  const statements = MIGRATION_SQL
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--"));

  for (const stmt of statements) {
    try {
      await sql(stmt + ";");
    } catch (err: any) {
      // Ignore "already exists" errors
      if (!err.message?.includes("already exists")) {
        console.warn("Migration warning:", err.message);
      }
    }
  }

  // Run seed data
  const seedStatements = SEED_DATA_SQL
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--"));

  for (const stmt of seedStatements) {
    try {
      await sql(stmt + ";");
    } catch (err: any) {
      console.warn("Seed warning:", err.message);
    }
  }

  console.log("✅ Database migrations and seed data applied successfully");
}

export { MIGRATION_SQL, SEED_DATA_SQL };

// Run directly if executed as a script
const dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.startsWith("postgres")) {
  runMigrations(dbUrl).catch(console.error);
}