import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/campaigns/$id")({
  GET: async ({ params }) => {
    const { sql } = await import("~/db");
    try {
      const rows = await sql()(
        `SELECT c.*, (SELECT COUNT(*) FROM leads WHERE campaign_id = c.id) as lead_count FROM campaigns c WHERE c.id = $1`,
        params.id,
      );
      if (rows.length === 0) {
        return json({ error: "Campaign not found" }, { status: 404 });
      }
      return json({ campaign: rows[0] });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },

  PATCH: async ({ params, request }) => {
    const body = await request.json();
    const { sql } = await import("~/db");

    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (body.name !== undefined) {
      updates.push(`name = $${idx}`);
      values.push(body.name);
      idx++;
    }
    if (body.status !== undefined) {
      updates.push(`status = $${idx}`);
      values.push(body.status);
      idx++;
    }

    if (updates.length === 0) {
      return json({ error: "No valid fields to update" }, { status: 400 });
    }

    values.push(params.id);

    try {
      const rows = await sql()(
        `UPDATE campaigns SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
        ...values,
      );
      if (rows.length === 0) {
        return json({ error: "Campaign not found" }, { status: 404 });
      }
      return json({ campaign: rows[0] });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },

  DELETE: async ({ params }) => {
    const { sql } = await import("~/db");
    try {
      await sql()(`DELETE FROM leads WHERE campaign_id = $1`, params.id);
      const rows = await sql()(
        `DELETE FROM campaigns WHERE id = $1 RETURNING id`,
        params.id,
      );
      if (rows.length === 0) {
        return json({ error: "Campaign not found" }, { status: 404 });
      }
      return json({ success: true, deleted_id: rows[0].id });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },
});