import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, BookOpen, Bookmark } from 'lucide-react'
import { getExpertById } from '../data/experts'
import { useApp } from '../context/AppContext'

export function CourseCard({ course, variant = 'list', className = '' }) {
  const { isInPlan, addToPlan, removeFromPlan, t } = useApp()
  const instructor = getExpertById(course.instructorId)
  const saved = isInPlan(course.id)

  const isCarousel = variant === 'carousel'

  return (
    <div
      className={`group relative bg-[#3D3B30] rounded-2xl border border-[#F5F5F5]/12 overflow-hidden transition-all active:scale-[0.98] ${
        isCarousel ? 'w-[280px] shrink-0' : 'w-full'
      } ${className}`}
    >
      {/* Thumbnail + Badges */}
      <Link to={`/courses/${course.id}`} className="block relative aspect-video overflow-hidden bg-[#27261F]">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover brightness-90 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5">
          {course.badge && (
            <span className="bg-[#BFA15A] text-[#0C0C0C] text-[10px] font-semibold px-2 py-0.5 rounded-md">
              {course.badge}
            </span>
          )}
          <span className="bg-[#0C0C0C]/80 text-[#F5F5F5] border border-[#F5F5F5]/10 text-[10px] font-medium px-2 py-0.5 rounded-md">
            {course.level}
          </span>
        </div>
      </Link>

      {/* Save to Plan Quick Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (saved) {
            removeFromPlan(course.id)
          } else {
            addToPlan(course)
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
        <Link to={`/courses/${course.id}`} className="block">
          <div className="flex items-center gap-1.5 text-xs text-[#F5F5F5]/65 mb-1">
            <span className="font-medium text-[#F5F5F5] truncate">{instructor?.name || 'Expert'}</span>
            <span>•</span>
            <span className="flex items-center text-[#BFA15A] font-medium gap-0.5">
              <Star className="w-3.5 h-3.5 fill-[#BFA15A] stroke-[#BFA15A]" />
              {course.rating}
              <span className="text-[#F5F5F5]/50 font-normal">({course.reviewCount})</span>
            </span>
          </div>

          <h3 className="text-sm font-semibold text-[#F5F5F5] line-clamp-2 leading-snug group-hover:text-[#BFA15A] transition-colors">
            {course.title}
          </h3>
        </Link>

        {/* Footer info: Duration, Lessons, Price */}
        <div className="mt-3 pt-2.5 border-t border-[#F5F5F5]/10 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[#F5F5F5]/50">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#F5F5F5]/50 stroke-[1.5]" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#F5F5F5]/50 stroke-[1.5]" />
              {course.lessonsCount}
            </span>
          </div>
          <div className="text-end">
            <span className="text-base font-semibold text-[#BFA15A]">
              ${course.price}
            </span>
            {course.originalPrice && (
              <span className="text-xs text-[#F5F5F5]/40 line-through ms-1">
                ${course.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
