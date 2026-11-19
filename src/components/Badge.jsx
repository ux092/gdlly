import React from 'react'

export function Badge({
  children,
  variant = 'neutral', // 'neutral' | 'indigo' | 'ai' | 'success' | 'warning' | 'purple'
  size = 'sm',
  className = ''
}) {
  const variantStyles = {
    neutral: 'bg-[#27261F] text-[#F5F5F5]/85 border-[#F5F5F5]/10',
    indigo: 'bg-[#3D3B30] text-[#BFA15A] border-[#BFA15A]/30',
    ai: 'bg-[#27261F] text-[#BFA15A] border-[#BFA15A]/40 font-medium',
    success: 'bg-[#5A7A60]/20 text-[#82AA89] border-[#5A7A60]/40',
    warning: 'bg-[#A68A56]/20 text-[#D8B97C] border-[#A68A56]/40',
    purple: 'bg-[#3D3B30] text-[#F5F5F5] border-[#F5F5F5]/12'
  }

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 leading-tight font-medium',
    md: 'text-xs px-2.5 py-1 font-medium'
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border ${variantStyles[variant] || variantStyles.neutral} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}
