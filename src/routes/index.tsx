import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />
      {/* How It Works */}
      <HowItWorksSection />
      {/* Features */}
      <FeaturesSection />
      {/* Pricing */}
      <PricingSection />
      {/* CTA */}
      <CTASection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            🚀 Automated outreach for agencies
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Turn Broken Websites{" "}
            <span className="text-indigo-600">Into Clients</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            PitchPilot automatically screenshots websites, audits them for design flaws,
            finds the owner's real contact info, and drafts personalized pitch emails.
            Stop hunting for leads — let the machine do it.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary text-base px-8 py-3.5">
              Start Free Trial
            </Link>
            <a
              href="#how-it-works"
              className="btn-secondary text-base px-8 py-3.5"
            >
              View Demo
            </a>
          </div>
          {/* Social proof */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">10K+</span>
              <span className="hidden sm:inline">leads processed</span>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">40%</span>
              <span className="hidden sm:inline">avg. open rate</span>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">500+</span>
              <span className="hidden sm:inline">agencies trust us</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Upload URLs",
      description:
        "Paste a list of website URLs or upload a CSV. PitchPilot accepts hundreds of URLs at once — no limits on batch size.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Screenshot & Analyze",
      description:
        "We capture full-page screenshots and run AI-powered audits to detect design flaws, UX issues, slow load times, and mobile responsiveness problems.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.41a2.25 2.25 0 0 1 3.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Find the Owner",
      description:
        "We automatically discover the website owner's name, email, and LinkedIn profile using smart contact-finding algorithms and public data sources.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Draft & Send",
      description:
        "We generate a personalized pitch email highlighting specific flaws found on their site. Review, edit, and send with one click — or export the list.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="border-t border-gray-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-indigo-600">How it Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From URL to client in 4 steps
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Stop wasting hours researching leads. Let PitchPilot automate the entire
            prospecting pipeline.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                {step.icon}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-medium text-indigo-600">
                  Step {step.number}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Full-Page Screenshots",
      description:
        "Capture complete, high-resolution screenshots of any website — including above and below the fold. See exactly what visitors see.",
      icon: "📸",
    },
    {
      title: "AI Design Flaw Detection",
      description:
        "Our AI analyzes screenshots for poor contrast, broken layouts, missing CTAs, slow indicators, mobile issues, and outdated design patterns.",
      icon: "🤖",
    },
    {
      title: "Contact Discovery Engine",
      description:
        "Smart algorithms find the right decision-maker — owner, marketing head, or founder — with their email and LinkedIn profile. No more guessing.",
      icon: "🎯",
    },
    {
      title: "Personalized Email Drafts",
      description:
        "Each pitch includes specific flaws found on their site. Generic outreach gets ignored — personalized emails get replies.",
      icon: "✍️",
    },
    {
      title: "Bulk Processing",
      description:
        "Upload a CSV with hundreds of URLs. PitchPilot processes them all in one batch, saving you hours of manual research.",
      icon: "⚡",
    },
    {
      title: "Campaign Management",
      description:
        "Group leads into campaigns, track progress, monitor open rates, and see which pitches convert. Full pipeline visibility.",
      icon: "📊",
    },
  ];

  return (
    <section id="features" className="border-t border-gray-100 bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-indigo-600">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to win clients
          </p>
          <p className="mt-4 text-lg text-gray-600">
            PitchPilot combines browser automation, AI analysis, and smart outreach into one seamless workflow.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "For freelancers and solo operators",
      features: [
        "100 leads per month",
        "Full-page screenshots",
        "AI design flaw analysis",
        "Contact discovery",
        "Email drafts",
        "Basic analytics",
      ],
      cta: "Start Free Trial",
      featured: false,
    },
    {
      name: "Growth",
      price: "$50",
      period: "/month",
      description: "For growing agencies and teams",
      features: [
        "500 leads per month",
        "Everything in Starter",
        "Campaign management",
        "Pipeline analytics",
        "Email open rate tracking",
        "CSV export",
        "Priority support",
      ],
      cta: "Start Free Trial",
      featured: true,
    },
    {
      name: "Agency",
      price: "$100",
      period: "/month",
      description: "For scale and unlimited prospecting",
      features: [
        "Unlimited leads",
        "Everything in Growth",
        "White-label reports",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="border-t border-gray-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Start with a 7-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 shadow-sm ${
                plan.featured
                  ? "border-indigo-600 bg-white ring-2 ring-indigo-600"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`mt-8 block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold ${
                  plan.featured
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border-t border-gray-100 bg-indigo-600 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to turn broken websites into clients?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Join 500+ agencies using PitchPilot to automate their outreach. Start your free trial today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 shadow-sm transition-all hover:bg-indigo-50"
            >
              Start Free Trial
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-lg border border-indigo-400 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-indigo-500"
            >
              Learn More
            </a>
          </div>
          <p className="mt-4 text-sm text-indigo-200">
            7-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}