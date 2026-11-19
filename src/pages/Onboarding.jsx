import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'

export function Onboarding() {
  const navigate = useNavigate()
  const { setPendingPrompt, isRtl, t } = useApp()

  const [currentStep, setCurrentStep] = useState(1) // 1, 2, 3

  // Step 1: Goal
  const [goal, setGoal] = useState(
    isRtl
      ? 'أصير مهندس برمجيات متكامل بـ React و Next.js'
      : 'Become a Senior Full-Stack React Engineer'
  )
  const [customGoal, setCustomGoal] = useState('')

  // Step 2: Level
  const [level, setLevel] = useState(
    isRtl ? 'متوسط (خبرة 1-3 سنوات)' : 'Intermediate (1-3 years experience)'
  )

  // Step 3: Time & Budget
  const [timeCommitment, setTimeCommitment] = useState(
    isRtl ? '5-10 ساعات أسبوعياً' : '5-10 hours / week'
  )
  const [budget, setBudget] = useState(
    isRtl ? '100$ - 300$ (كورسات + تدقيق كود)' : '$100 - $300 (Courses + 1 Audit)'
  )

  const goalOptions = isRtl
    ? [
        'أصير مهندس برمجيات متكامل بـ React و Next.js',
        'أأتتم شغل الفريق بوكلاء الذكاء الاصطناعي و n8n',
        'أضاعف أسعاري بالفريلانس وأحصل عملاء شهريين',
        'أبني أنظمة تصميم متكاملة في فيجما والكود',
        'أتعلم تحليل البيانات والذكاء الاصطناعي ببايثون و SQL'
      ]
    : [
        'Become a Senior Full-Stack React Engineer',
        'Automate Team Workflows with AI Agents & Webhooks',
        'Double My Freelance Rates & Close Retainers',
        'Build Tokenized Design Systems in Figma & Code',
        'Learn Data Analytics with SQL & Python'
      ]

  const levelOptions = isRtl
    ? [
        {
          title: 'مبتدئ',
          desc: 'دا أبدأ من الصفر أو دا أتحول لمجال التقنية والبرمجة'
        },
        {
          title: 'متوسط',
          desc: 'عندي خبرة 1-3 سنوات، وجاهز أبني أنظمة إنتاجية حقيقية'
        },
        {
          title: 'متقدم',
          desc: 'مهندس أو مصمم محترف وأبحث عن تدقيق كود ومعمارية متقدمة'
        }
      ]
    : [
        { title: 'Beginner', desc: 'Starting out or switching careers into tech' },
        { title: 'Intermediate', desc: '1-3 years experience, ready to build production systems' },
        { title: 'Advanced', desc: 'Senior engineer or designer looking for expert architecture audits' }
      ]

  const timeOptions = isRtl
    ? [
        '2-4 ساعات أسبوعياً (دراسة هادئة)',
        '5-10 ساعات أسبوعياً (الموصى به)',
        '15+ ساعة أسبوعياً (معسكر مكثف)'
      ]
    : [
        '2-4 hours / week (Casual)',
        '5-10 hours / week (Recommended)',
        '15+ hours / week (Intensive Bootcamp)'
      ]

  const budgetOptions = isRtl
    ? [
        'أقل من 100$ (كورسات فقط)',
        '100$ - 300$ (كورسات + استشارة كود 1-على-1)',
        '300$+ (برنامج إرشاد شامل ومتابعة دورية)'
      ]
    : [
        'Under $100 (Courses only)',
        '$100 - $300 (Courses + 1-on-1 Audit)',
        '$300+ (Comprehensive Mentorship & Sprints)'
      ]

  const handleFinish = () => {
    const finalGoal = customGoal.trim() || goal
    const synthesizedPrompt = isRtl
      ? `هلا! كملت إعداد مساري المهني. هدفي هو: "${finalGoal}". مستواي وخبرتي الحالية: ${level}. أگدر أخصص وقت ${timeCommitment} وميزانيتي بحدود ${budget}. يا ريت ترتبلي خطة تعلم ذكية خطوة بخطوة وتقترحي أفضل الكورسات واستشارات الخبراء المناسبة لهدفي.`
      : `Hello! I just finished onboarding. My goal is: "${finalGoal}". My current level is ${level}. I can commit ${timeCommitment} and have a budget around ${budget}. Please design a personalized learning path and recommend the best courses and expert consultations for me.`
    setPendingPrompt(synthesizedPrompt)
    navigate('/consultant')
  }

  const handleSkip = () => {
    navigate('/consultant')
  }

  return (
    <div className="min-h-dvh bg-slate-900 text-white flex flex-col justify-between p-6">
      {/* Top Header & Progress */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white tracking-tight">
              {isRtl ? 'إعداد مسار كايْدلي الذكي' : 'Guidely AI Setup'}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-white active:underline cursor-pointer"
          >
            {t('onboarding.skipBtn', 'Skip to Consultant')}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-4 text-start">
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                {isRtl ? 'الخطوة 1 من 3 • تحديد الهدف' : 'Step 1 of 3 • Goal Alignment'}
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                {t('onboarding.step1Title', 'What is your primary career goal?')}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isRtl
                  ? 'المستشار الذكي راح يخصص كل التوصيات والكورسات بناءً على هذا الهدف.'
                  : 'Guidely AI uses this to craft your personalized curriculum and mentorship roadmap.'}
              </p>
            </div>

            <div className="space-y-2">
              {goalOptions.map((opt) => {
                const isSelected = goal === opt && !customGoal
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setGoal(opt)
                      setCustomGoal('')
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0 ms-2" />}
                  </button>
                )
              })}
            </div>

            <div>
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder={isRtl ? 'أو اكتب هدفك المخصص هنا...' : 'Or type your custom goal here...'}
                className="w-full min-h-[44px] bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-start"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                {isRtl ? 'الخطوة 2 من 3 • مستوى الخبرة' : 'Step 2 of 3 • Current Level'}
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                {t('onboarding.step2Title', 'What is your current experience level?')}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isRtl
                  ? 'حتى نقترحلك دروس واستشارات بالمستوى المناسب تماماً بدون تكرار أو تعقيد.'
                  : 'We will calibrate course depth and match you with the right caliber of experts.'}
              </p>
            </div>

            <div className="space-y-2.5">
              {levelOptions.map((opt) => {
                const isSelected = level === opt.title
                return (
                  <button
                    key={opt.title}
                    onClick={() => setLevel(opt.title)}
                    className={`w-full p-4 rounded-2xl border text-start flex items-start justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{opt.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-1 ms-2" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                {isRtl ? 'الخطوة 3 من 3 • الوقت والميزانية' : 'Step 3 of 3 • Commitment & Budget'}
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                {t('onboarding.step3Title', 'Time commitment & budget?')}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isRtl
                  ? 'حتى نحددلك جدول واقعي يتناسب ويا التزاماتك وميزانيتك.'
                  : 'Ensures your roadmap is realistic and finishes within your desired timeframe.'}
              </p>
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {isRtl ? 'الوقت الأسبوعي المتاح' : 'Weekly Availability'}
              </label>
              <div className="space-y-2">
                {timeOptions.map((opt) => {
                  const isSelected = timeCommitment === opt
                  return (
                    <button
                      key={opt}
                      onClick={() => setTimeCommitment(opt)}
                      className={`w-full p-3 rounded-xl border text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-slate-800/80 border-slate-700/80 text-slate-300'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 ms-2" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {isRtl ? 'الميزانية التقريبية' : 'Estimated Target Investment'}
              </label>
              <div className="space-y-2">
                {budgetOptions.map((opt) => {
                  const isSelected = budget === opt
                  return (
                    <button
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className={`w-full p-3 rounded-xl border text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-slate-800/80 border-slate-700/80 text-slate-300'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 ms-2" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons Footer */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
        {currentStep > 1 && (
          <Button
            variant="outline"
            size="md"
            icon={() => (
              isRtl ? (
                <ArrowRight className="w-4 h-4 shrink-0" />
              ) : (
                <ArrowLeft className="w-4 h-4 shrink-0" />
              )
            )}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
          >
            {t('onboarding.backBtn', 'Back')}
          </Button>
        )}

        {currentStep < 3 ? (
          <Button
            variant="primary"
            size="md"
            fullWidth
            iconRight={() => (
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            )}
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            {t('onboarding.nextBtn', 'Next Step')}
          </Button>
        ) : (
          <Button
            variant="ai"
            size="md"
            fullWidth
            icon={Sparkles}
            onClick={handleFinish}
          >
            {t('onboarding.finishBtn', 'Generate AI Learning Path')}
          </Button>
        )}
      </div>
    </div>
  )
}
