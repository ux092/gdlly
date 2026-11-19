export const services = [
  {
    id: "s1",
    title: "1-on-1 Codebase & Architecture Audit",
    shortTitle: "Codebase & Architecture Audit",
    category: "web-dev",
    expertId: "alex-chen",
    price: 150,
    rating: 5.0,
    reviewCount: 88,
    deliveryDays: 3,
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    description: "Get a comprehensive architectural tear-down of your React or Next.js repository with actionable refactoring advice and performance fixes.",
    deliverables: [
      "Full repository code review (up to 25,000 LOC)",
      "Lighthouse performance profile & bundle analysis",
      "Prioritized security and technical debt matrix",
      "45-minute 1-on-1 video walkthrough call"
    ],
    packages: {
      basic: {
        name: "Quick Health Check",
        price: 150,
        delivery: "2 days",
        revisions: "1 review",
        features: ["Core architectural review", "Lighthouse & bundle analysis report", "Written action checklist"]
      },
      standard: {
        name: "Standard Deep Dive",
        price: 290,
        delivery: "3 days",
        revisions: "2 reviews",
        features: ["Complete repository review", "Security & dependency audit", "45-min strategy video call", "Pull request with top fixes"]
      },
      premium: {
        name: "Full Team Transformation",
        price: 540,
        delivery: "5 days",
        revisions: "Unlimited during sprint",
        features: ["Full repository refactor plan", "2x 60-min team architecture workshops", "Direct Slack access for 14 days", "CI/CD performance budget setup"]
      }
    },
    faqs: [
      {
        question: "How do I share my codebase securely?",
        answer: "You can grant read-only access to a private GitHub/GitLab repository or upload a sanitized zip archive under a signed NDA."
      },
      {
        question: "What frameworks are supported?",
        answer: "React, Next.js, Remix, Vite, TypeScript, Node.js, and modern styling libraries like Tailwind CSS."
      }
    ]
  },
  {
    id: "s2",
    title: "End-to-End Design System Review & Critique",
    shortTitle: "Design System Review",
    category: "design",
    expertId: "sarah-jenkins",
    price: 120,
    rating: 4.95,
    reviewCount: 95,
    deliveryDays: 2,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    description: "Audit your Figma components, token nomenclature, variant structure, and accessibility compliance with a senior design systems leader.",
    deliverables: [
      "Figma file audit with in-canvas sticky note feedback",
      "WCAG 2.2 color contrast compliance report",
      "Token naming convention recommendations",
      "Recorded video critique showing component restructuring"
    ],
    packages: {
      basic: {
        name: "Figma File Critique",
        price: 120,
        delivery: "2 days",
        revisions: "1 review",
        features: ["Top 10 core component audit", "In-file Figma comments", "20-minute video walkthrough"]
      },
      standard: {
        name: "Complete System Overhaul",
        price: 240,
        delivery: "3 days",
        revisions: "2 reviews",
        features: ["Full library review (all variants)", "Token hierarchy mapping", "45-minute live consultation", "WCAG accessibility fixes"]
      },
      premium: {
        name: "Design-to-Code Bridge",
        price: 480,
        delivery: "5 days",
        revisions: "Unlimited",
        features: ["Figma variables to Tailwind config setup", "Developer handoff documentation", "Pairing session with lead frontend engineer"]
      }
    },
    faqs: [
      {
        question: "Can you review in-progress Figma drafts?",
        answer: "Yes! Early feedback often prevents costly component re-architecture down the road."
      }
    ]
  },
  {
    id: "s3",
    title: "Custom Data Pipeline & Dashboard Consultation",
    shortTitle: "Data Pipeline & Dashboard",
    category: "data-ai",
    expertId: "marcus-vance",
    price: 180,
    rating: 4.88,
    reviewCount: 64,
    deliveryDays: 4,
    badge: "Enterprise",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    description: "Turn fragmented customer data into clean automated dashboards. Marcus helps design SQL models and automated ETL jobs.",
    deliverables: [
      "Database schema optimization diagram",
      "Sample SQL analytical queries and view definitions",
      "Interactive dashboard prototype layout",
      "ETL job architecture blueprint"
    ],
    packages: {
      basic: {
        name: "Query Optimization",
        price: 180,
        delivery: "2 days",
        revisions: "1 review",
        features: ["Analyze 5 slow queries", "Indexing strategy recommendations", "Schema indexing report"]
      },
      standard: {
        name: "Dashboard Architecture",
        price: 350,
        delivery: "4 days",
        revisions: "2 reviews",
        features: ["End-to-end dashboard wireframe", "SQL data marts creation", "60-minute strategy session"]
      },
      premium: {
        name: "Production Pipeline Build",
        price: 680,
        delivery: "6 days",
        revisions: "3 reviews",
        features: ["Automated Python ETL script", "Full database migration strategy", "Production monitoring setup"]
      }
    },
    faqs: [
      {
        question: "What databases do you support?",
        answer: "PostgreSQL, MySQL, Snowflake, BigQuery, and SQLite."
      }
    ]
  },
  {
    id: "s4",
    title: "Growth Marketing Funnel & Ad Strategy Audit",
    shortTitle: "Marketing Funnel & Ad Audit",
    category: "marketing",
    expertId: "elena-rostova",
    price: 140,
    rating: 4.92,
    reviewCount: 78,
    deliveryDays: 3,
    badge: "High ROI",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    description: "Elena analyzes your ad accounts, landing page drop-offs, and email sequences to stop ad waste and scale customer acquisition.",
    deliverables: [
      "Ad account structure & creative fatigue evaluation",
      "Landing page conversion tear-down (mobile & desktop)",
      "CAC reduction recommendations roadmap",
      "Creative brief templates for high-performing hooks"
    ],
    packages: {
      basic: {
        name: "Landing Page Teardown",
        price: 140,
        delivery: "2 days",
        revisions: "1 review",
        features: ["1 landing page video teardown", "Copy & layout improvements", "Speed & mobile UX checklist"]
      },
      standard: {
        name: "Paid Ads & Funnel Audit",
        price: 275,
        delivery: "3 days",
        revisions: "2 reviews",
        features: ["Meta & Google ad audit", "Funnel leak analysis", "45-minute live consultation", "Actionable 30-day growth plan"]
      },
      premium: {
        name: "Full Growth Sprint",
        price: 520,
        delivery: "5 days",
        revisions: "Unlimited",
        features: ["Complete acquisition strategy", "5 tested ad creative concepts", "Email onboarding sequence rewrite", "Bi-weekly sync calls for 1 month"]
      }
    },
    faqs: [
      {
        question: "What ad spend level is required?",
        answer: "Best suited for brands spending between $1,000 and $50,000/month on digital ads."
      }
    ]
  },
  {
    id: "s5",
    title: "Freelance Pitch Deck & Rate Doubling Coaching",
    shortTitle: "Freelance Coaching & Rate Doubling",
    category: "freelancing",
    expertId: "david-kim",
    price: 110,
    rating: 5.0,
    reviewCount: 112,
    deliveryDays: 2,
    badge: "Transformative",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    description: "Work directly with David to rewrite your proposals, transition from hourly to value pricing, and land higher-paying direct clients.",
    deliverables: [
      "Review of your current portfolio and proposal templates",
      "Custom 3-tier pricing proposal template for your niche",
      "Objection handling script for closing high-ticket clients",
      "60-minute 1-on-1 roleplay and strategy call"
    ],
    packages: {
      basic: {
        name: "Proposal Tear-Down",
        price: 110,
        delivery: "2 days",
        revisions: "1 review",
        features: ["Detailed critique of your last proposal", "Actionable rewrites for higher perceived value", "Pricing structure suggestions"]
      },
      standard: {
        name: "1-on-1 Rate Doubling Session",
        price: 210,
        delivery: "3 days",
        revisions: "2 reviews",
        features: ["60-minute video coaching call", "Customizable proposal template", "Cold pitch script review", "Follow-up email templates"]
      },
      premium: {
        name: "Client Closing Mentorship",
        price: 390,
        delivery: "7 days",
        revisions: "3 reviews",
        features: ["2x 60-min strategy sessions", "Live deal support on an active prospect", "WhatsApp/Slack messaging access for 14 days"]
      }
    },
    faqs: [
      {
        question: "Is this suitable for beginner freelancers?",
        answer: "Yes, establishing proper positioning early prevents months of undercharging."
      }
    ]
  },
  {
    id: "s6",
    title: "Custom AI Agent Workflow Setup & Prompt Tuning",
    shortTitle: "AI Agent & Prompt Setup",
    category: "ai-tools",
    expertId: "priya-sharma",
    price: 160,
    rating: 4.96,
    reviewCount: 92,
    deliveryDays: 3,
    badge: "AI Powered",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "Priya designs customized AI agents and automation flows (n8n/webhook triggers) tailored specifically to your company's knowledge base.",
    deliverables: [
      "System prompt architecture with guardrails & structured JSON schemas",
      "Configured n8n/webhook automation template export",
      "Evaluation test suite with 20 edge-case prompts",
      "Implementation and API deployment guide"
    ],
    packages: {
      basic: {
        name: "Prompt Architecture",
        price: 160,
        delivery: "2 days",
        revisions: "1 review",
        features: ["Custom system prompt design", "Structured JSON output schema", "Hallucination reduction tests"]
      },
      standard: {
        name: "Agent & Webhook Setup",
        price: 310,
        delivery: "3 days",
        revisions: "2 reviews",
        features: ["n8n workflow file ready to import", "External tool connection guide", "45-min live configuration session", "Error fallback pipeline"]
      },
      premium: {
        name: "Autonomous Ops Suite",
        price: 580,
        delivery: "5 days",
        revisions: "Unlimited",
        features: ["Multi-agent orchestrator setup", "Vector store integration plan", "Full team documentation", "30 days async bugfix support"]
      }
    },
    faqs: [
      {
        question: "Can we connect our self-hosted LLM or OpenAI/Gemini?",
        answer: "Yes! Priya works across Google Gemini, Claude, OpenAI, and local Ollama models."
      }
    ]
  },
  {
    id: "s7",
    title: "Frontend Performance & Core Web Vitals Optimization",
    shortTitle: "Core Web Vitals Optimization",
    category: "web-dev",
    expertId: "alex-chen",
    price: 135,
    rating: 4.9,
    reviewCount: 54,
    deliveryDays: 2,
    badge: "Speed Boost",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    description: "Eliminate layout shifts (CLS), accelerate Largest Contentful Paint (LCP), and optimize Interaction to Next Paint (INP) for modern mobile web apps.",
    deliverables: [
      "Real-user monitoring (RUM) trace breakdown",
      "Bundle size optimization recommendations",
      "Font and image loading strategy",
      "Pull request with critical performance fixes"
    ],
    packages: {
      basic: {
        name: "CWV Audit",
        price: 135,
        delivery: "2 days",
        revisions: "1 review",
        features: ["Lighthouse trace diagnostics", "Image & font optimization guide", "LCP / CLS remediation plan"]
      },
      standard: {
        name: "Hands-on Speed Sprint",
        price: 260,
        delivery: "3 days",
        revisions: "2 reviews",
        features: ["Direct PR with code fixes", "Dynamic import restructuring", "Cache-control header optimization"]
      },
      premium: {
        name: "Guaranteed 90+ Score",
        price: 490,
        delivery: "5 days",
        revisions: "Until 90+ achieved",
        features: ["Comprehensive speed overhaul", "Third-party script deferral", "Lighthouse CI integration in GitHub Actions"]
      }
    },
    faqs: [
      {
        question: "Will this improve mobile Google search rankings?",
        answer: "Yes! Core Web Vitals are confirmed Google mobile ranking signals."
      }
    ]
  },
  {
    id: "s8",
    title: "Mobile App UI/UX Heuristic Evaluation",
    shortTitle: "Mobile UI/UX Evaluation",
    category: "design",
    expertId: "sarah-jenkins",
    price: 125,
    rating: 4.88,
    reviewCount: 67,
    deliveryDays: 2,
    badge: "User First",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    description: "Get an expert Nielsen-Norman heuristic breakdown of your mobile app's onboarding, navigation, and checkout screens.",
    deliverables: [
      "10-point heuristic evaluation matrix",
      "Mobile thumb-zone accessibility assessment",
      "Screen-by-screen annotated UX improvements",
      "Figma rework suggestions"
    ],
    packages: {
      basic: {
        name: "Heuristic Check",
        price: 125,
        delivery: "2 days",
        revisions: "1 review",
        features: ["Audit of 3 core user flows", "Annotated screenshots with UX fixes", "Executive summary PDF"]
      },
      standard: {
        name: "Complete App Flow Audit",
        price: 250,
        delivery: "3 days",
        revisions: "2 reviews",
        features: ["Audit of entire onboarding and purchase flows", "Figma redesign snippets for problematic components", "30-minute sync"]
      },
      premium: {
        name: "Design Sprint Overhaul",
        price: 460,
        delivery: "5 days",
        revisions: "Unlimited",
        features: ["Complete flow restructuring in Figma", "Interactive prototype for user testing", "Developer handoff documentation"]
      }
    },
    faqs: [
      {
        question: "Does this include testing on real iOS and Android devices?",
        answer: "Yes, Sarah tests designs across standard iPhone and Android viewports."
      }
    ]
  },
  {
    id: "s9",
    title: "Customer Acquisition Cost (CAC) Reduction Strategy",
    shortTitle: "CAC Reduction Strategy",
    category: "marketing",
    expertId: "elena-rostova",
    price: 175,
    rating: 4.9,
    reviewCount: 43,
    deliveryDays: 4,
    badge: "Growth",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    description: "Identify leaky acquisition channels and reallocate your budget to lower your blended customer acquisition cost by 25-40%.",
    deliverables: [
      "Cross-channel attribution analysis",
      "Channel unit economics scorecard",
      "Organic referral loop design",
      "60-minute executive presentation"
    ],
    packages: {
      basic: {
        name: "CAC Diagnostic",
        price: 175,
        delivery: "3 days",
        revisions: "1 review",
        features: ["Channel efficiency breakdown", "Wasted spend identification", "Action list for immediate 15% savings"]
      },
      standard: {
        name: "Full Growth Optimization",
        price: 340,
        delivery: "4 days",
        revisions: "2 reviews",
        features: ["Complete attribution model audit", "Landing page split testing roadmap", "Executive strategy call"]
      },
      premium: {
        name: "Fractional Growth Partner",
        price: 650,
        delivery: "7 days",
        revisions: "Ongoing",
        features: ["Rebuild of core customer acquisition funnels", "Weekly performance reviews for 4 weeks", "Direct access for ad approvals"]
      }
    },
    faqs: [
      {
        question: "What access is needed?",
        answer: "Read-only access to Google Analytics, Meta Ads Manager, and Stripe/payment analytics."
      }
    ]
  },
  {
    id: "s10",
    title: "Enterprise AI Tool Integration & Team Training",
    shortTitle: "Enterprise AI Integration",
    category: "ai-tools",
    expertId: "priya-sharma",
    price: 220,
    rating: 5.0,
    reviewCount: 81,
    deliveryDays: 5,
    badge: "Enterprise",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    description: "Upskill your engineering, marketing, and design teams on prompt engineering, custom AI assistants, and enterprise API safety.",
    deliverables: [
      "Custom internal prompt playbook tailored to company workflows",
      "Secure API key management and token cost reduction guidelines",
      "Interactive 90-minute live workshop recording",
      "Hands-on exercises and grading"
    ],
    packages: {
      basic: {
        name: "Team Workshop",
        price: 220,
        delivery: "3 days",
        revisions: "1 workshop",
        features: ["90-minute live remote workshop", "Slidedeck and prompt templates", "Q&A session"]
      },
      standard: {
        name: "Workflow Integration",
        price: 440,
        delivery: "5 days",
        revisions: "2 reviews",
        features: ["Custom workflow automations setup", "Security guidelines document", "2x team training sessions"]
      },
      premium: {
        name: "Full AI Transformation",
        price: 850,
        delivery: "7 days",
        revisions: "Unlimited during sprint",
        features: ["Custom internal assistant built and deployed", "Enterprise training for all departments", "30 days implementation support"]
      }
    },
    faqs: [
      {
        question: "How many team members can attend?",
        answer: "Workshops comfortably accommodate up to 30 team members with live interactive Q&A."
      }
    ]
  }
];

export const getServiceById = (id) => services.find((s) => s.id === id);
