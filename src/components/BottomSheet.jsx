import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export function BottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxHeight = 'max-h-[85vh]',
  showClose = true
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Content Container (bounded to 430px max width mobile container) */}
      <div
        className={`relative z-10 w-full max-w-[430px] bg-[#0C0C0C] text-[#F5F5F5] rounded-t-[24px] border-t border-[#F5F5F5]/12 shadow-2xl flex flex-col ${maxHeight} overflow-hidden transform transition-transform duration-250 ease-out`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
      >
        {/* Grab Handle */}
        <div className="pt-2.5 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-[#3D3B30] rounded-full" />
        </div>

        {/* Header */}
        {(title || showClose) && (
          <div className="px-5 py-3 border-b border-[#F5F5F5]/10 flex items-center justify-between text-start">
            <div className="text-start">
              {title && (
                <h2 id="bottom-sheet-title" className="text-base font-semibold text-[#F5F5F5] leading-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-[#F5F5F5]/65 font-normal mt-0.5">{subtitle}</p>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                aria-label="Close bottom sheet"
                className="w-8 h-8 rounded-xl bg-[#3D3B30] flex items-center justify-center text-[#F5F5F5] active:bg-[#4E4B3E] transition-colors"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>
            )}
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto no-scrollbar flex-1 pb-safe">
          {children}
        </div>
      </div>
    </div>
  )
}
