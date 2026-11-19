/**
 * Guidely Localization Engine
 * Supports English ('en') and Iraqi Arabic ('ar-IQ' / اللهجة العراقية)
 */

export const translations = {
  en: {
    // Navigation & Tabs
    nav: {
      home: 'Home',
      explore: 'Explore',
      askAi: 'Ask AI',
      learning: 'Learning',
      profile: 'Profile',
      back: 'Back',
      close: 'Close',
      langToggle: '🇮🇶 عراقي'
    },

    // Common / Global
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      viewAll: 'View All',
      seeMore: 'See More',
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Try Again',
      search: 'Search',
      filter: 'Filter',
      apply: 'Apply',
      reset: 'Reset',
      required: 'Required',
      optional: 'Optional',
      usd: '$',
      perHour: '/hr',
      deliveryDays: 'days delivery',
      lessons: 'lessons',
      hours: 'hours',
      minutes: 'min',
      reviews: 'reviews',
      studentCount: 'students',
      savedToPlan: 'Saved to Plan',
      addToPlan: 'Save to Plan',
      removeFromPlan: 'Remove from Plan',
      alreadySaved: 'Already in your plan'
    },

    // Home Page - B2B Business & Consulting Services
    home: {
      greeting: 'Hello, {name} 👋',
      guestName: 'Partner',
      businessBadge: 'ENTERPRISE & BUSINESS ADVISORY',
      subtitle: 'Production code audits, AI agent automation, and strategic advisory for modern companies.',
      askAiTitle: 'Ask Guidely Business Intelligence',
      askAiPlaceholder: 'Describe your business challenge, technical requirement, or goal... and we will match the right solution & expert.',
      askAiBtn: 'Ask AI',
      chipsTitle: 'Quick corporate advisory paths:',
      chips: [
        'Audit React 19 architecture & code health',
        'Deploy custom n8n AI agent workflows',
        'Speed up mobile Core Web Vitals to 90+',
        'Scale digital marketing & reduce CAC'
      ],
      servicesHeroTitle: 'Business Advisory & Solutions',
      servicesHeroSubtitle: 'High-impact deliverables from verified principal architects & growth leads',
      allServicesFilter: 'All Services',
      filterTech: 'Code & Architecture',
      filterAI: 'AI & Automations',
      filterData: 'Data & Dashboards',
      filterGrowth: 'Growth & Ads',
      whyTitle: 'Why Businesses Choose Guidely',
      whySubtitle: 'Enterprise-grade speed, strict NDA discretion, and measurable outcomes',
      pillar1Title: 'NDA-Backed Architecture Audits',
      pillar1Desc: 'Complete repository, security, and design system evaluations with actionable PRs.',
      pillar2Title: 'Senior 1-on-1 Advisors',
      pillar2Desc: 'Direct collaboration with principal tech and business leaders, no agency overhead.',
      pillar3Title: 'Rapid 2–5 Day Delivery',
      pillar3Desc: 'Turnkey blueprints, video strategy debriefs, and async support guarantees.',
      customAdvisoryTitle: 'Need a Custom Enterprise Solution?',
      customAdvisoryDesc: 'Let our AI Consultant analyze your infrastructure and assemble a bespoke advisory package.',
      customAdvisoryBtn: 'Consult With AI',
      continueLearning: 'Active Team Training',
      lessonProgress: 'Lesson {current} of {total}',
      resumeLesson: 'Resume Session',
      categoriesTitle: 'Service Domains',
      categoriesSubtitle: 'Specialized capabilities for engineering, product, and growth teams',
      topCoursesTitle: 'Team Training Programs',
      topCoursesSubtitle: 'Upskill your engineering and design teams with production curriculums',
      servicesTitle: 'Business Advisory & Solutions',
      servicesSubtitle: 'Production code audits, AI agent automation, and strategic advisory',
      testimonialsTitle: 'Verified Business Outcomes',
      testimonialsSubtitle: 'Measurable ROI delivered to scaling startups and established enterprises',
      viewCatalog: 'Browse All Services'
    },

    // Explore Page
    explore: {
      title: 'Explore & Search',
      searchPlaceholder: 'Search courses, services, skills, or mentors...',
      all: 'All',
      courses: 'Courses',
      services: '1-on-1 Services',
      experts: 'Mentors',
      category: 'Category',
      filterBy: 'Filter By',
      noResults: 'No matches found',
      noResultsDesc: 'Try adjusting your search terms or clearing selected category filters.'
    },

    // AI Consultant Page
    consultant: {
      title: 'Guidely AI Consultant',
      subtitle: 'Powered by Guidely Intelligence',
      statusOnline: 'Online • Real-time career & skill guidance',
      starterTitle: 'Tell me your target outcome:',
      starters: [
        'How do I master React 19 & Next.js?',
        'I want to double my freelance consulting rates',
        'How can I automate customer workflows with AI agents?',
        'Audit my mobile app design system'
      ],
      inputPlaceholder: 'Ask anything about courses, career roadmaps, or tech skills...',
      send: 'Send',
      newChat: 'New',
      emptyChat: 'Start a conversation with your personal AI mentor.',
      emptySubtitle: "Describe your tech, design, or business career goal. I'll synthesize curriculum and match you with verified experts.",
      searching: 'Searching knowledge base & catalog...',
      requestFailed: 'Consultant request failed',
      retryMessage: 'Retry Message',
      helpfulPrompt: 'Was this advice helpful?',
      sourcesTitle: 'Based on verified catalog knowledge:',
      sourcesCited: 'Knowledge Sources Cited',
      sourcesCitedSubtitle: 'Catalog references cited by the AI Consultant',
      noSourcesCited: 'No sources cited in this session yet.',
      view: 'View',
      recommendedForGoal: 'Recommended for your target goal:',
      expertHandoffTitle: 'Not sure? Talk to a verified expert',
      expertHandoffDesc: 'Book a live 1-on-1 strategy session with attached chat context.',
      bookExpertBtn: 'Book Expert',
      offlineError: 'Device is offline. Please check your internet connection.',
      scrollBottom: 'Scroll to bottom',
      sessionIdLabel: 'Session ID',
      newChatStarted: 'Started new session',
      copiedSessionId: 'Session ID copied to clipboard'
    },

    // Courses & Learning
    learning: {
      title: 'My Learning & Courses',
      enrolledTab: 'Enrolled Courses',
      completedTab: 'Completed',
      noEnrollments: 'No active enrollments yet',
      noEnrollmentsDesc: 'Browse the catalog and start learning today.',
      exploreCoursesBtn: 'Explore Courses',
      progress: 'Progress',
      continueBtn: 'Continue Lesson',
      certificate: 'Certificate',
      syllabus: 'Syllabus & Modules',
      prerequisites: 'Prerequisites',
      outcomes: 'What you will build',
      instructor: 'Instructor',
      aboutInstructor: 'About the Instructor',
      enrollNow: 'Enroll Now',
      enrolledBadge: 'Enrolled',
      markComplete: 'Mark as Completed',
      nextLesson: 'Next Lesson',
      previousLesson: 'Previous Lesson',
      aiTutorTitle: 'Ask AI Tutor about this lesson',
      aiTutorPlaceholder: 'Ask a clarifying question about this specific lesson...'
    },

    // Services & Experts
    services: {
      bookService: 'Book Consultation',
      selectTier: 'Select Package Tier',
      basicTier: 'Basic Tier',
      standardTier: 'Standard Tier',
      premiumTier: 'Premium Tier',
      whatIncluded: "What's Included",
      deliverables: 'Deliverables',
      turnaround: 'Delivery turnaround',
      liveSession: 'Includes live call',
      expertProfile: 'Expert Profile',
      hourlyRate: 'Hourly Rate',
      verifiedExpert: 'Verified Industry Expert'
    },

    // Checkout & Booking
    enroll: {
      title: 'Confirm Booking & Enrollment',
      courseEnrollTitle: 'Course Enrollment',
      serviceBookTitle: 'Book Expert Service',
      summary: 'Order Summary',
      totalDue: 'Total Due',
      free: 'Free',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      notesLabel: 'Special requirements or goals',
      notesPlaceholder: 'Tell the expert what repository, project, or problem you want to focus on...',
      paymentMethod: 'Payment Method',
      paymentCard: 'Credit / Debit Card',
      paymentZainCash: 'ZainCash / Local Payment',
      confirmBtn: 'Confirm & Complete',
      secureCheckout: 'Encrypted & Secure 256-bit checkout',
      guarantee: '100% Satisfaction or full credit refund guarantee'
    },

    // Saved Plan
    plan: {
      title: 'Saved Learning Plan',
      empty: 'Your learning plan is empty',
      emptyDesc: 'Save courses and expert reviews to build your structured career path.',
      browseBtn: 'Find Courses & Services',
      itemsCount: '{count} items in your plan',
      totalCost: 'Estimated Investment',
      startLearningBtn: 'Begin First Step'
    },

    // Requests
    requests: {
      title: 'My Expert Requests',
      empty: 'No booking requests yet',
      emptyDesc: 'When you book a strategy session or codebase audit, track its status here.',
      statusPending: 'Pending Review',
      statusInProgress: 'In Progress',
      statusCompleted: 'Completed',
      scheduledDate: 'Scheduled For'
    },

    // Profile & Settings
    profile: {
      title: 'Profile & Settings',
      memberBadge: 'Guidely Pro Member',
      savedPlanShortcut: 'Saved AI Learning Plan',
      requestsShortcut: 'My Expert Requests',
      retakeOnboarding: 'Retake AI Onboarding',
      accountDetails: 'Account Details',
      fullName: 'Full Name',
      email: 'Email Address',
      preferredLanguage: 'Preferred Language',
      notifications: 'Notification Preferences',
      emailAlerts: 'Email Announcements',
      emailAlertsDesc: 'New courses and platform updates',
      expertReplies: 'Expert Replies',
      expertRepliesDesc: 'Real-time booking and audit notifications',
      courseMilestones: 'Course Milestones',
      courseMilestonesDesc: 'Progress reminders and certificate alerts',
      aiRecs: 'AI Recommendations',
      aiRecsDesc: 'Weekly suggested courses for your goals',
      saveProfileBtn: 'Save Profile & Preferences',
      logoutBtn: 'Log Out of Guidely'
    },

    // Onboarding
    onboarding: {
      step1Title: 'What is your primary goal?',
      step2Title: 'What is your current level?',
      step3Title: 'Time commitment & budget?',
      nextBtn: 'Next Step',
      backBtn: 'Back',
      finishBtn: 'Generate AI Learning Path',
      skipBtn: 'Skip to Consultant'
    }
  },

  // ==========================================
  // Iraqi Arabic (العربية - العراق / اللهجة العراقية)
  // ==========================================
  'ar-IQ': {
    // Navigation & Tabs
    nav: {
      home: 'الرئيسية',
      explore: 'استكشف',
      askAi: 'المستشار الذكي',
      learning: 'دراستي',
      profile: 'حسابي',
      back: 'رجوع',
      close: 'إغلاق',
      langToggle: '🇺🇸 English'
    },

    // Common / Global
    common: {
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      viewAll: 'عرض الكل',
      seeMore: 'المزيد',
      loading: 'دا يحمّل...',
      error: 'صار خطأ، جرب مرة ثانية',
      retry: 'إعادة المحاولة',
      search: 'بحث',
      filter: 'تصفية',
      apply: 'تطبيق',
      reset: 'إعادة ضبط',
      required: 'مطلوب',
      optional: 'اختياري',
      usd: '$',
      perHour: '/ساعة',
      deliveryDays: 'أيام تسليم',
      lessons: 'دروس',
      hours: 'ساعات',
      minutes: 'دقيقة',
      reviews: 'تقييمات',
      studentCount: 'طلاب',
      savedToPlan: 'محفوظ بالخطة',
      addToPlan: 'أضف للخطة',
      removeFromPlan: 'احذف من الخطة',
      alreadySaved: 'موجود مسبقاً بخطتك'
    },

    // Home Page - B2B Business & Consulting Services
    home: {
      greeting: 'هلا بيك، {name} 👋',
      guestName: 'شريكنا العزيز',
      businessBadge: 'منصة استشارات وخدمات الأعمال والشركات',
      subtitle: 'فحص كود، أتمتة بالذكاء الاصطناعي، واستشارات استراتيجية لرفع كفاءة ونمو شركتك.',
      askAiTitle: 'اسأل مستشار الأعمال والشركات الذكي',
      askAiPlaceholder: 'اكتب متطلبات شركتك، المشكلة التقنية، أو هدف العمل... ونقترحلك الحل والخبير المناسب',
      askAiBtn: 'اسأل المستشار',
      chipsTitle: 'استشارات سريعة للشركات:',
      chips: [
        'فحص شامل لمعمارية الكود والرياكت',
        'أتمتة مهام الشركة بعميل ذكاء اصطناعي بـ n8n',
        'تحسين سرعة الموقع ومؤشرات Core Web Vitals',
        'تدقيق قمع المبيعات والإعلانات الرقمية'
      ],
      servicesHeroTitle: 'خدمات الأعمال والاستشارات المعتمدة',
      servicesHeroSubtitle: 'مخرجات فورية واستشارات مباشرة ويا كبار المهندسين وخبراء النمو',
      allServicesFilter: 'كل الخدمات',
      filterTech: 'الكود والمعمارية',
      filterAI: 'الذكاء الاصطناعي والأتمتة',
      filterData: 'البيانات والداشبورد',
      filterGrowth: 'النمو والتسويق',
      whyTitle: 'ليش تعتمد الشركات وأصحاب المشاريع على كايْدلي؟',
      whySubtitle: 'سرعة بالتنفيذ، سرية تامة، ومخرجات تقنية تسوي فارق حقيقي بأرقامك',
      pillar1Title: 'تدقيق وفحص محمي باتفاقيات سرية',
      pillar1Desc: 'فحص شامل ومحمي للكود والأنظمة والتصاميم مع تقارير تسليم عملية وتعديلات جاهزة.',
      pillar2Title: 'استشاريون وخبراء كبار 1-على-1',
      pillar2Desc: 'تواصل مباشر مع كبار المهندسين والمستشارين بدون تعقيد وتكاليف وكالات الاستشارات التقليدية.',
      pillar3Title: 'سرعة تنفيذ وتسليم مضمون',
      pillar3Desc: 'تسليم مخرجات خلال 2 إلى 5 أيام مع مكالمات عمل مباشرة ومتابعة دقيقة للتنفيذ.',
      customAdvisoryTitle: 'تحتاج باقة مخصصة لشركتك أو فريقك؟',
      customAdvisoryDesc: 'المستشار الذكي يحلل متطلبات مشروعك ويرشحلك الخبير والباقة الأنسب مباشرة.',
      customAdvisoryBtn: 'تحدث ويا المستشار الذكي',
      continueLearning: 'تدريب فريق العمل',
      lessonProgress: 'درس {current} من {total}',
      resumeLesson: 'كمّل التدريب',
      categoriesTitle: 'مجالات خدمات الأعمال',
      categoriesSubtitle: 'خدمات تخصصية دقيقة للفرق التقنية، التصميم، والنمو',
      topCoursesTitle: 'برامج تدريب وتطوير الفرق',
      topCoursesSubtitle: 'مناهج عملية لتطوير مهارات مهندسي ومصممي شركتك بأحدث المعايير',
      servicesTitle: 'خدمات الأعمال والاستشارات المعتمدة',
      servicesSubtitle: 'جلسات تدقيق معماري، أتمتة مهام ذكية، وتطوير استراتيجيات الشركات',
      testimonialsTitle: 'نتائج حقيقية حققتها الشركات',
      testimonialsSubtitle: 'عائد استثماري واضح وتطوير ملموس للأداء والعمليات التشغيلية',
      viewCatalog: 'تصفح كل الخدمات الاستشارية'
    },

    // Explore Page
    explore: {
      title: 'استكشف وابحث',
      searchPlaceholder: 'ابحث عن كورس، خدمة، مهارة، أو مدرب...',
      all: 'الكل',
      courses: 'الكورسات',
      services: 'استشارات الخبراء',
      experts: 'المدربون والخبراء',
      category: 'القسم',
      filterBy: 'تصفية حسب',
      noResults: 'ما لكَينا نتائج مطابقة',
      noResultsDesc: 'جرب تبحث بكلمات ثانية أو الغي بعض فلاتر الأقسام.'
    },

    // AI Consultant Page
    consultant: {
      title: 'مستشار كايْدلي الذكي',
      subtitle: 'مدعوم بذكاء كايْدلي الاصطناعي',
      statusOnline: 'متصل • إرشاد مهني وتقني فوري',
      starterTitle: 'شنو هدفك اللي تريد تحققه؟',
      starters: [
        'شلون أضبط React 19 و Next.js من الصفر؟',
        'أريد أضاعف أسعاري بشغل الفريلانس',
        'شلون أأتتم شغلي وشغل العملاء بوكلاء AI و n8n؟',
        'راجعلي نظام تصميم وتجربة تطبيق موبايل'
      ],
      inputPlaceholder: 'اسأل عن أي كورس، مسار مهني، أو مهارة تقنية ببالك...',
      send: 'إرسال',
      newChat: 'جديد',
      emptyChat: 'ابدأ محادثة ويا مستشارك الذكي حتى يرتبلك خطة مضبوطة.',
      emptySubtitle: 'احجيلي عن هدفك بالبرمجة أو التصميم أو الشغل الحر، وراح أرتبلك خطة كاملة وأرشحلك مدربين معتمدين.',
      searching: 'جاري البحث بقاعدة المعرفة والدليل...',
      requestFailed: 'تعذر الاتصال بالمستشار الذكي',
      retryMessage: 'إعادة المحاولة',
      helpfulPrompt: 'هل كانت هذي النصيحة مفيدة؟',
      sourcesTitle: 'مبني على بيانات دليل الكورسات المعتمد:',
      sourcesCited: 'مصادر المعرفة المعتمدة',
      sourcesCitedSubtitle: 'مراجع الدليل اللي استند عليها المستشار الذكي',
      noSourcesCited: 'ماكو مصادر مذكورة بهذي الجلسة بعد.',
      view: 'عرض',
      recommendedForGoal: 'مقترح خصيصاً لهدفك:',
      expertHandoffTitle: 'متردد؟ احجز جلسة ويا خبير معتمد',
      expertHandoffDesc: 'احجز جلسة استراتيجية 1-على-1 مباشرة ويا خبير مع إرفاق سياق المحادثة.',
      bookExpertBtn: 'احجز ويا خبير',
      offlineError: 'يبدو ماكو اتصال بالإنترنت. تأكد من شبكتك وجرب مرة ثانية.',
      scrollBottom: 'انزل لآخر المحادثة',
      sessionIdLabel: 'معرّف الجلسة',
      newChatStarted: 'بدأت جلسة جديدة بنجاح',
      copiedSessionId: 'تم نسخ معرّف الجلسة إلى الحافظة'
    },

    // Courses & Learning
    learning: {
      title: 'دراستي والكورسات',
      enrolledTab: 'الكورسات الحالية',
      completedTab: 'المكتملة',
      noEnrollments: 'بعدك ما مسجل بأي كورس',
      noEnrollmentsDesc: 'تصفح الدليل وابدأ رحلة التعلم هسة.',
      exploreCoursesBtn: 'تصفح الكورسات',
      progress: 'التقدّم',
      continueBtn: 'كمّل الدرس',
      certificate: 'الشهادة',
      syllabus: 'المنهج والوحدات',
      prerequisites: 'المتطلبات السابقة',
      outcomes: 'شنو راح تبني بهذا الكورس',
      instructor: 'المدرب',
      aboutInstructor: 'عن المدرب',
      enrollNow: 'سجل هسة',
      enrolledBadge: 'أنت مسجل',
      markComplete: 'تم إكمال الدرس',
      nextLesson: 'الدرس التالي',
      previousLesson: 'الدرس السابق',
      aiTutorTitle: 'اسأل المساعد الذكي عن هذا الدرس',
      aiTutorPlaceholder: 'اسأل أي نقطة مو واضحة عندك بهذا الدرس...'
    },

    // Services & Experts
    services: {
      bookService: 'احجز الاستشارة',
      selectTier: 'اختر باقة الخدمة',
      basicTier: 'الباقة الأساسية',
      standardTier: 'الباقة المتقدمة',
      premiumTier: 'الباقة الشاملة',
      whatIncluded: 'شنو تشمل الباقة؟',
      deliverables: 'المخرجات والتسليمات',
      turnaround: 'مدة التسليم',
      liveSession: 'تشمل مكالمة فيديو مباشرة',
      expertProfile: 'ملف الخبير',
      hourlyRate: 'سعر الساعة',
      verifiedExpert: 'خبير معتمد وموثق'
    },

    // Checkout & Booking
    enroll: {
      title: 'تأكيد الحجز والتسجيل',
      courseEnrollTitle: 'التسجيل في الكورس',
      serviceBookTitle: 'حجز جلسة خبير',
      summary: 'ملخص الطلب',
      totalDue: 'المبلغ الإجمالي',
      free: 'مجاني',
      fullName: 'الاسم الكامل',
      emailAddress: 'البريد الإلكتروني',
      notesLabel: 'ملاحظات أو تفاصيل تحب توضحها',
      notesPlaceholder: 'اكتب للخبير عن مشروعك، المشكلة اللي تواجهها، أو هدفك من الجلسة...',
      paymentMethod: 'طريقة الدفع',
      paymentCard: 'بطاقة مصرفية (فيزا / ماستر كارد)',
      paymentZainCash: 'زين كاش (ZainCash) أو محفظة محلية',
      confirmBtn: 'تأكيد وإتمام الطلب',
      secureCheckout: 'دفع آمن ومشفّر بأعلى معايير الحماية',
      guarantee: 'ضمان كامل لاسترجاع الرصيد في حال عدم الرضا'
    },

    // Saved Plan
    plan: {
      title: 'خطتي التعليمية الذكية',
      empty: 'خطتك التعليمية فارغة حالياً',
      emptyDesc: 'احفظ الكورسات واستشارات الخبراء حتى تبني مسار مهني منظم خطوة بخطوة.',
      browseBtn: 'تصفح الكورسات والخدمات',
      itemsCount: '{count} عناصر بخطتك',
      totalCost: 'الاستثمار التقديري',
      startLearningBtn: 'ابدأ أول خطوة'
    },

    // Requests
    requests: {
      title: 'طلباتي وحجوزاتي',
      empty: 'ماكو أي طلبات حجز حالياً',
      emptyDesc: 'من تحجز جلسة استشارة أو تدقيق كود، تگدر تتابع حالتها مباشرة هنا.',
      statusPending: 'قيد المراجعة',
      statusInProgress: 'قيد التنفيذ',
      statusCompleted: 'مكتمل',
      scheduledDate: 'الموعد المحدد'
    },

    // Profile & Settings
    profile: {
      title: 'الملف الشخصي والإعدادات',
      memberBadge: 'عضو كايْدلي برو المميز',
      savedPlanShortcut: 'خطتي التعليمية المحفوظة',
      requestsShortcut: 'حجوزاتي وطلبات الخبراء',
      retakeOnboarding: 'إعادة تحديد المسار بالذكاء الاصطناعي',
      accountDetails: 'بيانات الحساب',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      preferredLanguage: 'اللغة المفضلة',
      notifications: 'إعدادات الإشعارات',
      emailAlerts: 'تنبيهات البريد',
      emailAlertsDesc: 'تحديثات الكورسات والعروض والمنصة',
      expertReplies: 'ردود وتنبيهات الخبراء',
      expertRepliesDesc: 'إشعارات فورية عن مواعيد الجلسات وتدقيق الكود',
      courseMilestones: 'إنجازات الكورسات',
      courseMilestonesDesc: 'تذكير بالتقدم والشهادات',
      aiRecs: 'مقترحات الذكاء الاصطناعي',
      aiRecsDesc: 'اقتراحات أسبوعية تناسب أهدافك المهنية',
      saveProfileBtn: 'حفظ التعديلات والإعدادات',
      logoutBtn: 'تسجيل الخروج من كايْدلي'
    },

    // Onboarding
    onboarding: {
      step1Title: 'شنو هدفك الأساسي اللي تريد توصله؟',
      step2Title: 'شنو مستواك وخبرتك الحالية؟',
      step3Title: 'الوقت المتاح وميزانيتك المقترحة؟',
      nextBtn: 'الخطوة التالية',
      backBtn: 'رجوع',
      finishBtn: 'توليد خطة التعلم الذكية',
      skipBtn: 'تخطي للمستشار مباشرة'
    }
  }
}

/**
 * Helper to fetch translation string by dot notation path
 * Supports fallback and simple variable interpolation like {name} or {count}
 */
export function getTranslation(lang, path, fallback = '', params = {}) {
  const dictionary = translations[lang] || translations.en
  const keys = path.split('.')
  let result = dictionary

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      // Fallback to English dictionary if missing in target lang
      let fallbackResult = translations.en
      for (const fKey of keys) {
        if (fallbackResult && typeof fallbackResult === 'object' && fKey in fallbackResult) {
          fallbackResult = fallbackResult[fKey]
        } else {
          fallbackResult = null
          break
        }
      }
      result = fallbackResult !== null ? fallbackResult : fallback || path
      break
    }
  }

  if (Array.isArray(result)) {
    return result
  }

  if (typeof result !== 'string') {
    return fallback || path
  }

  // Replace {paramName} with value
  if (params && Object.keys(params).length > 0) {
    return result.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`))
  }

  return result
}
