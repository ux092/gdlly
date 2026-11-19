import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PlayCircle
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { Tabs } from '../components/Tabs'
import { Accordion } from '../components/Accordion'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { getCourseById } from '../data/courses'
import { getExpertById } from '../data/experts'
import { useApp } from '../context/AppContext'

export function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isEnrolled, setPendingPrompt, showToast, isRtl, t } = useApp()
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'syllabus' | 'reviews'

  const course = getCourseById(id)
  if (!course) {
    return (
      <div className="min-h-dvh bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          {isRtl ? 'الكورس غير موجود' : 'Course Not Found'}
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          {isRtl ? 'لم نتمكن من العثور على الكورس المطلوب.' : 'The requested course could not be located.'}
        </p>
        <Button variant="primary" size="md" className="mt-4" onClick={() => navigate('/explore')}>
          {isRtl ? 'الرجوع للدليل' : 'Back to Catalog'}
        </Button>
      </div>
    )
  }

  const instructor = getExpertById(course.instructorId)
  const enrolled = isEnrolled(course.id)

  const handleAskAIAboutCourse = () => {
    setPendingPrompt(
      isRtl
        ? `أريد نبذة مختصرة عن كورس "${course.title}". شنو الفوائد المهنية اللي يقدمها وشلون يفيدني بتطوير مهاراتي؟`
        : `Can you give me a personalized overview of the course "${course.title}"? What career benefits does it deliver, and how does it compare to other paths?`
    )
    navigate('/consultant')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `${course.title} on Guidely!`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      showToast(isRtl ? 'تم نسخ رابط الكورس!' : 'Course link copied to clipboard!', 'info')
    }
  }

  // Format syllabus for Accordion component
  const syllabusAccordionItems = (course.syllabus || []).map((module) => ({
    id: module.id,
    title: module.title,
    subtitle: `${module.duration} • ${module.lessons.length} ${t('common.lessons', 'lessons')}`,
    content: () => (
      <div className="space-y-2 pt-1 text-start">
        {module.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0 pe-2">
              <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-800 truncate">{lesson.title}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {lesson.freePreview && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {isRtl ? 'معاينة' : 'Preview'}
                </span>
              )}
              <span className="text-[11px] text-slate-400">{lesson.duration}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }))

  const detailTabs = [
    { id: 'overview', label: isRtl ? 'نظرة عامة' : 'Overview' },
    { id: 'syllabus', label: isRtl ? `المنهج (${course.lessonsCount})` : `Syllabus (${course.lessonsCount})` },
    { id: 'reviews', label: isRtl ? `التقييمات (${course.reviewCount})` : `Reviews (${course.reviewCount})` }
  ]

  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col pb-28">
      {/* App Bar */}
      <AppBar
        showBack
        title={course.shortTitle || course.title}
        actions={
          <button
            onClick={handleShare}
            aria-label={isRtl ? 'مشاركة الكورس' : 'Share course'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 active:bg-slate-100 transition-colors cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
          </button>
        }
      />

      <main className="pt-14 text-start">
        {/* Hero Media */}
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5">
              <Badge variant="indigo" size="sm">
                {course.level}
              </Badge>
              {course.badge && (
                <Badge variant="warning" size="sm">
                  {course.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs font-semibold bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {course.duration}
            </span>
          </div>
        </div>

        {/* Course Info Header */}
        <div className="px-4 pt-4 pb-2 bg-white border-b border-slate-100">
          <h1 className="text-lg font-extrabold text-slate-900 leading-snug">
            {course.title}
          </h1>

          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center text-amber-600 font-bold gap-1">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              {course.rating}
              <span className="text-slate-400 font-normal">
                ({course.reviewCount} {t('common.reviews', 'ratings')})
              </span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {course.lessonsCount} {t('common.lessons', 'lessons')}
            </span>
          </div>

          {/* Ask AI Banner inside course */}
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-50 border border-indigo-200/70 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {isRtl ? 'عندك استفسار عن هذا الكورس؟' : 'Have questions about this course?'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {isRtl ? 'اسأل المستشار الذكي شلون يناسب مجالك' : 'Ask the AI Consultant how it fits your career'}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ai"
              onClick={handleAskAIAboutCourse}
              className="shrink-0"
            >
              {isRtl ? 'اسأل AI' : 'Ask AI'}
            </Button>
          </div>

          {/* Instructor mini card */}
          {instructor && (
            <Link
              to={`/experts/${instructor.id}`}
              className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between active:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{instructor.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{instructor.role}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                {isRtl ? 'الملف' : 'Profile'}{' '}
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
              </span>
            </Link>
          )}

          {/* Tab Navigation */}
          <div className="mt-4">
            <Tabs tabs={detailTabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Description */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isRtl ? 'نظرة عامة عن الكورس' : 'Course Overview'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.overview}
                </p>
              </div>

              {/* What you'll learn */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  {t('learning.outcomes', "What You'll Learn")}
                </h3>
                <div className="space-y-2.5">
                  {course.whatYouLearn?.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements & Certificate */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2 text-xs text-slate-600">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isRtl ? 'المميزات المشمولة' : 'Includes'}
                </h3>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {isRtl ? 'وصول كامل مدى الحياة من الموبايل والويب' : 'Full lifetime access on mobile and web'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {isRtl ? 'مساعد ذكاء اصطناعي مرافق لشرح وتدقيق الكود' : 'Embedded AI Tutor for instant code help'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {isRtl ? 'شهادة إتمام معتمدة' : 'Certificate of completion'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>
                  {course.syllabus?.length || 0} {isRtl ? 'وحدات دراسية' : 'Modules'}
                </span>
                <span>{course.duration}</span>
              </div>
              <Accordion items={syllabusAccordionItems} allowMultiple />
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {/* Rating summary */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-slate-900">{course.rating}</span>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {isRtl ? 'تقييم الكورس' : 'Course Rating'}
                  </span>
                </div>
                <div className="text-end">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {isRtl ? '98% تقييم إيجابي' : '98% Positive Feedback'}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1.5">
                    {isRtl ? `بناءً على ${course.reviewCount} طالب موثق` : `Based on ${course.reviewCount} verified students`}
                  </span>
                </div>
              </div>

              {/* Sample Reviews */}
              {[
                {
                  author: isRtl ? 'حيدر الكرخي' : 'Marcus Cole',
                  date: isRtl ? 'قبل يومين' : '2 days ago',
                  stars: 5,
                  comment: isRtl
                    ? 'كورس كلش عملي ومباشر. المدرب يدخل فوراً بالتطبيق العملي بدون حشو زايد.'
                    : 'Extremely practical. The instructor goes straight to real-world code patterns and explains the mental models clearly.'
                },
                {
                  author: isRtl ? 'مريم البغدادي' : 'Alina Vance',
                  date: isRtl ? 'قبل أسبوع' : '1 week ago',
                  stars: 5,
                  comment: isRtl
                    ? 'من أفضل الدورات اللي أخذتها. المساعد الذكي سهل عليّ فهم النقاط الصعبة بسرعة.'
                    : 'The best structured material I have taken on this topic. The AI tutor made debugging lessons much faster.'
                }
              ].map((rev, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs text-start">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe">
        <div className="max-w-[430px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="text-start">
            <span className="text-[11px] text-slate-400 font-medium block -mb-0.5">
              {isRtl ? 'السعر الإجمالي' : 'Total Price'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">${course.price}</span>
              {course.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 max-w-[200px]">
            {enrolled ? (
              <Button
                variant="primary"
                size="md"
                fullWidth
                iconRight={PlayCircle}
                onClick={() => navigate(`/learn/${course.id}`)}
              >
                {isRtl ? 'دخول للكورس' : 'Go to Course'}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                fullWidth
                iconRight={() => (
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                )}
                onClick={() => navigate(`/enroll/course/${course.id}`)}
              >
                {t('learning.enrollNow', 'Enroll Now')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
