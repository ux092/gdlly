import React from 'react'
import { Link } from 'react-router-dom'
import { Star, CheckCircle, MapPin, ArrowRight } from 'lucide-react'
import { Badge } from './Badge'

export function ExpertCard({ expert, className = '' }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-all active:scale-[0.98] ${className}`}
    >
      <div>
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            {expert.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-3 h-3 fill-white stroke-indigo-600" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 truncate">{expert.name}</h3>
              <div className="flex items-center text-amber-600 text-xs font-semibold gap-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                {expert.rating}
              </div>
            </div>
            <p className="text-xs text-indigo-600 font-medium truncate">{expert.role}</p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-300" />
              {expert.location}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {expert.bio}
        </p>

        {/* Specialties tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {expert.specialties?.slice(0, 3).map((spec, i) => (
            <Badge key={i} variant="neutral" size="sm">
              {spec}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 block -mb-0.5">Consultation</span>
          <span className="text-sm font-bold text-slate-900">${expert.hourlyRate}/hr</span>
        </div>
        <Link
          to={`/experts/${expert.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl active:bg-indigo-100 transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
