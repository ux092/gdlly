import React, { useState } from 'react'
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle2, Sparkles, Lock, CreditCard, Wallet } from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { getCourseById } from '../data/courses'
import { getServiceById } from '../data/services'
import { getExpertById } from '../data/experts'
import { useApp } from '../context/AppContext'

export function Enroll() {
  const { type, id } = useParams() // 'course' | 'service' | 'expert'
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { user, enrollCourse, submitRequest, isRtl, t } = useApp()

  const tier = searchParams.get('tier') || 'standard'
  const chatSummary = location.state?.chatSummary || null

  let item = null
  let title = 'Booking'
  let price = 0
  let expertName = 'Verified Expert'

  if (type === 'course') {
    item = getCourseById(id)
    if (item) {
      title = item.title
      price = item.price
      const expert = getExpertById(item.instructorId)
      expertName = expert?.name || (isRtl ? 'مدرب معتمد' : 'Expert Instructor')
    }
  } else if (type === 'service') {
    item = getServiceById(id)
    if (item) {
      title = item.title
      const pkg = item.packages?.[tier] || item.packages?.basic
      price = pkg?.price || item.price
      const expert = getExpertById(item.expertId)
      expertName = expert?.name || (isRtl ? 'مستشار تقني' : 'Consultant')
    }
  } else if (type === 'expert') {
    item = getExpertById(id)
    if (item) {
      title = isRtl ? `جلسة استراتيجية 1-على-1 ويا ${item.name}` : `1-on-1 Strategy Session with ${item.name}`
      price = item.hourlyRate
      expertName = item.name
    } else {
      title = isRtl ? 'جلسة استشارية مباشرة ويا خبير' : '1-on-1 Human Expert Strategy Session'
      price = 150
      expertName = isRtl ? 'كبير مستشارين معتمد' : 'Senior Technical Consultant'
    }
  }

  // Form states & validation
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [notes, setNotes] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('zaincash')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = isRtl ? 'الاسم الكامل مطلوب' : 'Full name is required'
    if (!email.trim()) {
      errs.email = isRtl ? 'البريد الإلكتروني مطلوب' : 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = isRtl ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address'
    }

    if (type !== 'course' && (!notes.trim() || notes.length < 10)) {
      errs.notes = isRtl
        ? 'يرجى كتابة 10 أحرف على الأقل توضح متطلبات الجلسة'
        : 'Please provide at least 10 characters describing your request'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      const code = `GD-${Math.floor(100000 + Math.random() * 900000)}`
      setConfirmationCode(code)

      if (type === 'course' && item) {
        enrollCourse(item)
      } else {
        await submitRequest({
          type: type === 'expert' ? 'expert' : 'service',
          itemId: id,
          title,
          expertName,
          packageName: tier ? `${tier.toUpperCase()} Tier` : 'Hourly Session',
          price,
          notes,
          projectUrl,
          paymentMethod,
          chatSummary,
          confirmationCode: code
        })
      }

      setIsSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-dvh bg-slate-50 flex flex-col justify-between p-6 text-center">
        <div className="max-w-sm mx-auto my-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">
              {type === 'course'
                ? isRtl ? 'ألف مبروك! تم التسجيل بالكورس بنجاح' : 'Enrollment Confirmed!'
                : isRtl ? 'تم إرسال طلب الجلسة بنجاح!' : 'Request Submitted Successfully!'}
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {type === 'course'
                ? isRtl
                  ? `أنت الآن مسجل في "${title}". تقدر تبدأ بمشاهدة الدروس فوراً.`
                  : `You are officially enrolled in "${title}". Start watching the first lesson right away.`
                : isRtl
                ? `طلبك تم تحويله للخبير ${expertName}. راح يتواصل وياك لتأكيد الموعد وفتح قناة الشات.`
                : `Your session has been dispatched to ${expertName}. They will review your notes and confirm the schedule.`}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2 text-start">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{isRtl ? 'رقم التأكيد' : 'Confirmation Code'}</span>
              <span className="font-mono font-bold text-slate-800">{confirmationCode}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{isRtl ? 'المبلغ المدفوع' : 'Amount'}</span>
              <span className="font-extrabold text-indigo-700">${price}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{isRtl ? 'طريقة الدفع' : 'Payment Method'}</span>
              <span className="font-bold text-slate-700">
                {paymentMethod === 'zaincash' ? (isRtl ? 'زين كاش (ZainCash)' : 'ZainCash') : (isRtl ? 'بطاقة مصرفية' : 'Bank Card')}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {type === 'course' ? (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate(`/learn/${id}`)}
              >
                {isRtl ? 'ابدأ مشاهدة الدرس الأول' : 'Start First Lesson'}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/requests')}
              >
                {isRtl ? 'عرض طلباتي وحجوزاتي' : 'View My Requests'}
              </Button>
            )}

            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => navigate('/')}
            >
              {isRtl ? 'الرجوع للرئيسية' : 'Back to Home'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col pb-safe">
      <AppBar
        showBack
        title={type === 'course' ? t('enroll.courseEnrollTitle', 'Course Enrollment') : t('enroll.serviceBookTitle', 'Book Expert Service')}
      />

      <main className="pt-16 px-4 space-y-4 text-start">
        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
            {t('enroll.summary', 'Order Summary')}
          </span>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">{title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isRtl ? 'بإشراف: ' : 'With '}
                {expertName}
              </p>
            </div>
            <div className="text-end shrink-0">
              <span className="text-lg font-black text-slate-900">${price}</span>
              <span className="text-[10px] text-slate-400 block">{isRtl ? 'دفعة واحدة' : 'one-time'}</span>
            </div>
          </div>

          {tier && type === 'service' && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{isRtl ? 'الباقة المختارة:' : 'Selected Tier:'}</span>
              <span className="font-bold text-indigo-700 capitalize">{tier} {isRtl ? 'باقة' : 'Package'}</span>
            </div>
          )}
        </div>

        {/* Attached AI Chat Summary Banner (if handoff) */}
        {chatSummary && (
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>{isRtl ? 'سياق محادثة المستشار الذكي مرفق' : 'AI Conversation Context Attached'}</span>
            </div>
            <p className="text-xs text-indigo-950/80 line-clamp-3 italic">
              "{chatSummary}"
            </p>
            <span className="text-[10px] text-indigo-500 block">
              {isRtl ? 'الخبير راح يراجع هذا السياق قبل بدء الجلسة.' : 'The expert will review this prior to your consultation.'}
            </span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isRtl ? 'بيانات التواصل وتفاصيل الطلب' : 'Contact & Project Information'}
            </h3>

            <Input
              label={t('enroll.fullName', 'Your Full Name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder={isRtl ? 'مثال: علي الرافدين' : 'e.g. Alex Rivera'}
              required
            />

            <Input
              label={t('enroll.emailAddress', 'Email Address')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="e.g. alex@example.com"
              required
            />

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                {t('enroll.paymentMethod', 'Payment Method')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('zaincash')}
                  className={`p-3 rounded-xl border flex flex-col items-start gap-1 transition-all cursor-pointer text-start ${
                    paymentMethod === 'zaincash'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Wallet className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'زين كاش (ZainCash)' : 'ZainCash / Local'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isRtl ? 'الدفع بمحفظة العراق الرقمية' : 'Iraqi Mobile Wallet'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-start gap-1 transition-all cursor-pointer text-start ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span>{isRtl ? 'بطاقة مصرفية' : 'Credit / Debit Card'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Visa / Mastercard
                  </span>
                </button>
              </div>
            </div>

            {type !== 'course' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isRtl ? 'شنو النقاط اللي تحب الخبير يركز عليها؟' : 'What would you like the expert to focus on?'}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={isRtl ? 'وضح المشاكل التقنية، رابط المستودع، أو أهدافك من الجلسة...' : 'Describe your current tech stack, main bottlenecks, or questions...'}
                    className={`w-full rounded-2xl border text-sm text-slate-900 p-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-start ${
                      errors.notes
                        ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500'
                        : 'border-slate-200 focus:border-indigo-600'
                    }`}
                  />
                  {errors.notes && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{errors.notes}</p>
                  )}
                </div>

                <Input
                  label={isRtl ? 'رابط المشروع أو الـ GitHub (اختياري)' : 'Project URL or Repository (Optional)'}
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  helperText={isRtl ? 'تگدر أيضاً تشارك ملفات الكود أثناء الجلسة المباشرة.' : 'You can also share sanitized files under NDA later.'}
                />
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {t('enroll.secureCheckout', 'Encrypted & Secure 256-bit checkout')}
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            {type === 'course'
              ? isRtl ? `تأكيد ودفع $${price}` : `Confirm & Pay $${price}`
              : isRtl ? `إرسال طلب الحجز ($${price})` : `Submit Request ($${price})`}
          </Button>
        </form>
      </main>
    </div>
  )
}
