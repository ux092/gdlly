import React from 'react'

export function Skeleton({ className = '', variant = 'rect' }) {
  const variantStyles = {
    rect: 'rounded-xl',
    card: 'rounded-2xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4'
  }

  return (
    <div
      className={`animate-pulse bg-slate-200/80 ${variantStyles[variant] || variantStyles.rect} ${className}`}
    />
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
      <Skeleton className="w-full h-36 rounded-xl" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-5" variant="text" />
        <Skeleton className="w-12 h-5" variant="text" />
      </div>
      <Skeleton className="w-3/4 h-5" variant="text" />
      <Skeleton className="w-full h-4" variant="text" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="w-16 h-6" variant="text" />
        <Skeleton className="w-24 h-9 rounded-xl" />
      </div>
    </div>
  )
}
