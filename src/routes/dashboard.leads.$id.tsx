import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/leads/$id")({
  component: LeadDetailPage,
});

const MOCK_LEAD = {
  id: "1",
  url: "example-outdated-design.com",
  status: "contact_found",
  issues: [
    "No clear call-to-action button above the fold",
    "Poor color contrast (text on background)",
    "Not mobile-responsive — layout breaks on small screens",
    "Slow page load time (estimated 4.2s)",
  ],
  screenshot: null,
  contact: {
    name: "John Smith",
    email: "john@example-outdated-design.com",
    linkedin: "linkedin.com/in/johnsmith",
    role: "Owner / Founder",
  },
  draftEmail: `Hi John,

I was browsing example-outdated-design.com and noticed a few things that might be costing you customers:

1. There's no clear call-to-action button above the fold — visitors don't know what to do next.
2. The color contrast makes some text hard to read, especially on mobile.
3. The site isn't fully responsive — it doesn't look great on phones.

We specialize in modernizing websites like yours. I'd love to show you how a quick redesign could improve your conversion rate.

Are you open to a quick 10-minute chat this week?

Best,
Jane
PitchPilot Agency`,
};

function LeadDetailPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          &larr; Back to Dashboard
        </button>

        {/* Lead Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {MOCK_LEAD.url}
              </h1>
              <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Contact Found
              </span>
            </div>
            <button className="btn-primary">Send Pitch Email</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Screenshot */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Screenshot
              </h2>
              <div className="mt-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                <div className="text-center">
                  <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.41a2.25 2.25 0 0 1 3.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <p className="mt-2 text-sm">Screenshot will appear here</p>
                </div>
              </div>
            </div>

            {/* Audit Results */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Audit Results
              </h2>
              <ul className="mt-4 space-y-3">
                {MOCK_LEAD.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                      !
                    </span>
                    <span className="text-sm text-gray-700">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Contact
              </h2>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {MOCK_LEAD.contact.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </p>
                  <p className="mt-0.5 text-sm text-gray-700">
                    {MOCK_LEAD.contact.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    LinkedIn
                  </p>
                  <p className="mt-0.5 text-sm text-indigo-600">
                    {MOCK_LEAD.contact.linkedin}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Role
                  </p>
                  <p className="mt-0.5 text-sm text-gray-700">
                    {MOCK_LEAD.contact.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Draft Email */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Draft Email
              </h2>
              <textarea
                rows={12}
                defaultValue={MOCK_LEAD.draftEmail}
                className="mt-4 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div className="mt-4 flex gap-2">
                <button className="btn-primary flex-1 py-2 text-sm">
                  Send Now
                </button>
                <button className="btn-secondary flex-1 py-2 text-sm">
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}