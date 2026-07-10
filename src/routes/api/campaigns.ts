import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/campaigns")({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("user_id");

    const { sql } = await import("~/db");

    let query = `SELECT c.*, (SELECT COUNT(*) FROM leads WHERE campaign_id = c.id) as lead_count FROM campaigns c`;
    const params: string[] = [];
    const conditions: string[] = [];

    if (userId) {
      conditions.push(`c.user_id = $${params.length + 1}`);
      params.push(userId);
    }
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
    query += ` ORDER BY c.created_at DESC`;

    try {
      const rows = await sql()(query, ...params);
      return json({ campaigns: rows });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },

  POST: async ({ request }) => {
    const body = await request.json();
    const { user_id, name } = body;

    if (!name) {
      return json({ error: "name is required" }, { status: 400 });
    }

    const { sql } = await import("~/db");

    try {
      const rows = await sql()(
        `INSERT INTO campaigns (user_id, name) VALUES ($1, $2) RETURNING *`,
        user_id || null,
        name,
      );
      return json({ campaign: rows[0] }, { status: 201 });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },
});