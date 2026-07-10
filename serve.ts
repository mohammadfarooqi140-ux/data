// Production server for the built site. The TanStack Start build emits a portable
// fetch handler (dist/server/server.js) plus static client assets (dist/client);
// this wraps them in a Bun server on port 3000 — static files first, SSR for the
// rest. Also handles /api/* routes directly for REST endpoints.
//
// Run `bun run build` before starting. Restart it with `bun run publish`.
//
// Starting a new instance supersedes the old one: it frees the port no matter
// which user owns the current server (provisioning starts it as `engine`; a team
// member's `bun run publish` runs as their own user), so publish never collides
// with an already-running server. Every sandbox user has passwordless sudo, so
// the takeover works across user boundaries.
import handler from "./dist/server/server.js";
import { getDb, getDbUrl } from "./src/db";
import { runMigrations } from "./src/db/seed";

// Pinned, NOT read from the environment. The published preview URL
// (<label>.<PUBLIC_SITE_DOMAIN>) is reverse-proxied to 0.0.0.0:3000 inside the
// sandbox, so the default site MUST bind there. Bun auto-loads .env files, so
// honouring process.env.PORT/HOST would let a stray env var or a .env in the site
// dir silently move the site off :3000 (or onto loopback) and break the public URL.
const PORT = 3000;
const HOST = "0.0.0.0";
const CLIENT_DIR = `${import.meta.dir}/dist/client`;

// Free PORT regardless of which user owns the current listener. lsof runs under
// sudo so it can see (and the kill can signal) a process owned by another user;
// the loop waits for the socket to actually release before we bind.
const freePort =
  `for _ in $(seq 1 25); do ` +
  `pids=$(lsof -t -iTCP:${String(PORT)} -sTCP:LISTEN 2>/dev/null || true); ` +
  `if [ -z "$pids" ]; then exit 0; fi; ` +
  `kill $pids 2>/dev/null || true; sleep 0.2; ` +
  `done`;

// Inline API route handler for REST endpoints
async function handleApiRequest(req: Request): Promise<Response | null> {
  const url = new URL(req.url);
  const path = url.pathname;

  // GET /api/db/init — check database status
  if (path === "/api/db/init" && req.method === "GET") {
    const dbUrl = getDbUrl();
    if (!dbUrl) {
      return Response.json({
        connected: false,
        url_configured: false,
        message: "DATABASE_URL not set — configure a Postgres connection string",
      });
    }
    const db = getDb();
    return Response.json({
      connected: !!db,
      url_configured: true,
      url_type: dbUrl.startsWith("postgres") ? "valid_postgres" : "invalid",
    });
  }

  // POST /api/db/init — run migrations and seed
  if (path === "/api/db/init" && req.method === "POST") {
    const dbUrl = getDbUrl();
    if (!dbUrl) {
      return Response.json(
        { status: "error", message: "DATABASE_URL not set or not a valid Postgres connection string" },
        { status: 400 },
      );
    }
    try {
      await runMigrations(dbUrl);
      return Response.json({ status: "success", message: "Database schema created and seed data loaded" });
    } catch (error: any) {
      return Response.json({ status: "error", message: error.message }, { status: 500 });
    }
  }

  // GET /api/stats — pipeline statistics
  if (path === "/api/stats" && req.method === "GET") {
    const db = getDb();
    if (!db) {
      return Response.json({
        stats: {
          total_leads: 47,
          emailed: 23,
          leads_this_week: 18,
          open_rate: 41,
          conversion_rate: 18,
        },
      });
    }
    try {
      const results = await Promise.all([
        db`SELECT COUNT(*) as total FROM leads`,
        db`SELECT COUNT(*) as total FROM leads WHERE status = 'emailed'`,
        db`SELECT COUNT(*) as total FROM leads WHERE created_at > NOW() - INTERVAL '7 days'`,
      ]);
      return Response.json({
        stats: {
          total_leads: Number(results[0][0]?.total ?? 0),
          emailed: Number(results[1][0]?.total ?? 0),
          leads_this_week: Number(results[2][0]?.total ?? 0),
        },
      });
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  // GET /api/leads — list leads
  if (path === "/api/leads" && req.method === "GET") {
    const campaignId = url.searchParams.get("campaign_id");
    const status = url.searchParams.get("status");
    const db = getDb();

    if (!db) {
      const mockLeads = [
        { id: "1", url: "example-outdated-design.com", status: "contact_found", campaign_id: null, screenshot_path: null, audit_results: { issues: 4 }, contact_name: "John Smith", contact_email: "john@example.com", contact_linkedin: "linkedin.com/in/johnsmith", drafted_email: null, error_message: null, created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString() },
        { id: "2", url: "slow-consulting-site.co", status: "analyzing", campaign_id: null, screenshot_path: null, audit_results: null, contact_name: null, contact_email: null, contact_linkedin: null, drafted_email: null, error_message: null, created_at: new Date(Date.now() - 172800000).toISOString(), updated_at: new Date().toISOString() },
        { id: "3", url: "broken-ux-bakery.com", status: "emailed", campaign_id: null, screenshot_path: null, audit_results: { issues: 7 }, contact_name: "Sarah Lee", contact_email: "sarah@bakery.com", contact_linkedin: null, drafted_email: "Hi Sarah...", error_message: null, created_at: new Date(Date.now() - 259200000).toISOString(), updated_at: new Date().toISOString() },
        { id: "4", url: "no-cta-plumbing.com", status: "screenshotting", campaign_id: null, screenshot_path: null, audit_results: null, contact_name: null, contact_email: null, contact_linkedin: null, drafted_email: null, error_message: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: "5", url: "bad-mobile-lawfirm.io", status: "contact_found", campaign_id: null, screenshot_path: null, audit_results: { issues: 5 }, contact_name: "Mike Johnson", contact_email: "mike@lawfirm.io", contact_linkedin: "linkedin.com/in/mikej", drafted_email: null, error_message: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      ];
      let filtered = mockLeads;
      if (campaignId) filtered = filtered.filter(l => l.campaign_id === campaignId);
      if (status) filtered = filtered.filter(l => l.status === status);
      return Response.json({ leads: filtered });
    }

    try {
      let query = `SELECT * FROM leads`;
      const params: string[] = [];
      const conditions: string[] = [];

      if (campaignId) {
        conditions.push(`campaign_id = $${params.length + 1}`);
        params.push(campaignId);
      }
      if (status) {
        conditions.push(`status = $${params.length + 1}`);
        params.push(status);
      }
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
      }
      query += ` ORDER BY created_at DESC`;

      const rows = params.length > 0 ? await db(query, params) : await db(query);
      return Response.json({ leads: rows });
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  // POST /api/leads — create lead
  if (path === "/api/leads" && req.method === "POST") {
    const body = await req.json();
    const { campaign_id, url, status = "pending" } = body;
    if (!url) {
      return Response.json({ error: "url is required" }, { status: 400 });
    }
    const db = getDb();
    if (!db) {
      return Response.json({
        lead: { id: crypto.randomUUID(), campaign_id: campaign_id || null, url, status, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      }, { status: 201 });
    }
    try {
      const rows = await db(
        `INSERT INTO leads (campaign_id, url, status) VALUES ($1, $2, $3) RETURNING *`,
        [campaign_id || null, url, status],
      );
      return Response.json({ lead: rows[0] }, { status: 201 });
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  // GET /api/leads/:id — get lead by id
  const leadsMatch = path.match(/^\/api\/leads\/([^/]+)$/);
  if (leadsMatch && req.method === "GET") {
    const leadId = leadsMatch[1];
    const db = getDb();
    if (!db) {
      const mockLeads = [
        { id: "1", url: "example-outdated-design.com", status: "contact_found", issues: 4, contact_name: "John Smith" },
        { id: "2", url: "slow-consulting-site.co", status: "analyzing" },
        { id: "3", url: "broken-ux-bakery.com", status: "emailed", issues: 7, contact_name: "Sarah Lee" },
      ];
      const lead = mockLeads.find(l => l.id === leadId);
      if (!lead) return Response.json({ error: "Lead not found" }, { status: 404 });
      return Response.json({ lead });
    }
    try {
      const rows = await db(`SELECT * FROM leads WHERE id = $1`, [leadId]);
      if (rows.length === 0) return Response.json({ error: "Lead not found" }, { status: 404 });
      return Response.json({ lead: rows[0] });
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  // Not an API route
  return null;
}

// Take over the port, re-freeing and retrying if another publish grabbed it in the
// gap between freeing and binding (last publish wins). Bun.serve throws EADDRINUSE
// synchronously, so without this a raced publish would die while the shell already
// reported success.
for (let attempt = 1; ; attempt++) {
  await Bun.$`sudo sh -c ${freePort}`.quiet().nothrow();
  try {
    Bun.serve({
      port: PORT,
      hostname: HOST,
      async fetch(req) {
        // Check API routes first
        const apiResponse = await handleApiRequest(req);
        if (apiResponse) return apiResponse;

        const { pathname } = new URL(req.url);
        if (pathname !== "/") {
          const file = Bun.file(CLIENT_DIR + pathname);
          if (await file.exists()) return new Response(file);
        }
        return (
          handler as { fetch: (r: Request) => Response | Promise<Response> }
        ).fetch(req);
      },
    });
    break;
  } catch (err) {
    if (attempt >= 10) throw err;
    await Bun.sleep(200);
  }
}

console.log(`team-site serving on http://${HOST}:${String(PORT)}`);
