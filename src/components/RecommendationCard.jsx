import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Bookmark, ArrowRight } from 'lucide-react'
import { getCourseById } from '../data/courses'
import { getServiceById } from '../data/services'
import { getExpertById } from '../data/experts'
import { useApp } from '../context/AppContext'
import { Button } from './Button'

export function RecommendationCard({ recommendation, className = '' }) {
  const { type, id } = recommendation
  const { isInPlan, addToPlan, removeFromPlan, isRtl, t } = useApp()

  let item = null
  let title = ''
  let subtitle = ''
  let price = ''
  let rating = 5.0
  let image = ''
  let link = ''
  let actionText = t('common.seeMore', 'View')

  if (type === 'course') {
    item = getCourseById(id)
    if (item) {
      title = item.title
      subtitle = `${item.level} • ${item.duration}`
      price = `$${item.price}`
      rating = item.rating
      image = item.image
      link = `/courses/${item.id}`
      actionText = t('learning.enrollNow', 'Enroll')
    }
  } else if (type === 'service') {
    item = getServiceById(id)
    if (item) {
      title = item.title
      subtitle = `${item.deliveryDays}${t('common.deliveryDays', 'd delivery')}`
      price = `${t('common.usd', '$')}${item.price}`
      rating = item.rating
      image = item.image
      link = `/services/${item.id}`
      actionText = t('services.bookService', 'Request')
    }
  } else if (type === 'expert') {
    item = getExpertById(id)
    if (item) {
      title = item.name
      subtitle = item.role
      price = `$${item.hourlyRate}${t('common.perHour', '/hr')}`
      rating = item.rating
      image = item.avatar
      link = `/experts/${item.id}`
      actionText = t('services.expertProfile', 'Profile')
    }
  }

  if (!item) return null

  const saved = isInPlan(item.id)

  const typeLabels = {
    course: isRtl ? 'كورس' : 'Course',
    service: isRtl ? 'خدمة' : 'Service',
    expert: isRtl ? 'خبير' : 'Expert'
  }

  return (
    <div
      className={`shrink-0 w-[240px] bg-[#27261F] rounded-2xl border border-[#F5F5F5]/12 p-3 flex flex-col justify-between transition-all active:scale-[0.98] text-start ${className}`}
    >
      <div>
        {/* Header tag & Plan button */}
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[#BFA15A] bg-[#3D3B30] px-2 py-0.5 rounded-md border border-[#F5F5F5]/10">
            {typeLabels[type] || type}
          </span>
          <button
            onClick={() => (saved ? removeFromPlan(item.id) : addToPlan(item))}
            aria-label={saved ? t('common.removeFromPlan', 'Remove from plan') : t('common.addToPlan', 'Save to plan')}
            className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
              saved ? 'text-[#BFA15A] bg-[#3D3B30]' : 'text-[#F5F5F5]/40 active:bg-[#3D3B30]'
            }`}
          >
            <Bookmark className="w-4 h-4 stroke-[1.5]" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Thumbnail + info */}
        <div className="flex items-start gap-2.5 mb-2">
          <img
            src={image}
            alt={title}
            className={`w-12 h-12 object-cover shrink-0 brightness-90 ${
              type === 'expert' ? 'rounded-full' : 'rounded-xl'
            }`}
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-[#F5F5F5] line-clamp-2 leading-tight">
              {title}
            </h4>
            <p className="text-[11px] text-[#F5F5F5]/65 truncate mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between text-xs my-2">
          <span className="font-semibold text-[#BFA15A]">{price}</span>
          <span className="flex items-center gap-0.5 text-[#BFA15A] font-medium text-[11px]">
            <Star className="w-3.5 h-3.5 fill-[#BFA15A] stroke-[#BFA15A]" />
            {rating}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-[#F5F5F5]/10 flex items-center gap-2">
        <Link to={link} className="flex-1">
          <Button
            size="sm"
            variant="ai"
            fullWidth
            iconRight={() => <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isRtl ? 'rotate-180' : ''}`} />}
          >
            {actionText}
          </Button>
        </Link>
      </div>
    </div>
  )
}
