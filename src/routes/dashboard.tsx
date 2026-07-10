import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "~/db";
import type { DashboardStats, DbLead } from "~/types";
import { STATUS_LABELS, STATUS_STYLES } from "~/types";

// Server functions for data fetching

const getStats = createServerFn({ method: "GET" }).handler(async (): Promise<{ stats: DashboardStats }> => {
  const db = getDb();

  if (!db) {
    return {
      stats: {
        total_leads: 47,
        emailed: 23,
        leads_this_week: 18,
        open_rate: 41,
        conversion_rate: 18,
      },
    };
  }

  try {
    const results = await Promise.all([
      db`SELECT COUNT(*) as total FROM leads`,
      db`SELECT COUNT(*) as total FROM leads WHERE status = 'emailed'`,
      db`SELECT COUNT(*) as total FROM leads WHERE created_at > NOW() - INTERVAL '7 days'`,
    ]);

    return {
      stats: {
        total_leads: Number(results[0][0]?.total ?? 0),
        emailed: Number(results[1][0]?.total ?? 0),
        leads_this_week: Number(results[2][0]?.total ?? 0),
      },
    };
  } catch {
    return {
      stats: { total_leads: 0, emailed: 0, leads_this_week: 0 },
    };
  }
});

const getLeads = createServerFn({ method: "GET" }).handler(async (): Promise<{ leads: DbLead[] }> => {
  const db = getDb();

  if (!db) {
    return {
      leads: [
        { id: "1", url: "example-outdated-design.com", status: "contact_found", campaign_id: null, screenshot_path: null, audit_results: { issues: 4 }, contact_name: "John Smith", contact_email: "john@example.com", contact_linkedin: "linkedin.com/in/johnsmith", drafted_email: null, error_message: null, created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString() },
        { id: "2", url: "slow-consulting-site.co", status: "analyzing", campaign_id: null, screenshot_path: null, audit_results: null, contact_name: null, contact_email: null, contact_linkedin: null, drafted_email: null, error_message: null, created_at: new Date(Date.now() - 172800000).toISOString(), updated_at: new Date().toISOString() },
        { id: "3", url: "broken-ux-bakery.com", status: "emailed", campaign_id: null, screenshot_path: null, audit_results: { issues: 7 }, contact_name: "Sarah Lee", contact_email: "sarah@bakery.com", contact_linkedin: null, drafted_email: "Hi Sarah...", error_message: null, created_at: new Date(Date.now() - 259200000).toISOString(), updated_at: new Date().toISOString() },
        { id: "4", url: "no-cta-plumbing.com", status: "screenshotting", campaign_id: null, screenshot_path: null, audit_results: null, contact_name: null, contact_email: null, contact_linkedin: null, drafted_email: null, error_message: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: "5", url: "bad-mobile-lawfirm.io", status: "contact_found", campaign_id: null, screenshot_path: null, audit_results: { issues: 5 }, contact_name: "Mike Johnson", contact_email: "mike@lawfirm.io", contact_linkedin: "linkedin.com/in/mikej", drafted_email: null, error_message: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      ],
    };
  }

  try {
    const rows = await db`SELECT * FROM leads ORDER BY created_at DESC LIMIT 50`;
    return { leads: rows as unknown as DbLead[] };
  } catch {
    return { leads: [] };
  }
});

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  loader: async () => {
    const [statsData, leadsData] = await Promise.all([
      getStats(),
      getLeads(),
    ]);
    return { stats: statsData.stats, leads: leadsData.leads };
  },
});

function DashboardPage() {
  const { stats, leads } = Route.useLoaderData();

  const statCards = [
    { label: "Leads This Week", value: String(stats.leads_this_week), change: "+12%" },
    { label: "Emails Sent", value: String(stats.emailed), change: "+8%" },
    { label: "Open Rate", value: stats.open_rate ? `${stats.open_rate}%` : "N/A", change: "+3%" },
    { label: "Total Leads", value: String(stats.total_leads), change: "" },
  ];

  const issueCount = (lead: DbLead): number => {
    if (lead.audit_results && typeof lead.audit_results === "object") {
      return (lead.audit_results as any).issues ?? 0;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between py-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your leads and track campaign performance
            </p>
          </div>
          <Link to="/dashboard/leads/new" className="btn-primary">
            + Add Leads
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
              {stat.change && (
                <p className="mt-1 text-sm font-medium text-green-600">
                  {stat.change}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Leads
            </h2>
            <span className="text-sm text-gray-500">
              {leads.length} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Issues</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                      No leads yet.{" "}
                      <Link to="/dashboard/leads/new" className="text-indigo-600 hover:underline">
                        Add your first lead
                      </Link>
                    </td>
                  </tr>
                )}
                {leads.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        to="/dashboard/leads/$id"
                        params={{ id: lead.id }}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {lead.url}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[lead.status] || "bg-gray-100 text-gray-700"}`}>
                        {STATUS_LABELS[lead.status] || lead.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {issueCount(lead) > 0 ? (
                        <span className="font-medium text-red-600">
                          {issueCount(lead)} issues
                        </span>
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {lead.contact_name ? (
                        <div>
                          <p className="font-medium text-gray-900">{lead.contact_name}</p>
                          {lead.contact_email && <p className="text-gray-500">{lead.contact_email}</p>}
                        </div>
                      ) : (
                        <span className="text-gray-400">Searching...</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Link
                        to="/dashboard/leads/$id"
                        params={{ id: lead.id }}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}