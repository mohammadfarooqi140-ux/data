import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/stats")({
  GET: async () => {
    const { sql } = await import("~/db");

    try {
      const results = await Promise.all([
        sql()`SELECT COUNT(*) as total FROM leads`,
        sql()`SELECT COUNT(*) as total FROM leads WHERE status = 'emailed'`,
        sql()`SELECT COUNT(*) as total FROM leads WHERE created_at > NOW() - INTERVAL '7 days'`,
      ]);

      return json({
        stats: {
          total_leads: Number(results[0][0].total),
          emailed: Number(results[1][0].total),
          leads_this_week: Number(results[2][0].total),
        },
      });
    } catch (error: any) {
      return json({ error: error.message }, { status: 500 });
    }
  },
});