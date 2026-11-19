import React from 'react'

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ai' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium select-none transition-all duration-150 rounded-xl focus:outline-none min-h-[44px]'

  const variantStyles = {
    primary:
      'bg-[#BFA15A] text-[#0C0C0C] font-semibold active:scale-[0.98] active:opacity-90',
    ai:
      'bg-[#3D3B30] text-[#F5F5F5] border border-[#BFA15A]/60 active:bg-[#4E4B3E] active:scale-[0.98]',
    secondary:
      'bg-[#3D3B30] text-[#F5F5F5] border border-[#F5F5F5]/12 active:bg-[#4E4B3E] active:scale-[0.98]',
    outline:
      'border border-[#F5F5F5]/15 bg-transparent text-[#F5F5F5] active:bg-[#3D3B30] active:scale-[0.98]',
    ghost:
      'text-[#F5F5F5]/65 active:bg-[#3D3B30] active:text-[#F5F5F5]',
    danger:
      'bg-[#995252]/20 text-[#E08585] border border-[#995252]/40 active:bg-[#995252]/30'
  }

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-5 py-3 min-h-[48px] gap-2.5 font-semibold'
  }

  const disabledStyles = disabled || loading ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'
  const widthStyles = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size]} ${disabledStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>{children}</span>
        </span>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {IconRight && <IconRight className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  )
}
