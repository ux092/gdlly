import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Compass, Sparkles, Home } from 'lucide-react'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'

export function NotFound() {
  const navigate = useNavigate()
  const { isRtl } = useApp()

  return (
    <div className="min-h-dvh bg-slate-900 text-white flex flex-col justify-center items-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-6">
        <Compass className="w-10 h-10 animate-spin" />
      </div>

      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
        {isRtl ? 'خطأ 404' : '404 Error'}
      </span>
      <h1 className="text-2xl font-black text-white mt-1">
        {isRtl ? 'الصفحة غير موجودة' : 'Screen Not Found'}
      </h1>
      <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
        {isRtl
          ? 'يبدو أن الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.'
          : 'The destination you are trying to reach does not exist or has been moved.'}
      </p>

      <div className="mt-6 w-full max-w-xs space-y-2.5">
        <Button
          variant="primary"
          size="md"
          fullWidth
          icon={Home}
          onClick={() => navigate('/')}
        >
          {isRtl ? 'الرجوع للرئيسية' : 'Return to Home'}
        </Button>

        <Button
          variant="ai"
          size="md"
          fullWidth
          icon={Sparkles}
          onClick={() => navigate('/consultant')}
        >
          {isRtl ? 'اسأل المستشار الذكي' : 'Ask AI Consultant'}
        </Button>
      </div>
    </div>
  )
}
