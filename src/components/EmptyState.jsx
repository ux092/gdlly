import React from 'react'
import { Button } from './Button'

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 bg-[#27261F] rounded-2xl border border-[#F5F5F5]/10 ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 flex items-center justify-center text-[#BFA15A] mb-3">
          <Icon className="w-6 h-6 stroke-[1.5]" />
        </div>
      )}
      <h3 className="text-base font-semibold text-[#F5F5F5] leading-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 text-xs text-[#F5F5F5]/65 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button size="sm" variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
