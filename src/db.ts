import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Server-only handle to the team's database (Neon serverless Postgres over HTTP).
 * Reads `DATABASE_URL` from environment.
 *
 * Usage inside createServerFn() handlers or API routes:
 *
 *   const db = getDb();
 *   if (!db) { fallback to mock data }
 *   const rows = await db`SELECT * FROM leads`;
 *   const rows = await db('SELECT * FROM leads WHERE id = $1', [id]);
 */

let _db: ReturnType<typeof neon> | null = null;

export function getDb(): ReturnType<typeof neon> | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  // Check if it's a real postgres connection string (starts with postgres:// or postgresql://)
  if (!url.startsWith("postgres://") && !url.startsWith("postgresql://")) {
    return null;
  }

  if (!_db) {
    _db = neon(url);
  }
  return _db;
}

export function getDbUrl(): string | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!url.startsWith("postgres://") && !url.startsWith("postgresql://")) {
    return null;
  }
  return url;
}

/**
 * Check if the database is actually connected and functional.
 */
export async function isDbConnected(): Promise<boolean> {
  try {
    const db = getDb();
    if (!db) return false;
    await db`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export { neon };
export type { NeonQueryFunction };