import React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Toast() {
  const { toasts, removeToast } = useApp()

  if (!toasts || toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="fixed bottom-20 left-0 right-0 z-50 pointer-events-none flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success'
        const isError = toast.type === 'error'

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto max-w-[390px] w-full rounded-xl p-3.5 border flex items-center justify-between gap-3 transform transition-all duration-200 ${
              isSuccess
                ? 'bg-[#27261F] text-[#F5F5F5] border-[#5A7A60]/40'
                : isError
                ? 'bg-[#27261F] text-[#F5F5F5] border-[#995252]/40'
                : 'bg-[#27261F] text-[#F5F5F5] border-[#F5F5F5]/12'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-[#82AA89] shrink-0 stroke-[1.5]" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-[#E08585] shrink-0 stroke-[1.5]" />
              ) : (
                <Info className="w-5 h-5 text-[#BFA15A] shrink-0 stroke-[1.5]" />
              )}
              <p className="text-xs font-medium leading-snug text-start">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast"
              className="text-[#F5F5F5]/50 hover:text-[#F5F5F5] p-1 rounded-lg active:bg-[#3D3B30]"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
