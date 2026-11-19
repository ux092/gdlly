import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Trash2,
  Share2,
  ArrowRight,
  Copy,
  Star,
  Bookmark
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'

export function SavedPlan() {
  const navigate = useNavigate()
  const { savedPlan, removeFromPlan, showToast, isRtl, t } = useApp()

  const totalPrice = savedPlan.reduce((acc, item) => acc + (Number(item.price) || 0), 0)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isRtl ? 'خطتي التعليمية في كايْدلي' : 'My Guidely AI Learning Plan',
        text: isRtl
          ? `هاي خارطة طريقي لتطوير المهارات في منصة كايْدلي (${savedPlan.length} خطوات)!`
          : `Here is my personalized AI skills roadmap on Guidely (${savedPlan.length} steps)!`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
      showToast(isRtl ? 'تم نسخ رابط الخطة للحافظة!' : 'Plan link copied to clipboard!', 'info')
    }
  }

  return (
    <div className="min-h-dvh bg-[#0C0C0C] text-[#F5F5F5] flex flex-col pb-safe-tab">
      <AppBar
        showBack
        title={t('plan.title', 'Saved Learning Plan')}
        subtitle={isRtl ? `${savedPlan.length} محطات مقترحة` : `${savedPlan.length} curated milestones`}
        actions={
          savedPlan.length > 0 && (
            <button
              onClick={handleShare}
              aria-label={isRtl ? 'مشاركة الخطة' : 'Share plan'}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[#F5F5F5] active:bg-[#3D3B30] transition-colors cursor-pointer"
            >
              <Share2 className="w-5 h-5 stroke-[1.5]" />
            </button>
          )
        }
      />

      <main className="pt-16 px-4 space-y-4 text-start">
        {savedPlan.length > 0 ? (
          <>
            {/* Plan Summary Card */}
            <div className="p-4 rounded-2xl bg-[#27261F] text-[#F5F5F5] border border-[#F5F5F5]/12 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#BFA15A] flex items-center gap-1">
                  {isRtl ? 'خارطة طريق موجهة' : 'Structured Roadmap'}
                </span>
                <span className="text-xs bg-[#3D3B30] border border-[#F5F5F5]/10 px-2 py-0.5 rounded-md text-[#F5F5F5]">
                  {savedPlan.length} {isRtl ? 'خطوات' : 'Steps'}
                </span>
              </div>

              <div>
                <h2 className="text-base font-semibold text-[#F5F5F5] leading-tight">
                  {isRtl ? 'مسارك المخصص' : 'Your Curated Roadmap'}
                </h2>
                <p className="text-xs text-[#F5F5F5]/65 mt-0.5">
                  {isRtl
                    ? 'نفّذ هذي الخطوات بالتسلسل حتى تحقق أعلى أثر ونتيجة لشغلك.'
                    : 'Execute these sequentially for maximum career impact.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F5F5F5]/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#F5F5F5]/50 block">
                    {t('plan.totalCost', 'Total Investment')}
                  </span>
                  <span className="text-base font-semibold text-[#BFA15A]">${totalPrice}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 text-[#F5F5F5] text-xs font-medium active:bg-[#4E4B3E] transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>{isRtl ? 'نسخ الخطة' : 'Copy Plan'}</span>
                </button>
              </div>
            </div>

            {/* Ordered Step List */}
            <div className="space-y-3">
              {savedPlan.map((item, index) => {
                const isCourse = item.type === 'course'
                const targetLink = isCourse ? `/courses/${item.id}` : `/services/${item.id}`

                return (
                  <div
                    key={item.id}
                    className="relative bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 space-y-3 text-start"
                  >
                    {/* Step badge & remove */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#BFA15A] text-[#0C0C0C] text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-[10px] font-medium text-[#BFA15A] bg-[#27261F] px-2 py-0.5 rounded-md border border-[#F5F5F5]/10">
                          {isCourse
                            ? isRtl
                              ? 'كورس'
                              : 'Course'
                            : isRtl
                            ? 'جلسة خبير'
                            : '1-on-1 Service'}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromPlan(item.id)}
                        aria-label={t('common.removeFromPlan', 'Remove from plan')}
                        className="text-[#F5F5F5]/40 hover:text-[#E08585] p-1 rounded-lg active:bg-[#4E4B3E] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>

                    {/* Item Details */}
                    <div>
                      <Link to={targetLink} className="block">
                        <h3 className="text-sm font-semibold text-[#F5F5F5] line-clamp-2 hover:text-[#BFA15A] transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      {item.notes && (
                        <p className="text-xs text-[#F5F5F5]/85 bg-[#27261F] rounded-xl p-2.5 mt-2 leading-relaxed border border-[#F5F5F5]/10">
                          💡 {item.notes}
                        </p>
                      )}
                    </div>

                    {/* Footer / CTA */}
                    <div className="pt-2 border-t border-[#F5F5F5]/10 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold text-[#BFA15A]">${item.price}</span>
                        {item.rating && (
                          <span className="ms-2 text-xs text-[#BFA15A] font-medium inline-flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-[#BFA15A] stroke-[#BFA15A]" />
                            {item.rating}
                          </span>
                        )}
                      </div>

                      <Link to={targetLink}>
                        <Button
                          size="sm"
                          variant="primary"
                          iconRight={() => (
                            <ArrowRight className={`w-3.5 h-3.5 shrink-0 stroke-[1.8] transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                          )}
                        >
                          {isCourse
                            ? t('learning.enrollNow', 'Enroll')
                            : t('services.bookService', 'Request')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <EmptyState
            icon={Bookmark}
            title={t('plan.empty', 'Your Plan is Empty')}
            description={t(
              'plan.emptyDesc',
              'Consult with our AI to generate a step-by-step career plan, or bookmark courses & services from the catalog.'
            )}
            actionLabel={t('home.askAiBtn', 'Ask AI Consultant')}
            onAction={() => navigate('/consultant')}
          />
        )}
      </main>
    </div>
  )
}
