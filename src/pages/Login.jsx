import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'

export function Login() {
  const navigate = useNavigate()
  const { loginUser, isRtl } = useApp()

  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError(isRtl ? 'البريد الإلكتروني مطلوب' : 'Email is required')
      return
    }

    loginUser({
      name: name.trim() || email.split('@')[0],
      email: email.trim()
    })
    navigate('/')
  }

  const handleQuickLogin = (demoName, demoEmail) => {
    loginUser({ name: demoName, email: demoEmail })
    navigate('/')
  }

  return (
    <div className="min-h-dvh bg-slate-900 text-white flex flex-col justify-between p-6">
      {/* Brand Header */}
      <div className="pt-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-3">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">Guidely</h1>
        <p className="text-xs text-indigo-300 font-medium mt-0.5">
          {isRtl ? 'منصة المهارات والكورسات واستشارات الخبراء' : 'AI-First Skills, Courses & Expert Services'}
        </p>
      </div>

      {/* Main Form Box */}
      <div className="w-full max-w-sm mx-auto bg-slate-800/90 rounded-3xl p-5 border border-slate-700 shadow-xl space-y-4">
        <div className="flex border-b border-slate-700 pb-2 mb-2">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false)
              setError('')
            }}
            className={`flex-1 pb-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
              !isSignUp ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400'
            }`}
          >
            {isRtl ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true)
              setError('')
            }}
            className={`flex-1 pb-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
              isSignUp ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400'
            }`}
          >
            {isRtl ? 'حساب جديد' : 'Create Account'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-start">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                {isRtl ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                placeholder={isRtl ? 'مثال: علي الحسني' : 'e.g. Ali Al-Hassani'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full min-h-[44px] rounded-2xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-start"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input
              type="email"
              placeholder="e.g. ali@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[44px] rounded-2xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-start"
            />
            {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            iconRight={() => (
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            )}
          >
            {isSignUp
              ? isRtl ? 'إنشاء حساب مجاني' : 'Create Free Account'
              : isRtl ? 'تسجيل الدخول' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Fast Login Shortcuts */}
        <div className="pt-3 border-t border-slate-700/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider text-center">
            {isRtl ? 'أو جرب الدخول بشخصية تجريبية:' : 'Or test with a demo persona:'}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('علي الحسني', 'ali@example.com')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-[11px] font-semibold text-slate-300 hover:text-white active:bg-slate-700 transition-colors truncate cursor-pointer"
            >
              👤 {isRtl ? 'علي (مطور)' : 'Ali (Dev)'}
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Jordan Hayes', 'jordan.hayes@example.com')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-[11px] font-semibold text-slate-300 hover:text-white active:bg-slate-700 transition-colors truncate cursor-pointer"
            >
              🎨 Jordan ({isRtl ? 'تصميم' : 'Design'})
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500">
        {isRtl ? 'جلسة محلية تجريبية • لا يلزم كلمة سر حقيقية' : 'Local sandbox session • No real password required'}
      </div>
    </div>
  )
}
