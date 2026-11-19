import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, CheckCircle2, Bookmark } from 'lucide-react'
import { getExpertById } from '../data/experts'
import { useApp } from '../context/AppContext'

export function ServiceCard({ service, variant = 'list', className = '' }) {
  const { isInPlan, addToPlan, removeFromPlan, t } = useApp()
  const expert = getExpertById(service.expertId)
  const saved = isInPlan(service.id)
  const isCarousel = variant === 'carousel'

  return (
    <div
      className={`group relative bg-[#3D3B30] rounded-2xl border border-[#F5F5F5]/12 overflow-hidden transition-all active:scale-[0.98] ${
        isCarousel ? 'w-[280px] shrink-0' : 'w-full'
      } ${className}`}
    >
      {/* Thumbnail + Badges */}
      <Link to={`/services/${service.id}`} className="block relative aspect-video overflow-hidden bg-[#27261F]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover brightness-90 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5">
          {service.badge && (
            <span className="bg-[#BFA15A] text-[#0C0C0C] text-[10px] font-semibold px-2 py-0.5 rounded-md">
              {service.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Save to Plan Quick Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (saved) {
            removeFromPlan(service.id)
          } else {
            addToPlan(service)
          }
        }}
        aria-label={saved ? t('common.removeFromPlan', 'Remove from plan') : t('common.addToPlan', 'Save to plan')}
        className={`absolute top-2.5 end-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
          saved
            ? 'bg-[#BFA15A] text-[#0C0C0C]'
            : 'bg-[#0C0C0C]/80 text-[#F5F5F5] border border-[#F5F5F5]/10 hover:text-[#BFA15A] active:bg-[#0C0C0C]'
        }`}
      >
        <Bookmark className="w-4 h-4 stroke-[1.5]" fill={saved ? 'currentColor' : 'none'} />
      </button>

      {/* Content */}
      <div className="p-3.5 flex flex-col justify-between text-start">
        <Link to={`/services/${service.id}`} className="block">
          <div className="flex items-center gap-2 mb-1.5">
            {expert && (
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-5 h-5 rounded-full object-cover border border-[#F5F5F5]/20 shrink-0"
              />
            )}
            <span className="text-xs font-medium text-[#F5F5F5] truncate">{expert?.name || 'Verified Expert'}</span>
            <span className="text-[#F5F5F5]/40">•</span>
            <span className="flex items-center text-[#BFA15A] text-xs font-medium gap-0.5">
              <Star className="w-3.5 h-3.5 fill-[#BFA15A] stroke-[#BFA15A]" />
              {service.rating}
              <span className="text-[#F5F5F5]/50 font-normal">({service.reviewCount})</span>
            </span>
          </div>

          <h3 className="text-sm font-semibold text-[#F5F5F5] line-clamp-2 leading-snug group-hover:text-[#BFA15A] transition-colors">
            {service.title}
          </h3>

          <p className="mt-1 text-xs text-[#F5F5F5]/65 line-clamp-2">
            {service.description}
          </p>
        </Link>

        {/* Deliverables snippet */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#F5F5F5]/65">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A7A60] shrink-0 stroke-[1.5]" />
          <span className="truncate">{service.deliverables?.[0] || '1-on-1 deliverables'}</span>
        </div>

        {/* Footer info: Delivery days, Starting Price */}
        <div className="mt-3 pt-2.5 border-t border-[#F5F5F5]/10 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-[#F5F5F5]/50">
            <Clock className="w-3.5 h-3.5 text-[#F5F5F5]/50 stroke-[1.5]" />
            {service.deliveryDays}{t('common.deliveryDays', 'd delivery')}
          </span>
          <div className="text-end">
            <span className="text-[10px] text-[#F5F5F5]/50 block -mb-0.5">Starting at</span>
            <span className="text-base font-semibold text-[#BFA15A]">
              ${service.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
