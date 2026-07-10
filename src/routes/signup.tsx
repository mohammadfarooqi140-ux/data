import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-16">
      <div className="w-full max-w-sm px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Start your free trial</h1>
          <p className="mt-2 text-sm text-gray-600">
            No credit card required. 7 days free.
          </p>
        </div>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Smith"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Work email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@agency.com"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button type="submit" className="btn-primary w-full py-2.5">
            Start Free Trial
          </button>
          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to our Terms and Privacy Policy.
          </p>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}