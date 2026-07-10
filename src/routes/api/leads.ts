import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/leads")({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const campaignId = url.searchParams.get("campaign_id");
    const status = url.searchParams.get("status");

    const { sql } = await import("~/db");

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

    try {
      const rows = await sql()(query, ...params);
      return json({ leads: rows });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },

  POST: async ({ request }) => {
    const body = await request.json();
    const { campaign_id, url, status = "pending" } = body;

    if (!url) {
      return json({ error: "url is required" }, { status: 400 });
    }

    const { sql } = await import("~/db");

    try {
      const rows = await sql()(
        `INSERT INTO leads (campaign_id, url, status) VALUES ($1, $2, $3) RETURNING *`,
        campaign_id || null,
        url,
        status,
      );
      return json({ lead: rows[0] }, { status: 201 });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },
});