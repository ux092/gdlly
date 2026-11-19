import React, { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon: Icon,
    iconRight: IconRight,
    className = '',
    type = 'text',
    required = false,
    id,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full text-start">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-[#995252]">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute start-3.5 pointer-events-none text-[#F5F5F5]/65">
            <Icon className="w-5 h-5 stroke-[1.5]" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full min-h-[44px] rounded-xl bg-[#3D3B30] border text-base text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 transition-colors focus:outline-none ${
            Icon ? 'ps-11' : 'ps-3.5'
          } ${IconRight ? 'pe-11' : 'pe-3.5'} py-2.5 ${
            error
              ? 'border-[#995252] bg-[#3D3B30] focus:border-[#995252]'
              : 'border-[#F5F5F5]/12 focus:border-[#BFA15A]'
          } ${className}`}
          {...props}
        />
        {IconRight && (
          <div className="absolute end-3.5 text-[#F5F5F5]/65 flex items-center">
            {IconRight}
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-[#E08585] font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-[#F5F5F5]/65">{helperText}</p>
      ) : null}
    </div>
  )
})
