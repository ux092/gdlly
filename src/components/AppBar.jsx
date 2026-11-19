import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Languages } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function AppBar({
  title,
  subtitle,
  showBack = false,
  onBack,
  actions,
  transparent = false,
  className = '',
  showLangToggle = true
}) {
  const navigate = useNavigate()
  const { isRtl, language, toggleLanguage, t } = useApp()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors ${
        transparent
          ? 'bg-transparent'
          : 'bg-[#0C0C0C] border-b border-[#F5F5F5]/10'
      } ${className}`}
    >
      <div className="max-w-[430px] mx-auto px-4 h-14 flex items-center justify-between">
        {/* Start side: Back button or brand slot */}
        <div className="flex items-center gap-2 min-w-[44px]">
          {showBack ? (
            <button
              onClick={handleBack}
              aria-label={t('nav.back', 'Go back')}
              className="w-10 h-10 -ms-2 rounded-xl flex items-center justify-center text-[#F5F5F5] active:bg-[#3D3B30] transition-colors"
            >
              <ChevronLeft className={`w-6 h-6 stroke-[1.8] transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          ) : null}
          {title ? (
            <div className="flex flex-col text-start">
              <h1 className="text-base font-semibold text-[#F5F5F5] leading-tight truncate max-w-[210px]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] text-[#F5F5F5]/65 font-normal truncate max-w-[210px]">
                  {subtitle}
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#3D3B30] border border-[#BFA15A]/60 flex items-center justify-center text-[#BFA15A]">
                <span className="font-bold text-sm tracking-tight">G</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-[#F5F5F5]">
                Guidely
              </span>
            </div>
          )}
        </div>

        {/* End side: Language switcher & Custom actions */}
        <div className="flex items-center gap-1.5 justify-end">
          {showLangToggle && (
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="h-8 px-2.5 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 hover:bg-[#4E4B3E] active:scale-95 text-xs font-medium text-[#F5F5F5] flex items-center gap-1.5 transition-all cursor-pointer"
              title={language === 'ar-IQ' ? 'Switch to English' : 'التحويل للعراقية'}
            >
              <Languages className="w-3.5 h-3.5 text-[#BFA15A]" />
              <span>{language === 'ar-IQ' ? 'EN' : '🇮🇶 عراقي'}</span>
            </button>
          )}
          {actions}
        </div>
      </div>
    </header>
  )
}
