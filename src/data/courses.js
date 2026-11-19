export const courses = [
  {
    id: "c1",
    title: "Full-Stack Modern React & Next.js Masterclass",
    shortTitle: "React & Next.js Masterclass",
    category: "web-dev",
    level: "Intermediate",
    price: 89,
    originalPrice: 149,
    rating: 4.9,
    reviewCount: 428,
    duration: "18h total",
    lessonsCount: 42,
    instructorId: "alex-chen",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    overview: "Build production-ready, performant web applications using React 19, Server Components, App Router, and responsive Tailwind styling.",
    whatYouLearn: [
      "Master React 19 hooks, transitions, and server actions",
      "Architect clean, reusable design components",
      "Optimize Core Web Vitals to hit 99+ Lighthouse scores",
      "Deploy scalable applications with continuous integration"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Modern React 19 Fundamentals",
        duration: "4h 15m",
        lessons: [
          { id: "l1", title: "React 19 Core Mental Model & New Hooks", duration: "18m", freePreview: true },
          { id: "l2", title: "Server Actions and Optimistic Updates", duration: "25m", freePreview: true },
          { id: "l3", title: "State Management with Context & Reducers", duration: "32m", freePreview: false },
          { id: "l4", title: "Clean Component Composition Rules", duration: "28m", freePreview: false }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Next.js App Router Architecture",
        duration: "5h 40m",
        lessons: [
          { id: "l5", title: "File-system Routing & Nested Layouts", duration: "22m", freePreview: false },
          { id: "l6", title: "Streaming SSR with Suspense Boundaries", duration: "35m", freePreview: false },
          { id: "l7", title: "Caching, Revalidation & Static Exports", duration: "40m", freePreview: false }
        ]
      },
      {
        id: "m3",
        title: "Module 3: Tailwind CSS Production Workflows",
        duration: "4h 20m",
        lessons: [
          { id: "l8", title: "Design Tokens & Tailwind Configuration", duration: "30m", freePreview: false },
          { id: "l9", title: "Building a Fluid Responsive Mobile Shell", duration: "45m", freePreview: false },
          { id: "l10", title: "Micro-interactions and Dark Mode", duration: "35m", freePreview: false }
        ]
      },
      {
        id: "m4",
        title: "Module 4: Real-world Full-Stack Project",
        duration: "4h 10m",
        lessons: [
          { id: "l11", title: "Database Modeling with Prisma", duration: "42m", freePreview: false },
          { id: "l12", title: "Authentication with Protected Routes", duration: "38m", freePreview: false },
          { id: "l13", title: "Production Deployment on Cloud Platforms", duration: "25m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c2",
    title: "Production Python & SQL for Data Analysis",
    shortTitle: "Python & SQL Data Mastery",
    category: "data-ai",
    level: "Beginner",
    price: 69,
    originalPrice: 119,
    rating: 4.8,
    reviewCount: 312,
    duration: "14h total",
    lessonsCount: 36,
    instructorId: "marcus-vance",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    overview: "Go from raw spreadsheets to automated business intelligence dashboards with Python, Pandas, and professional SQL queries.",
    whatYouLearn: [
      "Write multi-table joins, window functions, and CTEs in SQL",
      "Clean, reshape, and analyze millions of rows with Pandas",
      "Generate clear executive visualizations and charts",
      "Automate repetitive daily reporting tasks"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Advanced SQL for Analytics",
        duration: "4h 30m",
        lessons: [
          { id: "l1", title: "Window Functions & Ranking", duration: "24m", freePreview: true },
          { id: "l2", title: "Complex Aggregations & Grouping Sets", duration: "30m", freePreview: false },
          { id: "l3", title: "Performance Tuning & Indexes", duration: "28m", freePreview: false }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Python Data Manipulation",
        duration: "5h 15m",
        lessons: [
          { id: "l4", title: "Pandas DataFrames Deep Dive", duration: "35m", freePreview: false },
          { id: "l5", title: "Data Cleaning & Anomaly Detection", duration: "42m", freePreview: false },
          { id: "l6", title: "Time Series & Cohort Analysis", duration: "38m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c3",
    title: "High-Converting Digital Marketing & SEO Playbook",
    shortTitle: "Digital Marketing & SEO",
    category: "marketing",
    level: "All Levels",
    price: 59,
    originalPrice: 99,
    rating: 4.7,
    reviewCount: 215,
    duration: "10h total",
    lessonsCount: 28,
    instructorId: "elena-rostova",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    overview: "A battle-tested blueprint to rank on search engines, run profitable customer acquisition ads, and double landing page conversions.",
    whatYouLearn: [
      "Modern technical SEO and programmatic page indexing",
      "High-converting landing page copywriting and layouts",
      "Attribution modeling and tracking unit economics",
      "Email nurture workflows that drive recurring revenue"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Search Engine Optimization",
        duration: "3h 45m",
        lessons: [
          { id: "l1", title: "Keyword Research for High-Intent Queries", duration: "20m", freePreview: true },
          { id: "l2", title: "On-Page Semantic Optimization", duration: "26m", freePreview: false }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Conversion Funnels",
        duration: "4h 00m",
        lessons: [
          { id: "l3", title: "Landing Page Wireframing & Psychology", duration: "32m", freePreview: false },
          { id: "l4", title: "A/B Testing Methodologies", duration: "28m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c4",
    title: "Figma to Code: Design Systems & UI Architecture",
    shortTitle: "Design Systems & UI Architecture",
    category: "design",
    level: "Advanced",
    price: 95,
    originalPrice: 159,
    rating: 4.9,
    reviewCount: 512,
    duration: "16h total",
    lessonsCount: 38,
    instructorId: "sarah-jenkins",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
    overview: "Create scalable component libraries in Figma, configure design tokens, and translate them 1:1 into robust code with Tailwind CSS.",
    whatYouLearn: [
      "Build auto-layout component sets with variants and booleans",
      "Set up token hierarchies (global, semantic, component)",
      "Sync Figma variables directly into frontend codebases",
      "Audit designs for contrast, WCAG 2.2 AA accessibility, and mobile tap targets"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Design Tokens & Typography",
        duration: "3h 30m",
        lessons: [
          { id: "l1", title: "Establishing a Cohesive Type Scale", duration: "22m", freePreview: true },
          { id: "l2", title: "Color Palettes with Accessible Contrast", duration: "30m", freePreview: false }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Advanced Figma Components",
        duration: "5h 10m",
        lessons: [
          { id: "l3", title: "Component Sets & Interactive Variants", duration: "35m", freePreview: false },
          { id: "l4", title: "Slot Architecture for Modals and Sheets", duration: "40m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c5",
    title: "Freelance Mastery: From $0 to $10k/Month",
    shortTitle: "Freelance $10k/Mo Playbook",
    category: "freelancing",
    level: "Beginner",
    price: 79,
    originalPrice: 129,
    rating: 4.85,
    reviewCount: 184,
    duration: "12h total",
    lessonsCount: 30,
    instructorId: "david-kim",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    overview: "Stop competing on price on race-to-the-bottom platforms. Learn how to position yourself as an indispensable strategic consultant.",
    whatYouLearn: [
      "Craft irresistible service packages and proposals",
      "Pitch enterprise clients on LinkedIn and via warm outreach",
      "Close $5,000+ retainers using value pricing scripts",
      "Manage client boundaries and prevent scope creep"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Positioning & Packaging",
        duration: "3h 15m",
        lessons: [
          { id: "l1", title: "Finding Your High-Margin Tech Niche", duration: "25m", freePreview: true },
          { id: "l2", title: "The 3-Tier Proposal Template", duration: "30m", freePreview: false }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Client Acquisition & Closing",
        duration: "4h 30m",
        lessons: [
          { id: "l3", title: "Inbound Lead Generation Engines", duration: "35m", freePreview: false },
          { id: "l4", title: "Closing Sales Calls with Zero Pressure", duration: "45m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c6",
    title: "Generative AI Workflow & Automation for Pros",
    shortTitle: "GenAI Workflow Automation",
    category: "ai-tools",
    level: "Intermediate",
    price: 99,
    originalPrice: 169,
    rating: 4.98,
    reviewCount: 389,
    duration: "15h total",
    lessonsCount: 34,
    instructorId: "priya-sharma",
    badge: "AI Signature",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    overview: "Supercharge your daily output by connecting large language models with automated data pipelines, webhooks, and custom assistants.",
    whatYouLearn: [
      "Advanced prompt design: few-shot, chain-of-thought, and JSON outputs",
      "Connect LLMs to APIs using webhook automation platforms",
      "Build custom knowledge retrieval assistants for client documentation",
      "Implement error handling and fallback models"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Prompt Engineering Foundations",
        duration: "3h 50m",
        lessons: [
          { id: "l1", title: "System Prompts & Structured Extraction", duration: "25m", freePreview: true },
          { id: "l2", title: "Handling Edge Cases & Hallucination Defense", duration: "30m", freePreview: false }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Multi-step Automation Chains",
        duration: "5h 20m",
        lessons: [
          { id: "l3", title: "Automating Daily Research & Summaries", duration: "40m", freePreview: false },
          { id: "l4", title: "Creating Webhook Triggers for Customer Data", duration: "45m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c7",
    title: "Tailwind CSS & Modern Responsive Web Mastery",
    shortTitle: "Tailwind CSS Mastery",
    category: "web-dev",
    level: "Beginner",
    price: 49,
    originalPrice: 89,
    rating: 4.8,
    reviewCount: 276,
    duration: "8h total",
    lessonsCount: 22,
    instructorId: "alex-chen",
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    overview: "Master utility-first CSS, custom design tokens, dark mode, responsive mobile layouts, and modern CSS container queries.",
    whatYouLearn: [
      "Fluid typography and consistent 8pt spacing systems",
      "Mobile-first responsive navigation and sheet patterns",
      "Accessible interactive states: hover, focus-visible, and active",
      "Building production-grade UI components with zero CSS bloat"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Utility Architecture",
        duration: "2h 40m",
        lessons: [
          { id: "l1", title: "Mobile Viewports & Touch Target Sizing", duration: "20m", freePreview: true },
          { id: "l2", title: "State Variants: active, focus, disabled", duration: "25m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c8",
    title: "Product Analytics with Amplitude & Mixpanel",
    shortTitle: "Product Analytics",
    category: "data-ai",
    level: "Intermediate",
    price: 75,
    originalPrice: 125,
    rating: 4.75,
    reviewCount: 160,
    duration: "9h total",
    lessonsCount: 24,
    instructorId: "marcus-vance",
    badge: "In Demand",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    overview: "Set up tracking schemas that answer key user retention questions and pinpoint drop-offs in onboarding funnels.",
    whatYouLearn: [
      "Design an enterprise event taxonomy",
      "Build retention matrices and cohort curves",
      "Detect product feature stickiness and aha-moments"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Event Tracking Architecture",
        duration: "3h 10m",
        lessons: [
          { id: "l1", title: "Naming Conventions & Schema Governance", duration: "22m", freePreview: true },
          { id: "l2", title: "Funnel Analysis & Drop-off Root Causes", duration: "34m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c9",
    title: "Mobile-First UX Research & Interaction Design",
    shortTitle: "Mobile-First UX",
    category: "design",
    level: "Intermediate",
    price: 85,
    originalPrice: 139,
    rating: 4.9,
    reviewCount: 240,
    duration: "11h total",
    lessonsCount: 26,
    instructorId: "sarah-jenkins",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    overview: "Learn how to design thumb-friendly mobile navigation, fluid bottom sheets, touch gestures, and micro-interactions.",
    whatYouLearn: [
      "Ergonomic thumb-zone mapping on modern smartphones",
      "Designing seamless bottom sheet sheets and drawer states",
      "Usability testing protocols with 5-second mobile tests"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Mobile Usability Principles",
        duration: "3h 00m",
        lessons: [
          { id: "l1", title: "Thumb Zone Ergonomics & 44px Rules", duration: "18m", freePreview: true },
          { id: "l2", title: "Designing Native-Feel Bottom Sheets", duration: "28m", freePreview: false }
        ]
      }
    ]
  },
  {
    id: "c10",
    title: "Paid Ads Mastery: Meta, TikTok & Google Search",
    shortTitle: "Paid Ads Mastery",
    category: "marketing",
    level: "Intermediate",
    price: 65,
    originalPrice: 110,
    rating: 4.65,
    reviewCount: 198,
    duration: "10h total",
    lessonsCount: 25,
    instructorId: "elena-rostova",
    badge: "Growth",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    overview: "Scale profitable paid media campaigns with disciplined creative testing, audience exclusions, and bid optimization.",
    whatYouLearn: [
      "Structure testing vs scaling ad sets",
      "Script UGC videos that hook viewers in the first 2 seconds",
      "Calculate true ROAS and blended customer acquisition cost"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Paid Traffic Channels",
        duration: "3h 20m",
        lessons: [
          { id: "l1", title: "Creative Fatigue & Ad Iteration Loops", duration: "22m", freePreview: true }
        ]
      }
    ]
  },
  {
    id: "c11",
    title: "Contracting & Client Negotiation for Tech Pros",
    shortTitle: "Contracting & Negotiation",
    category: "freelancing",
    level: "All Levels",
    price: 55,
    originalPrice: 95,
    rating: 4.82,
    reviewCount: 142,
    duration: "7h total",
    lessonsCount: 18,
    instructorId: "david-kim",
    badge: "Career",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    overview: "Protect your intellectual property, guarantee payment terms, and handle difficult client pushback like a veteran business owner.",
    whatYouLearn: [
      "Bulletproof Master Services Agreement (MSA) clauses",
      "Milestone payment structures that eliminate non-payment risk",
      "Negotiating scope adjustments without damaging relationships"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Legal & Financial Guardrails",
        duration: "2h 30m",
        lessons: [
          { id: "l1", title: "Essential Clauses for Software & Design", duration: "25m", freePreview: true }
        ]
      }
    ]
  },
  {
    id: "c12",
    title: "Building Autonomous AI Agents & Webhooks",
    shortTitle: "Autonomous AI Agents",
    category: "ai-tools",
    level: "Advanced",
    price: 119,
    originalPrice: 199,
    rating: 4.94,
    reviewCount: 345,
    duration: "17h total",
    lessonsCount: 40,
    instructorId: "priya-sharma",
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    overview: "Build agents that plan, use external tools, query vector databases, and trigger webhooks to execute real-world workflows.",
    whatYouLearn: [
      "Agentic loop architectures: planning, tool use, reflection",
      "Connecting agents to live webhooks (n8n, Make, Slack, GitHub)",
      "Streaming responses with real-time UI status states",
      "Securing agent endpoints against prompt injections"
    ],
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Agent Architecture",
        duration: "4h 00m",
        lessons: [
          { id: "l1", title: "Tools, Functions & Execution Context", duration: "28m", freePreview: true },
          { id: "l2", title: "Memory & Multi-Turn State Synchronization", duration: "32m", freePreview: false }
        ]
      }
    ]
  }
];

export const getCourseById = (id) => courses.find((c) => c.id === id);
