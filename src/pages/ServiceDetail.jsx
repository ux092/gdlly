import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Star,
  Clock,
  CheckCircle2,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { Accordion } from '../components/Accordion'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { getServiceById } from '../data/services'
import { getExpertById } from '../data/experts'
import { useApp } from '../context/AppContext'

export function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setPendingPrompt, showToast, isRtl, t } = useApp()

  const service = getServiceById(id)
  const [selectedTier, setSelectedTier] = useState('standard') // 'basic' | 'standard' | 'premium'

  if (!service) {
    return (
      <div className="min-h-dvh bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          {isRtl ? 'الخدمة غير موجودة' : 'Service Not Found'}
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          {isRtl ? 'لم نتمكن من العثور على خدمة الاستشارة المطلوبة.' : 'The requested consulting service could not be found.'}
        </p>
        <Button variant="primary" size="md" className="mt-4" onClick={() => navigate('/explore?tab=services')}>
          {isRtl ? 'الرجوع للدليل' : 'Back to Catalog'}
        </Button>
      </div>
    )
  }

  const expert = getExpertById(service.expertId)
  const currentPackage = service.packages?.[selectedTier] || service.packages?.basic

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: `Consult with ${expert?.name || 'expert'} on Guidely: ${service.title}`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      showToast(isRtl ? 'تم نسخ رابط الخدمة!' : 'Service link copied to clipboard!', 'info')
    }
  }

  const handleAskAIAboutService = () => {
    setPendingPrompt(
      isRtl
        ? `شلون تفيدني استشارة 1-على-1 في "${service.title}" ويا ${expert?.name || 'الخبير'} بتسريع مشروعي وتطوير الكود؟`
        : `How can the 1-on-1 service "${service.title}" with ${expert?.name || 'the expert'} help accelerate my specific project goals?`
    )
    navigate('/consultant')
  }

  // Format FAQs for Accordion
  const faqItems = (service.faqs || []).map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.question,
    content: () => <p className="text-xs text-slate-600 leading-relaxed text-start">{faq.answer}</p>
  }))

  const tierLabels = {
    basic: isRtl ? 'الباقة الأساسية' : 'Basic Tier',
    standard: isRtl ? 'الباقة المتقدمة' : 'Standard Tier',
    premium: isRtl ? 'الباقة الشاملة' : 'Premium Tier'
  }

  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col pb-28">
      <AppBar
        showBack
        title={service.shortTitle || service.title}
        actions={
          <button
            onClick={handleShare}
            aria-label={isRtl ? 'مشاركة الخدمة' : 'Share service'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 active:bg-slate-100 transition-colors cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
          </button>
        }
      />

      <main className="pt-14 text-start">
        {/* Hero Media Banner */}
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white">
            {service.badge && (
              <Badge variant="purple" size="sm">
                {service.badge}
              </Badge>
            )}
            <span className="text-xs font-semibold bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {currentPackage?.deliveryDays || service.deliveryDays} {t('common.deliveryDays', 'days delivery')}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-4 pt-4 space-y-4">
          {/* Header Info */}
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 leading-snug">
              {service.title}
            </h1>

            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              <span className="flex items-center text-amber-600 font-bold gap-1">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                {service.rating}
                <span className="text-slate-400 font-normal">
                  ({service.reviewCount} {t('common.reviews', 'reviews')})
                </span>
              </span>
            </div>
          </div>

          {/* Expert Card */}
          {expert && (
            <Link
              to={`/experts/${expert.id}`}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between active:bg-slate-50 transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{expert.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{expert.role}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    {isRtl ? 'متاح لجلسات الاستشارة والتدقيق' : 'Available for consulting & audits'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                {isRtl ? 'الملف' : 'Profile'}
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
              </span>
            </Link>
          )}

          {/* Ask AI Banner */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-50 border border-indigo-200/70 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {isRtl ? 'محتار شلون تبدأ بالجلسة؟' : 'Wondering if this service fits?'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {isRtl ? 'اسأل المستشار الذكي عن ملاءمتها لهدفك' : 'Ask AI to evaluate your requirements'}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ai"
              onClick={handleAskAIAboutService}
              className="shrink-0"
            >
              {isRtl ? 'اسأل AI' : 'Ask AI'}
            </Button>
          </div>

          {/* Package Tier Selection Tabs */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t('services.selectTier', 'Select Package Tier')}
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {['basic', 'standard', 'premium'].map((tierKey) => {
                const pkg = service.packages?.[tierKey]
                if (!pkg) return null
                const isSelected = selectedTier === tierKey

                return (
                  <button
                    key={tierKey}
                    onClick={() => setSelectedTier(tierKey)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block truncate capitalize">
                      {tierLabels[tierKey] || tierKey}
                    </span>
                    <span className="text-sm font-extrabold text-indigo-700 block mt-1">
                      ${pkg.price}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Selected Tier Breakdown */}
            {currentPackage && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">{currentPackage.name}</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentPackage.deliveryDays} {t('common.deliveryDays', 'days delivery')}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentPackage.description}
                </p>
              </div>
            )}
          </div>

          {/* Deliverables List */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t('services.deliverables', "What's Included")}
            </h3>
            <div className="space-y-2">
              {service.deliverables?.map((deliv, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 leading-snug">{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          {faqItems.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider px-1">
                {isRtl ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h3>
              <Accordion items={faqItems} />
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe">
        <div className="max-w-[430px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="text-start">
            <span className="text-[11px] text-slate-400 font-medium block -mb-0.5">
              {isRtl ? 'سعر الباقة' : 'Package Total'}
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              ${currentPackage?.price || service.price}
            </span>
          </div>

          <div className="flex-1 max-w-[200px]">
            <Button
              variant="primary"
              size="md"
              fullWidth
              iconRight={() => (
                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
              )}
              onClick={() =>
                navigate(`/enroll/service/${service.id}?tier=${selectedTier}`)
              }
            >
              {t('services.bookService', 'Book Consultation')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
