import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Play,
  BookOpen,
  Star,
  Bookmark,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  Briefcase
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { ServiceCard } from '../components/ServiceCard'
import { CourseCard } from '../components/CourseCard'
import { services } from '../data/services'
import { courses } from '../data/courses'
import { testimonials } from '../data/testimonials'
import { useApp } from '../context/AppContext'

export function Home() {
  const navigate = useNavigate()
  const { user, enrollments, savedPlan, setPendingPrompt, isRtl, t } = useApp()
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all')
  const [promptInput, setPromptInput] = useState('')

  const firstName = user?.name ? user.name.split(' ')[0] : (isRtl ? 'علي' : 'Partner')

  const handleAskAI = (queryText) => {
    const text = (queryText || promptInput).trim()
    if (!text) return
    setPendingPrompt(text)
    navigate('/consultant')
  }

  const businessStarterChips = t('home.chips') || [
    isRtl ? 'فحص شامل لمعمارية الكود والرياكت' : 'Audit React 19 architecture & code health',
    isRtl ? 'أتمتة مهام الشركة بعميل ذكاء اصطناعي بـ n8n' : 'Deploy custom n8n AI agent workflows',
    isRtl ? 'تحسين سرعة الموقع ومؤشرات Core Web Vitals' : 'Speed up mobile Core Web Vitals to 90+',
    isRtl ? 'تدقيق قمع المبيعات والإعلانات الرقمية' : 'Scale digital marketing & reduce CAC'
  ]

  // Filter business services based on active filter pill
  const filteredServices =
    selectedServiceCategory === 'all'
      ? services
      : services.filter((s) => s.category === selectedServiceCategory)

  // Active enrolled course for "Team Training & Continuous Learning"
  const activeEnrollment = enrollments[0]
  const activeCourse = activeEnrollment
    ? courses.find((c) => c.id === activeEnrollment.courseId)
    : null

  const serviceFilterPills = [
    { id: 'all', label: t('home.allServicesFilter', isRtl ? 'كل الخدمات' : 'All Services') },
    { id: 'web-dev', label: t('home.filterTech', isRtl ? 'الكود والمعمارية' : 'Code & Architecture') },
    { id: 'ai-tools', label: t('home.filterAI', isRtl ? 'الذكاء الاصطناعي والأتمتة' : 'AI & Automations') },
    { id: 'data-ai', label: t('home.filterData', isRtl ? 'البيانات والداشبورد' : 'Data & Dashboards') },
    { id: 'marketing', label: t('home.filterGrowth', isRtl ? 'النمو والتسويق' : 'Growth & Ads') },
    { id: 'design', label: isRtl ? 'أنظمة التصميم' : 'Design Systems' }
  ]

  return (
    <div className="min-h-dvh bg-[#0C0C0C] text-[#F5F5F5] flex flex-col pb-safe-tab">
      <AppBar
        actions={
          <Link
            to="/plan"
            aria-label={t('plan.title', 'View saved plan')}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#F5F5F5] active:bg-[#3D3B30] transition-colors"
          >
            <Bookmark className="w-5 h-5 stroke-[1.5]" />
            {savedPlan.length > 0 && (
              <span className="absolute top-1.5 end-1.5 w-4 h-4 rounded-full bg-[#BFA15A] text-[#0C0C0C] text-[9px] font-bold flex items-center justify-center border border-[#0C0C0C]">
                {savedPlan.length}
              </span>
            )}
          </Link>
        }
      />

      {/* Main Content Body */}
      <main className="pt-16 px-4 space-y-6 text-start">
        {/* Executive Business Greeting & Platform Positioning */}
        <section className="pt-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3D3B30] border border-[#F5F5F5]/12 text-[10px] font-semibold text-[#BFA15A] uppercase tracking-wider mb-2">
            <Briefcase className="w-3 h-3 text-[#BFA15A] stroke-[1.5]" />
            <span>{t('home.businessBadge', isRtl ? 'منصة خدمات واستشارات الأعمال' : 'ENTERPRISE & BUSINESS ADVISORY')}</span>
          </div>

          <h2 className="text-2xl font-semibold text-[#F5F5F5] tracking-tight">
            {t('home.greeting', 'Hello, {name} 👋', { name: firstName })}
          </h2>
          <p className="text-xs text-[#F5F5F5]/65 mt-1 leading-relaxed">
            {t(
              'home.subtitle',
              isRtl
                ? 'فحص كود، أتمتة بالذكاء الاصطناعي، واستشارات استراتيجية لرفع كفاءة ونمو شركتك.'
                : 'Production code audits, AI agent automation, and strategic advisory for modern companies.'
            )}
          </p>
        </section>

        {/* AI Business Consultant Input Card - Luxury Noir Restrained Editorial */}
        <section className="bg-[#3D3B30] border border-[#F5F5F5]/12 border-s-2 border-s-[#BFA15A] rounded-2xl p-4 text-start">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full border border-[#BFA15A] bg-[#27261F] text-[#BFA15A] flex items-center justify-center font-bold text-[10px]">
              AI
            </div>
            <span className="text-xs font-semibold text-[#F5F5F5] tracking-tight">
              {t('home.askAiTitle', isRtl ? 'اسأل مستشار الأعمال والشركات الذكي' : 'Ask Guidely Business Intelligence')}
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAskAI()
            }}
            className="relative"
          >
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder={t(
                'home.askAiPlaceholder',
                isRtl
                  ? 'اكتب متطلبات شركتك، المشكلة التقنية، أو هدف العمل... ونقترحلك الحل والخبير المناسب'
                  : 'Describe your business challenge, technical requirement, or goal... and we will match the right solution & expert.'
              )}
              rows={2}
              className="w-full text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 bg-[#27261F] border border-[#F5F5F5]/10 rounded-xl p-3 pe-12 focus:outline-none focus:border-[#BFA15A] resize-none text-start"
            />
            <button
              type="submit"
              disabled={!promptInput.trim()}
              aria-label={t('home.askAiBtn', isRtl ? 'إرسال الاستفسار' : 'Submit prompt to AI')}
              className="absolute end-2.5 bottom-3 w-8 h-8 rounded-lg bg-[#BFA15A] text-[#0C0C0C] flex items-center justify-center active:scale-95 disabled:opacity-30 transition-all cursor-pointer font-bold"
            >
              <ArrowRight className={`w-4 h-4 stroke-[2] transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* Quick Business Starter Chips */}
          <div className="mt-3">
            <span className="text-[10px] font-medium text-[#F5F5F5]/50 block mb-1.5 uppercase tracking-wider">
              {t('home.chipsTitle', isRtl ? 'استشارات سريعة للشركات:' : 'Quick corporate advisory paths:')}
            </span>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {Array.isArray(businessStarterChips) && businessStarterChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAskAI(chip)}
                  className="shrink-0 text-[11px] font-normal text-[#F5F5F5]/85 bg-[#27261F] border border-[#F5F5F5]/10 rounded-xl px-3 py-1.5 active:bg-[#4E4B3E] hover:border-[#BFA15A]/60 transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Business Service Domain Filter Chips */}
        <section>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            {serviceFilterPills.map((pill) => {
              const isSelected = selectedServiceCategory === pill.id
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedServiceCategory(pill.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-start ${
                    isSelected
                      ? 'bg-[#BFA15A] text-[#0C0C0C] border border-[#BFA15A]'
                      : 'bg-[#3D3B30] text-[#F5F5F5] border border-[#F5F5F5]/12 active:bg-[#4E4B3E]'
                  }`}
                >
                  {pill.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* PRIMARY HERO SECTION: Verified Business Services */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-semibold text-[#F5F5F5] tracking-tight">
                {t('home.servicesHeroTitle', isRtl ? 'خدمات الأعمال والاستشارات المعتمدة' : 'Business Advisory & Solutions')}
              </h3>
              <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5">
                {t(
                  'home.servicesHeroSubtitle',
                  isRtl
                    ? 'مخرجات فورية واستشارات مباشرة ويا كبار المهندسين وخبراء النمو'
                    : 'High-impact deliverables from verified principal architects & growth leads'
                )}
              </p>
            </div>
            <Link
              to="/explore?tab=services"
              className="text-xs font-semibold text-[#BFA15A] hover:underline shrink-0 ms-2"
            >
              {t('common.viewAll', isRtl ? 'عرض الكل' : 'View all')}
            </Link>
          </div>

          {/* Business Services Grid (Cards) */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredServices.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} variant="list" />
            ))}
          </div>

          {filteredServices.length > 4 && (
            <div className="mt-3 text-center">
              <Link
                to="/explore?tab=services"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 text-xs font-medium text-[#F5F5F5] active:bg-[#4E4B3E] transition-colors"
              >
                <span>{t('home.viewCatalog', isRtl ? 'تصفح كل الخدمات الاستشارية' : 'Browse All Services')}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-[#BFA15A] ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          )}
        </section>

        {/* Why Leading Businesses Trust Guidely (Enterprise Value Pillars) */}
        <section className="bg-[#27261F] border border-[#F5F5F5]/12 rounded-2xl p-4 space-y-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#BFA15A]">
              {isRtl ? 'ضمانات منصة كايْدلي للشركات' : 'Enterprise Standard'}
            </span>
            <h3 className="text-sm font-semibold text-[#F5F5F5] mt-0.5">
              {t('home.whyTitle', isRtl ? 'ليش تعتمد الشركات وأصحاب المشاريع على كايْدلي؟' : 'Why Businesses Choose Guidely')}
            </h3>
            <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5">
              {t('home.whySubtitle', isRtl ? 'سرعة بالتنفيذ، سرية تامة، ومخرجات تقنية تسوي فارق حقيقي' : 'Enterprise-grade speed, strict NDA discretion, and measurable outcomes')}
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Pillar 1: NDA Protected Audits */}
            <div className="flex items-start gap-3 bg-[#3D3B30] p-3 rounded-xl border border-[#F5F5F5]/10">
              <div className="w-8 h-8 rounded-lg bg-[#27261F] border border-[#BFA15A]/40 flex items-center justify-center text-[#BFA15A] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-[#F5F5F5]">
                  {t('home.pillar1Title', isRtl ? 'تدقيق وفحص محمي باتفاقيات سرية (NDA)' : 'NDA-Backed Architecture Audits')}
                </h4>
                <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5 leading-snug">
                  {t('home.pillar1Desc', isRtl ? 'فحص شامل ومحمي للكود والأنظمة والتصاميم مع تقارير تسليم عملية وتعديلات جاهزة.' : 'Complete repository, security, and design system evaluations with actionable PRs.')}
                </p>
              </div>
            </div>

            {/* Pillar 2: Senior Advisors 1-on-1 */}
            <div className="flex items-start gap-3 bg-[#3D3B30] p-3 rounded-xl border border-[#F5F5F5]/10">
              <div className="w-8 h-8 rounded-lg bg-[#27261F] border border-[#BFA15A]/40 flex items-center justify-center text-[#BFA15A] shrink-0 mt-0.5">
                <Users className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-[#F5F5F5]">
                  {t('home.pillar2Title', isRtl ? 'استشاريون وخبراء كبار 1-على-1' : 'Senior 1-on-1 Advisors')}
                </h4>
                <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5 leading-snug">
                  {t('home.pillar2Desc', isRtl ? 'تواصل مباشر مع كبار المهندسين والمستشارين بدون تعقيد وتكاليف وكالات الاستشارات التقليدية.' : 'Direct collaboration with principal tech and business leaders, no agency overhead.')}
                </p>
              </div>
            </div>

            {/* Pillar 3: Rapid Delivery */}
            <div className="flex items-start gap-3 bg-[#3D3B30] p-3 rounded-xl border border-[#F5F5F5]/10">
              <div className="w-8 h-8 rounded-lg bg-[#27261F] border border-[#BFA15A]/40 flex items-center justify-center text-[#BFA15A] shrink-0 mt-0.5">
                <Zap className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-[#F5F5F5]">
                  {t('home.pillar3Title', isRtl ? 'سرعة تنفيذ وتسليم مضمون (2-5 أيام)' : 'Rapid 2–5 Day Delivery')}
                </h4>
                <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5 leading-snug">
                  {t('home.pillar3Desc', isRtl ? 'تسليم مخرجات خلال 2 إلى 5 أيام مع مكالمات عمل مباشرة ومتابعة دقيقة للتنفيذ.' : 'Turnkey blueprints, video strategy debriefs, and async support guarantees.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Corporate Solution Callout (Points to AI Consultant) */}
        <section className="bg-[#3D3B30] border border-[#BFA15A]/40 rounded-2xl p-4 text-start relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#BFA15A]" />
            <span className="text-[11px] font-semibold text-[#BFA15A] uppercase tracking-wider">
              {isRtl ? 'باقة مخصصة لمشروعك' : 'Custom Corporate Scope'}
            </span>
          </div>

          <h3 className="text-base font-semibold text-[#F5F5F5] tracking-tight">
            {t('home.customAdvisoryTitle', isRtl ? 'تحتاج باقة مخصصة لشركتك أو تدقيق فريق؟' : 'Need a Custom Enterprise Solution?')}
          </h3>
          <p className="text-xs text-[#F5F5F5]/65 mt-1 leading-relaxed">
            {t(
              'home.customAdvisoryDesc',
              isRtl
                ? 'المستشار الذكي يحلل متطلبات مشروعك ويرشحلك الخبير والباقة الأنسب مباشرة.'
                : 'Let our AI Consultant analyze your infrastructure and assemble a bespoke advisory package.'
            )}
          </p>

          <div className="mt-3.5">
            <button
              type="button"
              onClick={() => navigate('/consultant')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#BFA15A] text-[#0C0C0C] font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <span>{t('home.customAdvisoryBtn', isRtl ? 'تحدث ويا المستشار الذكي' : 'Consult With AI')}</span>
              <ArrowRight className={`w-3.5 h-3.5 stroke-[2] ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </section>

        {/* Business Testimonials & Measured ROI */}
        <section>
          <div className="mb-2.5">
            <h3 className="text-sm font-semibold text-[#F5F5F5]">
              {t('home.testimonialsTitle', isRtl ? 'نتائج حقيقية حققتها الشركات' : 'Verified Business Outcomes')}
            </h3>
            <p className="text-[11px] text-[#F5F5F5]/65">
              {t(
                'home.testimonialsSubtitle',
                isRtl
                  ? 'عائد استثماري واضح وتطوير ملموس للأداء والعمليات التشغيلية'
                  : 'Measurable ROI delivered to scaling startups and established enterprises'
              )}
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 snap-x">
            {testimonials.map((tItem) => (
              <div
                key={tItem.id}
                className="snap-start shrink-0 w-[270px] bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 flex flex-col justify-between text-start"
              >
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(tItem.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#BFA15A] stroke-[#BFA15A]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#F5F5F5]/85 italic line-clamp-4 leading-relaxed">
                    "{tItem.content}"
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#F5F5F5]/10 flex items-center gap-2.5">
                  <img
                    src={tItem.avatar}
                    alt={tItem.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#F5F5F5]/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="text-xs font-semibold text-[#F5F5F5] truncate">{tItem.name}</h5>
                    <p className="text-[10px] text-[#F5F5F5]/50 truncate">{tItem.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Training & Masterclasses (Secondary, professional positioning) */}
        <section className="pt-1">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">
                {t('home.topCoursesTitle', isRtl ? 'برامج تدريب وتطوير الفرق' : 'Team Training Programs')}
              </h3>
              <p className="text-[11px] text-[#F5F5F5]/65">
                {t('home.topCoursesSubtitle', isRtl ? 'مناهج عملية لتطوير مهارات مهندسي ومصممي شركتك' : 'Upskill your engineering and design teams')}
              </p>
            </div>
            <Link to="/explore?tab=courses" className="text-xs font-medium text-[#BFA15A] hover:underline">
              {t('common.viewAll', isRtl ? 'عرض الكل' : 'View all')}
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 snap-x">
            {courses.slice(0, 4).map((course) => (
              <div key={course.id} className="snap-start shrink-0">
                <CourseCard course={course} variant="carousel" />
              </div>
            ))}
          </div>
        </section>

        {/* Continue Learning Card (if team member has an ongoing session) */}
        {activeEnrollment && activeCourse && (
          <section className="bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 text-start">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#BFA15A] uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{t('home.continueLearning', isRtl ? 'تدريب الفريق' : 'Active Team Training')}</span>
              </div>
              <span className="text-xs font-semibold text-[#BFA15A]">
                {activeEnrollment.progress}%
              </span>
            </div>

            <h4 className="text-sm font-semibold text-[#F5F5F5] line-clamp-1">
              {activeCourse.title}
            </h4>
            <p className="text-xs text-[#F5F5F5]/65 mt-0.5 line-clamp-1">
              {isRtl ? 'الجلسة القادمة: ' : 'Next Session: '} {activeEnrollment.currentLesson?.title || (isRtl ? 'الوحدة التالية' : 'Next module')}
            </p>

            <div className="w-full bg-[#27261F] h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#BFA15A] h-full rounded-full transition-all duration-300"
                style={{ width: `${activeEnrollment.progress}%` }}
              />
            </div>

            <div className="mt-3 pt-2.5 flex items-center justify-end">
              <Link
                to={`/learn/${activeCourse.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0C0C0C] bg-[#BFA15A] px-3.5 py-2 rounded-xl active:opacity-90 transition-opacity"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isRtl ? 'rotate-180' : ''}`} />
                <span>{t('home.resumeLesson', isRtl ? 'كمّل التدريب' : 'Resume Session')}</span>
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
