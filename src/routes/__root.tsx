import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "PitchPilot — Turn Broken Websites Into Clients",
      },
      {
        name: "description",
        content:
          "Automated outreach engine that screenshots websites, audits for design flaws, finds contacts, and drafts personalized pitch emails. Turn broken sites into clients.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page not found</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
          Go home
        </Link>
      </div>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        <NavBar />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  );
}

function NavBar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-indigo-600">
            PitchPilot
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
            Home
          </Link>
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
            How it Works
          </a>
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost">
            Log in
          </Link>
          <Link to="/signup" className="btn-primary text-sm px-4 py-2">
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <span className="text-lg font-bold text-indigo-600">PitchPilot</span>
            <p className="mt-2 text-sm text-gray-500">
              Automated outreach for agencies.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#features" className="text-sm text-gray-500 hover:text-indigo-600">Features</a></li>
              <li><a href="#pricing" className="text-sm text-gray-500 hover:text-indigo-600">Pricing</a></li>
              <li><Link to="/login" className="text-sm text-gray-500 hover:text-indigo-600">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-gray-500">About</span></li>
              <li><span className="text-sm text-gray-500">Blog</span></li>
              <li><span className="text-sm text-gray-500">Contact</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-gray-500">Privacy</span></li>
              <li><span className="text-sm text-gray-500">Terms</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PitchPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}