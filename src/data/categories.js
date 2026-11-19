export const categories = [
  {
    id: "web-dev",
    name: "Web Development",
    shortName: "Web Dev",
    icon: "Code2",
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 text-blue-700",
    description: "Modern JavaScript, React, frontend systems, and full-stack performance.",
    itemCount: 4
  },
  {
    id: "data-ai",
    name: "Data & Machine Learning",
    shortName: "Data & ML",
    icon: "Database",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 text-emerald-700",
    description: "Python, SQL, predictive analytics, and enterprise data modeling.",
    itemCount: 3
  },
  {
    id: "design",
    name: "UI/UX & Product Design",
    shortName: "UI/UX",
    icon: "Palette",
    color: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50 text-purple-700",
    description: "Figma design systems, mobile ergonomics, and heuristic reviews.",
    itemCount: 4
  },
  {
    id: "marketing",
    name: "Digital Marketing & Growth",
    shortName: "Marketing",
    icon: "TrendingUp",
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 text-amber-700",
    description: "Paid acquisition, SEO playbooks, conversion funnels, and retention.",
    itemCount: 3
  },
  {
    id: "freelancing",
    name: "Freelancing & Tech Careers",
    shortName: "Freelance",
    icon: "Briefcase",
    color: "from-rose-500 to-red-500",
    bgLight: "bg-rose-50 text-rose-700",
    description: "Client acquisition, value-based pricing, proposals, and contracts.",
    itemCount: 3
  },
  {
    id: "ai-tools",
    name: "AI Agents & Automation",
    shortName: "AI Tools",
    icon: "Sparkles",
    color: "from-indigo-500 to-violet-500",
    bgLight: "bg-indigo-50 text-indigo-700",
    description: "Prompt engineering, autonomous agents, webhooks, and n8n workflows.",
    itemCount: 4
  }
];

export const getCategoryById = (id) => categories.find((c) => c.id === id);
