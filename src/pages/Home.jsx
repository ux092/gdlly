import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Play, BookOpen, Star, Bookmark } from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { CourseCard } from '../components/CourseCard'
import { ServiceCard } from '../components/ServiceCard'
import { categories } from '../data/categories'
import { courses } from '../data/courses'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'

export function Home() {
  const navigate = useNavigate()
  const { user, setPendingPrompt, enrollments, savedPlan, isRtl, language, t } = useApp()
  const [promptInput, setPromptInput] = useState('')

  const activeChips =
    translations[language]?.home?.chips || [
      'Master React 19 & Next.js',
      'Double my freelance rates',
      'Set up an AI agent with n8n',
      'Build a mobile design system'
    ]

  const handleAskAI = (queryText) => {
    const text = queryText || promptInput.trim()
    if (!text) return
    setPendingPrompt(text)
    navigate('/consultant')
  }

  // Active enrolled course for "Continue Learning"
  const activeEnrollment = enrollments[0]
  const activeCourse = activeEnrollment ? courses.find((c) => c.id === activeEnrollment.courseId) : null

  const firstName = user?.name ? user.name.split(' ')[0] : t('home.guestName', 'Learner')

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
        {/* User Greeting */}
        <section className="pt-2">
          <h2 className="text-2xl font-semibold text-[#F5F5F5] tracking-tight">
            {t('home.greeting', 'Hello, {name} 👋', { name: firstName })}
          </h2>
          <p className="text-xs text-[#F5F5F5]/65 mt-0.5">
            {t('home.subtitle', 'What goal or skill would you like to conquer today?')}
          </p>
        </section>

        {/* AI Input Card - Luxury Noir Restrained Editorial Hero */}
        <section className="bg-[#3D3B30] border border-[#F5F5F5]/12 border-s-2 border-s-[#BFA15A] rounded-2xl p-4 text-start">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full border border-[#BFA15A] bg-[#27261F] text-[#BFA15A] flex items-center justify-center font-bold text-[10px]">
              AI
            </div>
            <span className="text-xs font-semibold text-[#F5F5F5] tracking-tight">
              {t('home.askAiTitle', 'Guidely Intelligence')}
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
                'Tell us your goal. We will build your plan and match verified mentors...'
              )}
              rows={2}
              className="w-full text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 bg-[#27261F] border border-[#F5F5F5]/10 rounded-xl p-3 pe-12 focus:outline-none focus:border-[#BFA15A] resize-none text-start"
            />
            <button
              type="submit"
              disabled={!promptInput.trim()}
              aria-label={t('home.askAiBtn', 'Submit prompt to AI')}
              className="absolute end-2.5 bottom-3 w-8 h-8 rounded-lg bg-[#BFA15A] text-[#0C0C0C] flex items-center justify-center active:scale-95 disabled:opacity-30 transition-all cursor-pointer font-bold"
            >
              <ArrowRight className={`w-4 h-4 stroke-[2] transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* Quick Starter Prompt Chips */}
          <div className="mt-3">
            <span className="text-[10px] font-medium text-[#F5F5F5]/50 block mb-1.5 uppercase tracking-wider">
              {t('home.chipsTitle', 'Starting paths:')}
            </span>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {activeChips.map((chip, idx) => (
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

        {/* Categories Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-sm font-semibold text-[#F5F5F5]">
              {t('home.categoriesTitle', 'Explore Categories')}
            </h3>
            <Link to="/explore" className="text-xs font-medium text-[#BFA15A] hover:underline">
              {t('common.viewAll', 'See all')}
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/explore?cat=${cat.id}`)}
                className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 active:bg-[#4E4B3E] transition-colors cursor-pointer text-start"
              >
                <span className="text-[11px] font-medium text-[#BFA15A] bg-[#27261F] px-2 py-0.5 rounded-md border border-[#F5F5F5]/10">
                  {cat.shortName}
                </span>
                <span className="text-xs font-medium text-[#F5F5F5]">
                  {cat.itemCount} {isRtl ? 'عناصر' : 'items'}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Continue Learning Active Card */}
        {activeEnrollment && activeCourse && (
          <section className="bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 text-start">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#BFA15A] uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{t('home.continueLearning', 'Continue Learning')}</span>
              </div>
              <span className="text-xs font-semibold text-[#BFA15A]">
                {activeEnrollment.progress}%
              </span>
            </div>

            <h4 className="text-sm font-semibold text-[#F5F5F5] line-clamp-1">
              {activeCourse.title}
            </h4>
            <p className="text-xs text-[#F5F5F5]/65 mt-0.5 line-clamp-1">
              {isRtl ? 'الدرس القادم: ' : 'Next: '} {activeEnrollment.currentLesson?.title || (isRtl ? 'الوحدة التالية' : 'Next module')}
            </p>

            {/* Progress bar in Soft Gold */}
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
                <span>{t('home.resumeLesson', 'Resume Lesson')}</span>
              </Link>
            </div>
          </section>
        )}

        {/* Featured Courses Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">
                {t('home.topCoursesTitle', 'Featured Courses')}
              </h3>
              <p className="text-[11px] text-[#F5F5F5]/65">
                {t('home.topCoursesSubtitle', 'Industry-tested curriculums')}
              </p>
            </div>
            <Link to="/explore?tab=courses" className="text-xs font-medium text-[#BFA15A] hover:underline">
              {t('common.viewAll', 'View all')}
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 snap-x">
            {courses.slice(0, 5).map((course) => (
              <div key={course.id} className="snap-start shrink-0">
                <CourseCard course={course} variant="carousel" />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Expert Services Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">
                {t('home.servicesTitle', 'Expert 1-on-1 Services')}
              </h3>
              <p className="text-[11px] text-[#F5F5F5]/65">
                {t('home.servicesSubtitle', 'Code reviews, audits & consulting')}
              </p>
            </div>
            <Link to="/explore?tab=services" className="text-xs font-medium text-[#BFA15A] hover:underline">
              {t('common.viewAll', 'View all')}
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 snap-x">
            {services.slice(0, 5).map((service) => (
              <div key={service.id} className="snap-start shrink-0">
                <ServiceCard service={service} variant="carousel" />
              </div>
            ))}
          </div>
        </section>

        {/* How It Works - 3 Step Flow */}
        <section className="bg-[#27261F] text-[#F5F5F5] border border-[#F5F5F5]/12 rounded-2xl p-5 space-y-4 text-start">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#BFA15A]">
              {isRtl ? 'ميزة منصة كايْدلي' : 'The Guidely Advantage'}
            </span>
            <h3 className="text-base font-semibold text-[#F5F5F5] mt-0.5">
              {isRtl ? 'شلون يساعدك الذكاء الاصطناعي والخبراء؟' : 'How AI & Experts Guide You'}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-[#3D3B30] p-3 rounded-xl border border-[#F5F5F5]/10">
              <div className="w-8 h-8 rounded-lg bg-[#27261F] border border-[#BFA15A]/40 flex items-center justify-center font-semibold text-xs text-[#BFA15A] shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#F5F5F5]">
                  {isRtl ? 'اطرح هدفك للمستشار الذكي' : 'Ask AI your career goal'}
                </h4>
                <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5 leading-snug">
                  {isRtl
                    ? 'المستشار يحلل أهدافك وخبرتك ويرسملك خارطة طريق دقيقة وخطوات عملية.'
                    : 'The AI Consultant analyzes your exact goals and maps out a step-by-step roadmap.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#3D3B30] p-3 rounded-xl border border-[#F5F5F5]/10">
              <div className="w-8 h-8 rounded-lg bg-[#27261F] border border-[#BFA15A]/40 flex items-center justify-center font-semibold text-xs text-[#BFA15A] shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#F5F5F5]">
                  {isRtl ? 'تعلّم بوجود مساعد AI مرافق للدروس' : 'Learn with interactive AI tutor'}
                </h4>
                <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5 leading-snug">
                  {isRtl
                    ? 'شاهد ورش احترافية واطرح أي استفسار مباشرة للمساعد الذكي أثناء الدرس.'
                    : 'Watch top-tier lessons and ask instant questions in the embedded AI assistant.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#3D3B30] p-3 rounded-xl border border-[#F5F5F5]/10">
              <div className="w-8 h-8 rounded-lg bg-[#27261F] border border-[#BFA15A]/40 flex items-center justify-center font-semibold text-xs text-[#BFA15A] shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#F5F5F5]">
                  {isRtl ? 'ثبّت مهاراتك بجلسات 1-على-1 ويا خبراء' : 'Validate with 1-on-1 expert sessions'}
                </h4>
                <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5 leading-snug">
                  {isRtl
                    ? 'احجز تدقيق كود حقيقي، مراجعة بورتفوليو، واستشارات تسعير من مهندسين ممارسين.'
                    : 'Book audits, code reviews, and pricing coaching from verified industry practitioners.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="mb-2.5">
            <h3 className="text-sm font-semibold text-[#F5F5F5]">
              {t('home.testimonialsTitle', 'Member Testimonials')}
            </h3>
            <p className="text-[11px] text-[#F5F5F5]/65">
              {t('home.testimonialsSubtitle', 'Real outcomes from our community')}
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 snap-x">
            {testimonials.map((tItem) => (
              <div
                key={tItem.id}
                className="snap-start shrink-0 w-[260px] bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 flex flex-col justify-between text-start"
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
      </main>
    </div>
  )
}
