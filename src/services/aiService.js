/**
 * AI Service for Guidely Consultant
 * Dispatches to external n8n webhook if configured via VITE_N8N_WEBHOOK_URL,
 * or uses a rich, intelligent mock service referencing local catalog data,
 * supporting bilingual English and natural Iraqi Arabic (العربية - العراق).
 */
export async function sendMessage(message, history = [], sessionId = 'default-session') {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL

  // If webhook is provided, POST to live n8n workflow
  if (webhookUrl && webhookUrl.trim() !== '') {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, sessionId, timestamp: new Date().toISOString() })
      })

      if (!response.ok) {
        throw new Error(`n8n webhook responded with status ${response.status}`)
      }

      const data = await response.json()
      return {
        answer: data.answer || 'Here is what I found based on our catalog:',
        sources: Array.isArray(data.sources) ? data.sources : [],
        recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
        followups: Array.isArray(data.followups) ? data.followups : []
      }
    } catch (err) {
      console.warn('n8n webhook failed, falling back to local mock engine:', err)
      if (!navigator.onLine) {
        throw new Error('You appear to be offline. Please check your internet connection.')
      }
      throw new Error(`AI service connection error: ${err.message}`)
    }
  }

  // Realistic mock delay (900ms - 1400ms)
  const delay = Math.floor(Math.random() * 500) + 900
  await new Promise((resolve) => setTimeout(resolve, delay))

  // Check network status
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new Error('Device is offline. Reconnect to chat with Guidely AI.')
  }

  const query = message.toLowerCase()
  const hasArabic = /[\u0600-\u06FF]/.test(message)

  // 1. Web Development & React (رياكت، ويب، كود، فرونت إند)
  if (
    query.includes('react') ||
    query.includes('next') ||
    query.includes('web') ||
    query.includes('frontend') ||
    query.includes('javascript') ||
    query.includes('tailwind') ||
    query.includes('css') ||
    query.includes('code') ||
    query.includes('رياكت') ||
    query.includes('ويب') ||
    query.includes('برمج') ||
    query.includes('كود')
  ) {
    if (hasArabic) {
      return {
        answer:
          "تدلل! حتى تضبط تطوير الويب الحديث، أنصحك تركز على React 19 ويا Next.js App Router للتطوير المتكامل، وتستخدم وياها Tailwind CSS لبناء واجهات سريعة وخفيفة. كورس أليكس تشن الماستر كلاس ويا جلسة تدقيق كود 1-على-1 راح يخليك تبني مشاريع حقيقية جاهزة لسوق العمل وبأعلى أداء.",
        sources: [
          { title: "دليل معمارية React 19 و Next.js", link: "/courses/c1" },
          { title: "ملف أليكس تشن - كبير مهندسي المعمارية", link: "/experts/alex-chen" },
          { title: "جلسة تدقيق وفحص كود الويب المتقدم", link: "/services/s7" }
        ],
        recommendations: [
          { type: "course", id: "c1" },
          { type: "service", id: "s1" },
          { type: "expert", id: "alex-chen" },
          { type: "course", id: "c7" }
        ],
        followups: [
          "شنو المتطلبات الأساسية لكورس React 19؟",
          "شلون تشتغل جلسة تدقيق الكود 1-على-1؟",
          "أتعلم Tailwind CSS لو CSS عادي بالبداية؟"
        ]
      }
    }

    return {
      answer:
        "For modern web engineering, I recommend mastering React 19 and Next.js App Router for full-stack rendering, coupled with Tailwind CSS for scalable design tokens. If you're building a real-world product, pairing Alex Chen's masterclass with a 1-on-1 architecture audit is the fastest way to achieve production readiness and flawless Core Web Vitals.",
      sources: [
        { title: "React 19 & Next.js Architecture Guide", link: "/courses/c1" },
        { title: "Alex Chen - Principal Architect Profile", link: "/experts/alex-chen" },
        { title: "Frontend Performance & CWV Benchmark", link: "/services/s7" }
      ],
      recommendations: [
        { type: "course", id: "c1" },
        { type: "service", id: "s1" },
        { type: "expert", id: "alex-chen" },
        { type: "course", id: "c7" }
      ],
      followups: [
        "What are the prerequisites for the React masterclass?",
        "How does the 1-on-1 architecture audit work?",
        "Should I learn Tailwind CSS before Next.js?"
      ]
    }
  }

  // 2. UI/UX Design & Figma (تصميم، فيجما، واجهات، تجربة مستخدم)
  if (
    query.includes('design') ||
    query.includes('ui') ||
    query.includes('ux') ||
    query.includes('figma') ||
    query.includes('mobile') ||
    query.includes('wireframe') ||
    query.includes('prototype') ||
    query.includes('تصميم') ||
    query.includes('فيجما') ||
    query.includes('واجه')
  ) {
    if (hasArabic) {
      return {
        answer:
          "لتطوير مهاراتك بتصميم المنتجات والواجهات، ركز على بناء Design Systems قائمة على الـ Tokens ومعايير تجربة الاستخدام لشاشات الموبايل. سارة جينكينز تقدم كورس Figma to Code يوضحلك شلون تحول تصاميمك لكود حقيقي بنسبة 1:1، وتكدر تحجز وياها جلسة تدقيق لنظام تصميمك لتفادي أي أخطاء بالتناسق وسهولة الاستخدام.",
        sources: [
          { title: "منهج تحويل تصاميم Figma لكود برمجي", link: "/courses/c4" },
          { title: "قائمة فحص معايير تجربة استخدام الموبايل", link: "/services/s8" },
          { title: "ملف سارة جينكينز - خبيرة تصميم المنتجات", link: "/experts/sarah-jenkins" }
        ],
        recommendations: [
          { type: "course", id: "c4" },
          { type: "service", id: "s2" },
          { type: "expert", id: "sarah-jenkins" },
          { type: "course", id: "c9" }
        ],
        followups: [
          "تگدر سارة تراجع بروتوتايب فيجما قيد الشغل؟",
          "شنو المواضيع المشمولة بكورس تجربة الموبايل؟",
          "شلون أربط الـ Design Tokens ويا Tailwind CSS؟"
        ]
      }
    }

    return {
      answer:
        "To elevate your product design craft, focus on tokenized design systems and mobile-first touch ergonomics. Sarah Jenkins offers an industry-leading Figma to Code curriculum that teaches how to translate components 1:1 into code, along with custom design system reviews to audit your existing component libraries for accessibility and consistency.",
      sources: [
        { title: "Figma to Code Design Systems Syllabus", link: "/courses/c4" },
        { title: "Mobile UX Heuristic Evaluation Checklist", link: "/services/s8" },
        { title: "Sarah Jenkins Design Mentor Profile", link: "/experts/sarah-jenkins" }
      ],
      recommendations: [
        { type: "course", id: "c4" },
        { type: "service", id: "s2" },
        { type: "expert", id: "sarah-jenkins" },
        { type: "course", id: "c9" }
      ],
      followups: [
        "Can Sarah audit an in-progress Figma prototype?",
        "What is covered in the Mobile-First UX course?",
        "How do design tokens map to Tailwind CSS?"
      ]
    }
  }

  // 3. AI, Automation, Webhooks & Agents (ذكاء اصطناعي، أتمتة، وكيل، n8n، بوت)
  if (
    query.includes('ai') ||
    query.includes('agent') ||
    query.includes('prompt') ||
    query.includes('automation') ||
    query.includes('webhook') ||
    query.includes('n8n') ||
    query.includes('bot') ||
    query.includes('llm') ||
    query.includes('ذكاء') ||
    query.includes('أتمت') ||
    query.includes('اتمت') ||
    query.includes('بوت') ||
    query.includes('عميل')
  ) {
    if (hasArabic) {
      return {
        answer:
          "بناء أنظمة ذكاء اصطناعي يعتمد عليها بالسوق اليوم يحتاج تتعدى مرحلة الـ Prompts العادية وتدخل بالأتمتة الذكية عبر n8n والـ Webhooks وربط مخرجات الـ JSON مباشرة بقواعد البيانات وأنظمة CRM. بريا شارما متخصصة بأتمتة الأعمال وبناء الوكلاء الذاتيين وراح تساعدك تربط الذكاء الاصطناعي بنظام عملك مباشرة.",
        sources: [
          { title: "بناء وكلاء الذكاء الاصطناعي والأتمتة بـ n8n", link: "/courses/c12" },
          { title: "باقة إعداد وتخصيص وكلاء الذكاء الاصطناعي", link: "/services/s6" },
          { title: "ملف بريا شارما - خبيرة الذكاء الاصطناعي", link: "/experts/priya-sharma" }
        ],
        recommendations: [
          { type: "course", id: "c6" },
          { type: "service", id: "s6" },
          { type: "expert", id: "priya-sharma" },
          { type: "course", id: "c12" }
        ],
        followups: [
          "شلون أربط Webhooks في n8n ويا الواتساب؟",
          "شنو النماذج اللي تگدر بريا تساعدني بأتمتتها؟",
          "أگدر أسوي وكيل ذكي بدون ما أبرمج خادم معقد؟"
        ]
      }
    }

    return {
      answer:
        "Building reliable AI workflows requires moving past basic prompts into deterministic agentic loops, webhook automation (n8n), and structured JSON outputs. Priya Sharma specializes in enterprise AI tools and hands-on workflow setups that connect models directly to your production APIs and databases.",
      sources: [
        { title: "Building Autonomous AI Agents & Webhooks", link: "/courses/c12" },
        { title: "Custom AI Agent Workflow Setup Package", link: "/services/s6" },
        { title: "Priya Sharma AI Specialist Profile", link: "/experts/priya-sharma" }
      ],
      recommendations: [
        { type: "course", id: "c6" },
        { type: "service", id: "s6" },
        { type: "expert", id: "priya-sharma" },
        { type: "course", id: "c12" }
      ],
      followups: [
        "How do I set up webhooks with n8n?",
        "What models can Priya help automate?",
        "Can I build an autonomous agent without a heavy backend?"
      ]
    }
  }

  // 4. Data Analysis, SQL & Python (بيانات، بايثون، سيكوال، تحليل)
  if (
    query.includes('data') ||
    query.includes('sql') ||
    query.includes('python') ||
    query.includes('analytics') ||
    query.includes('dashboard') ||
    query.includes('pandas') ||
    query.includes('بيانات') ||
    query.includes('بايثون') ||
    query.includes('تحليل')
  ) {
    if (hasArabic) {
      return {
        answer:
          "حتى تتمكن من تحليل بيانات الأعمال بقوة، ادمج أساسيات SQL القوية (Window functions, CTEs) ويا برمجيات بايثون بمكتبة Pandas. ماركوس فانس يقدم كورسات عملية واستشارات مباشرة لبناء Dashboards تنفيذية تحول البيانات الخام لقرارات تجارية ذكية.",
        sources: [
          { title: "بايثون و SQL لتحليل البيانات الإنتاجية", link: "/courses/c2" },
          { title: "خدمة بناء مسارات البيانات ولوحات التحكم", link: "/services/s3" },
          { title: "ملف ماركوس فانس - رئيس مهندسي البيانات", link: "/experts/marcus-vance" }
        ],
        recommendations: [
          { type: "course", id: "c2" },
          { type: "service", id: "s3" },
          { type: "expert", id: "marcus-vance" },
          { type: "course", id: "c8" }
        ],
        followups: [
          "أبدأ بتعلم SQL لو بايثون إذا چنت مبتدئ؟",
          "هل يوفر ماركوس مخططات قواعد بيانات نموذجية؟",
          "شنو أفضل أدوات لوحات التحكم بالبيانات؟"
        ]
      }
    }

    return {
      answer:
        "To become dangerous with business data, combine solid SQL fundamentals (window functions, CTEs) with automated Python scripts in Pandas. Marcus Vance provides practical courses and hands-on pipeline consultations to transform raw database dumps into executive decision dashboards.",
      sources: [
        { title: "Production Python & SQL for Data Analysis", link: "/courses/c2" },
        { title: "Custom Data Pipeline & Dashboard Service", link: "/services/s3" },
        { title: "Marcus Vance Data Lead Profile", link: "/experts/marcus-vance" }
      ],
      recommendations: [
        { type: "course", id: "c2" },
        { type: "service", id: "s3" },
        { type: "expert", id: "marcus-vance" },
        { type: "course", id: "c8" }
      ],
      followups: [
        "Is SQL or Python better for complete beginners?",
        "Does Marcus provide sample schema diagrams?",
        "What analytics tools are used in Product Analytics?"
      ]
    }
  }

  // 5. Freelancing, Pricing, Career & Clients (فريلانس، شغل، عملاء، أسعار، فلوس، دخل)
  if (
    query.includes('freelance') ||
    query.includes('client') ||
    query.includes('career') ||
    query.includes('money') ||
    query.includes('price') ||
    query.includes('pricing') ||
    query.includes('rate') ||
    query.includes('فريلانس') ||
    query.includes('سعر') ||
    query.includes('أسعار') ||
    query.includes('فلوس') ||
    query.includes('عملاء') ||
    query.includes('شغل')
  ) {
    if (hasArabic) {
      return {
        answer:
          "أحسن خطوة تسويها بالفريلانس حتى تضاعف أسعارك هي أنك تتوقف عن البيع بالساعة، وتنتقل للتسعير القائم على القيمة المضافة للمشروع (Value-based pricing). ديفيد كيم خبير عالمي بهذا المجال وراح يعلمك شلون تسوي عروض تقديمية مقنعة وتفاوض على عقود شهرية ثابتة (Retainers) تضاعف دخلك الشهري واستقرارك المالي.",
        sources: [
          { title: "دليل مضاعفة أسعار الفريلانس وإغلاق العقود", link: "/courses/c5" },
          { title: "جلسة مراجعة عروض الأسعار والتفاوض", link: "/services/s5" },
          { title: "ملف ديفيد كيم - مستشار النمو والعمل الحر", link: "/experts/david-kim" }
        ],
        recommendations: [
          { type: "course", id: "c5" },
          { type: "service", id: "s5" },
          { type: "expert", id: "david-kim" },
          { type: "course", id: "c11" }
        ],
        followups: [
          "شلون أنتقل من الحساب بالساعة للعقود الثابتة؟",
          "شنو أفضل طريقة أسعر بيها المشاريع لعملاء الخليج والعالم؟",
          "شلون أتعامل ويا العميل اللي يطلب تخفيض كبير؟"
        ]
      }
    }

    return {
      answer:
        "The fastest lever to double your income as an independent technologist is abandoning hourly billing in favor of value-based pricing and retainer agreements. David Kim's playbooks have helped hundreds of freelancers transition from commodity labor to high-ticket strategic partners.",
      sources: [
        { title: "Freelance Rate Doubling Masterclass", link: "/courses/c5" },
        { title: "Proposal Teardown & Retainer Strategy Session", link: "/services/s5" },
        { title: "David Kim Freelance Business Coach Profile", link: "/experts/david-kim" }
      ],
      recommendations: [
        { type: "course", id: "c5" },
        { type: "service", id: "s5" },
        { type: "expert", id: "david-kim" },
        { type: "course", id: "c11" }
      ],
      followups: [
        "How do I structure a 3-tier value proposal?",
        "What questions reveal client willingness to pay?",
        "How do I close recurring monthly retainer clients?"
      ]
    }
  }

  // 6. Default Fallback
  if (hasArabic) {
    return {
      answer:
        "يا هلا بيك! أني مستشارك الذكي في منصة كايْدلي. بناءً على دليلنا المعتمد، أنصحك تحدد مسار واضح تبدأ بيه: تطوير الويب الحديث (React/Next.js)، هندسة الذكاء الاصطناعي والأتمتة، تصميم الواجهات، أو مهارات الفريلانس وزيادة الدخل. تگدر تختار كورس متخصص أو تحجز جلسة مباشرة ويا خبير حتى يوجهك خطوة بخطوة.",
      sources: [
        { title: "دليل كورسات وتخصصات كايْدلي الشامل", link: "/explore?tab=courses" },
        { title: "جلسات واستشارات الخبراء المباشرة 1-على-1", link: "/explore?tab=services" }
      ],
      recommendations: [
        { type: "course", id: "c1" },
        { type: "service", id: "s1" },
        { type: "expert", id: "alex-chen" }
      ],
      followups: [
        "أريد خطة مخصصة لتعلم البرمجة وتطوير الويب",
        "شلون أزيد دخلي من شغل الفريلانس؟",
        "شنو أفضل الكورسات المطلوبة بسوق العمل هسة؟"
      ]
    }
  }

  return {
    answer:
      "Welcome to Guidely! Based on our verified tech catalog, the most effective path forward is pairing a rigorous course curriculum with direct 1-on-1 expert audits. Whether your objective is modern web engineering, AI automation, or doubling freelance consulting revenue, I can synthesize a custom sequence tailored to your experience.",
    sources: [
      { title: "Full Guidely Skills & Services Catalog", link: "/explore?tab=courses" },
      { title: "1-on-1 Expert Strategy Audits", link: "/explore?tab=services" }
    ],
    recommendations: [
      { type: "course", id: "c1" },
      { type: "service", id: "s1" },
      { type: "expert", id: "alex-chen" }
    ],
    followups: [
      "I want to become a Senior Full-Stack React Engineer",
      "How do I build automated AI agent workflows?",
      "Help me double my freelance consulting rates"
    ]
  }
}
