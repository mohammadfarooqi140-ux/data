import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/leads/new")({
  component: NewLeadsPage,
});

function NewLeadsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add Leads</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload a CSV file or paste URLs to start processing leads
        </p>

        {/* Paste URLs */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Paste URLs
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter one URL per line
          </p>
          <textarea
            rows={6}
            placeholder="https://example.com&#10;https://another-site.org&#10;https://small-business.co"
            className="mt-3 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button className="btn-primary mt-4" type="button">
            Process URLs
          </button>
        </div>

        {/* CSV Upload */}
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
            />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            Upload CSV
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            CSV should have a column named "url"
          </p>
          <label className="btn-primary mt-4 inline-flex cursor-pointer">
            <input type="file" accept=".csv" className="hidden" />
            Choose File
          </label>
        </div>
      </div>
    </div>
  );
}