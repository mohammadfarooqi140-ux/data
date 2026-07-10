import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/leads/$id")({
  GET: async ({ params }) => {
    const { sql } = await import("~/db");
    try {
      const rows = await sql()(`SELECT * FROM leads WHERE id = $1`, params.id);
      if (rows.length === 0) {
        return json({ error: "Lead not found" }, { status: 404 });
      }
      return json({ lead: rows[0] });
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

    const allowedFields = [
      "status", "screenshot_path", "audit_results", "contact_name",
      "contact_email", "contact_linkedin", "drafted_email",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = $${idx}`);
        if (typeof body[field] === "object") {
          values.push(JSON.stringify(body[field]));
        } else {
          values.push(body[field]);
        }
        idx++;
      }
    }

    if (updates.length === 0) {
      return json({ error: "No valid fields to update" }, { status: 400 });
    }

    updates.push(`updated_at = NOW()`);
    values.push(params.id);

    try {
      const rows = await sql()(
        `UPDATE leads SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
        ...values,
      );
      if (rows.length === 0) {
        return json({ error: "Lead not found" }, { status: 404 });
      }
      return json({ lead: rows[0] });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },

  DELETE: async ({ params }) => {
    const { sql } = await import("~/db");
    try {
      const rows = await sql()(
        `DELETE FROM leads WHERE id = $1 RETURNING id`,
        params.id,
      );
      if (rows.length === 0) {
        return json({ error: "Lead not found" }, { status: 404 });
      }
      return json({ success: true, deleted_id: rows[0].id });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },
});