import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

const MOCK_LEADS = [
  {
    id: "1",
    url: "example-outdated-design.com",
    status: "contact_found",
    issues: 4,
    contactName: "John Smith",
    contactEmail: "john@example-outdated-design.com",
    screenshot: null,
  },
  {
    id: "2",
    url: "slow-consulting-site.co",
    status: "analyzing",
    issues: 0,
    contactName: null,
    contactEmail: null,
    screenshot: null,
  },
  {
    id: "3",
    url: "broken-ux-bakery.com",
    status: "emailed",
    issues: 7,
    contactName: "Sarah Lee",
    contactEmail: "sarah@broken-ux-bakery.com",
    screenshot: null,
  },
  {
    id: "4",
    url: "no-cta-plumbing.com",
    status: "screenshotting",
    issues: 0,
    contactName: null,
    contactEmail: null,
    screenshot: null,
  },
  {
    id: "5",
    url: "bad-mobile-lawfirm.io",
    status: "contact_found",
    issues: 5,
    contactName: "Mike Johnson",
    contactEmail: "mike@bad-mobile-lawfirm.io",
    screenshot: null,
  },
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  screenshotting: "bg-blue-100 text-blue-700",
  analyzing: "bg-yellow-100 text-yellow-700",
  contact_found: "bg-green-100 text-green-700",
  emailed: "bg-purple-100 text-purple-700",
  error: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  screenshotting: "Screenshotting",
  analyzing: "Analyzing",
  contact_found: "Contact Found",
  emailed: "Emailed",
  error: "Error",
};

function DashboardPage() {
  const stats = [
    { label: "Leads This Week", value: "47", change: "+12%" },
    { label: "Emails Sent", value: "23", change: "+8%" },
    { label: "Open Rate", value: "41%", change: "+3%" },
    { label: "Conversion", value: "18%", change: "+5%" },
  ];

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
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-green-600">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Leads
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Issues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_LEADS.map((lead) => (
                  <tr
                    key={lead.id}
                    className="transition-colors hover:bg-gray-50"
                  >
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
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          STATUS_STYLES[lead.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {STATUS_LABELS[lead.status] || lead.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {lead.issues > 0 ? (
                        <span className="font-medium text-red-600">
                          {lead.issues} issues
                        </span>
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {lead.contactName ? (
                        <div>
                          <p className="font-medium text-gray-900">
                            {lead.contactName}
                          </p>
                          <p className="text-gray-500">{lead.contactEmail}</p>
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