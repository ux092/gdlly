import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Star,
  CheckCircle,
  MapPin,
  Share2,
  Calendar,
  Sparkles,
  Briefcase
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { CourseCard } from '../components/CourseCard'
import { ServiceCard } from '../components/ServiceCard'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { getExpertById } from '../data/experts'
import { courses } from '../data/courses'
import { services } from '../data/services'
import { useApp } from '../context/AppContext'

export function ExpertProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setPendingPrompt, showToast, isRtl, t } = useApp()

  const expert = getExpertById(id)
  if (!expert) {
    return (
      <div className="min-h-dvh bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          {isRtl ? 'ملف الخبير غير موجود' : 'Expert Not Found'}
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          {isRtl ? 'لم نتمكن من العثور على ملف هذا الخبير.' : 'Could not find this expert profile.'}
        </p>
        <Button variant="primary" size="md" className="mt-4" onClick={() => navigate('/explore')}>
          {isRtl ? 'الرجوع للدليل' : 'Back to Catalog'}
        </Button>
      </div>
    )
  }

  // Get courses and services authored by this expert
  const expertCourses = courses.filter((c) => expert.courses?.includes(c.id) || c.instructorId === expert.id)
  const expertServices = services.filter((s) => expert.services?.includes(s.id) || s.expertId === expert.id)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${expert.name} - ${expert.role}`,
        text: `Consult with ${expert.name} on Guidely!`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      showToast(isRtl ? 'تم نسخ رابط ملف الخبير!' : 'Expert profile link copied!', 'info')
    }
  }

  const handleAskAIAboutExpert = () => {
    setPendingPrompt(
      isRtl
        ? `شنو أبرز نقاط القوة عند ${expert.name}، وشلون تفيدني خدماته الاستشارية بتحقيق أهدافي المهنية؟`
        : `What are ${expert.name}'s key strengths and how can their consulting services help me reach my career milestones?`
    )
    navigate('/consultant')
  }

  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col pb-28">
      <AppBar
        showBack
        title={expert.name}
        subtitle={expert.role}
        actions={
          <button
            onClick={handleShare}
            aria-label={isRtl ? 'مشاركة الملف' : 'Share expert profile'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 active:bg-slate-100 transition-colors cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
          </button>
        }
      />

      <main className="pt-16 px-4 space-y-5 text-start">
        {/* Profile Card Header */}
        <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs text-center flex flex-col items-center">
          <div className="relative mb-3">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-50 shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-xs">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-lg font-extrabold text-slate-900 leading-tight">{expert.name}</h1>
          <p className="text-xs font-semibold text-indigo-600 mt-0.5">{expert.role}</p>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{expert.location || (isRtl ? 'العراق / عن بُعد' : 'Global / Remote')}</span>
          </p>

          {/* Metrics bar */}
          <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
            <div>
              <span className="text-base font-extrabold text-slate-900 block flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                {expert.rating}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5">
                {t('common.reviews', 'Rating')}
              </span>
            </div>

            <div>
              <span className="text-base font-extrabold text-slate-900 block">
                {expert.studentCount || '2,400+'}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5">
                {t('common.studentCount', 'Students')}
              </span>
            </div>

            <div>
              <span className="text-base font-extrabold text-indigo-700 block">
                ${expert.hourlyRate}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5">
                {t('common.perHour', '/hour')}
              </span>
            </div>
          </div>
        </section>

        {/* Bio & Credentials */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {isRtl ? 'عن الخبير' : 'About the Mentor'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">{expert.bio}</p>

          {/* Badges/Tags */}
          {expert.specialties && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
              {expert.specialties.map((spec, i) => (
                <Badge key={i} variant="indigo" size="sm">
                  {spec}
                </Badge>
              ))}
            </div>
          )}
        </section>

        {/* Ask AI Consultant About Expert */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-50 border border-indigo-200/70 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {isRtl ? 'استشر AI عن هذا الخبير' : 'Consult AI on this expert'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {isRtl ? 'شلون تفيدك خبرته بتحقيق أهدافك' : 'Discover how their skillset fits your path'}
              </p>
            </div>
          </div>
          <Button size="sm" variant="ai" onClick={handleAskAIAboutExpert} className="shrink-0">
            {isRtl ? 'اسأل AI' : 'Ask AI'}
          </Button>
        </div>

        {/* Expert's 1-on-1 Services */}
        {expertServices.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isRtl ? 'جلسات وخدمات استشارية' : '1-on-1 Services & Audits'}
              </h3>
            </div>
            <div className="space-y-3">
              {expertServices.map((service) => (
                <ServiceCard key={service.id} service={service} variant="list" />
              ))}
            </div>
          </section>
        )}

        {/* Expert's Courses */}
        {expertCourses.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              {isRtl ? 'الكورسات والورش التعليمية' : 'Masterclass Courses'}
            </h3>
            <div className="space-y-3">
              {expertCourses.map((course) => (
                <CourseCard key={course.id} course={course} variant="list" />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe">
        <div className="max-w-[430px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="text-start">
            <span className="text-[11px] text-slate-400 font-medium block -mb-0.5">
              {t('services.hourlyRate', 'Hourly Rate')}
            </span>
            <span className="text-xl font-extrabold text-slate-900">${expert.hourlyRate}/hr</span>
          </div>

          <div className="flex-1 max-w-[200px]">
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={Calendar}
              onClick={() => navigate(`/enroll/expert/${expert.id}`)}
            >
              {isRtl ? 'احجز جلسة خبير' : 'Book Session'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
