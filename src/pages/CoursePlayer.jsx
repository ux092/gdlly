import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Play,
  Pause,
  CheckCircle2,
  Circle,
  Sparkles,
  Send,
  Maximize2
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { BottomSheet } from '../components/BottomSheet'
import { Button } from '../components/Button'
import { getCourseById } from '../data/courses'
import { useApp } from '../context/AppContext'
import { sendMessage } from '../services/aiService'

export function CoursePlayer() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { enrollments, updateProgress, showToast, isRtl, t } = useApp()

  const course = getCourseById(courseId)
  const enrollment = enrollments.find((e) => e.courseId === courseId)

  // Current active lesson
  const allLessons = course?.syllabus?.flatMap((m) => m.lessons) || []
  const [activeLesson, setActiveLesson] = useState(
    allLessons[0] || { id: 'l1', title: 'Course Introduction', duration: '15m' }
  )

  const [isPlaying, setIsPlaying] = useState(false)
  const [isTutorOpen, setIsTutorOpen] = useState(false)
  const [tutorInput, setTutorInput] = useState('')
  const [tutorMessages, setTutorMessages] = useState([
    {
      id: 't-init',
      role: 'assistant',
      content: isRtl
        ? `هلا بيك! أني مساعدك الذكي لكورس "${course?.title || 'هذا الكورس'}". اسألني أي شي عن المفاهيم أو الكود بدرس "${activeLesson.title}".`
        : `Hi! I'm your AI Tutor for "${course?.title || 'this course'}". Ask me any question about the concepts or code in "${activeLesson.title}".`
    }
  ])
  const [tutorLoading, setTutorLoading] = useState(false)

  if (!course) {
    return (
      <div className="min-h-dvh bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          {isRtl ? 'الكورس غير موجود' : 'Course Not Found'}
        </h2>
        <Button variant="primary" size="md" className="mt-4" onClick={() => navigate('/learning')}>
          {isRtl ? 'الرجوع لصفحة دراستي' : 'Back to Learning'}
        </Button>
      </div>
    )
  }

  const completedLessons = enrollment?.completedLessons || []
  const isLessonCompleted = completedLessons.includes(activeLesson.id)

  const toggleLessonComplete = (lessonId) => {
    const isDone = completedLessons.includes(lessonId)
    const newCompleted = isDone
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId]

    const newPercent = Math.round((newCompleted.length / Math.max(allLessons.length, 1)) * 100)
    updateProgress(course.id, lessonId, newPercent)

    showToast(
      isDone
        ? isRtl ? 'تم إلغاء تحديد إكمال الدرس' : 'Lesson marked incomplete'
        : isRtl ? 'عاشت إيدك! تم إكمال الدرس بنجاح 🎉' : 'Lesson completed! 🎉',
      'success'
    )
  }

  const handleSendTutor = async (textToSend) => {
    const text = (textToSend || tutorInput).trim()
    if (!text || tutorLoading) return

    setTutorInput('')
    const userMsg = { id: `user-${Date.now()}`, role: 'user', content: text }
    setTutorMessages((prev) => [...prev, userMsg])
    setTutorLoading(true)

    try {
      const prompt = `[Context: Course "${course.title}", Lesson "${activeLesson.title}"] User asks: ${text}`
      const response = await sendMessage(prompt)
      setTutorMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: response.answer
        }
      ])
    } catch {
      setTutorMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: isRtl
            ? `بالنسبة لدرس ${activeLesson.title}: تذكر دائماً تقسم الـ State لخطوات واضحة وتفحص الحدود بين المكونات.`
            : `Here's a breakdown for ${activeLesson.title}: Remember to break down complex state transitions into discrete actions and test component boundaries.`
        }
      ])
    } finally {
      setTutorLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-slate-900 text-white flex flex-col pb-safe">
      <AppBar
        showBack
        title={course.shortTitle || course.title}
        subtitle={activeLesson.title}
        className="bg-slate-900/90 text-white border-slate-800"
      />

      {/* Video Player Stage */}
      <div className="pt-14 relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
        <img
          src={course.image}
          alt={activeLesson.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-80 scale-105' : 'opacity-50'
          }`}
        />

        {/* Video Overlay Controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/40">
          <div className="flex justify-between items-center text-xs">
            <span className="bg-black/60 px-2 py-0.5 rounded-full text-[11px] backdrop-blur-xs">
              {activeLesson.duration}
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Central Play/Pause Button */}
          <div className="self-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className={`w-6 h-6 fill-current ${isRtl ? 'rotate-180 -mr-0.5' : 'ml-0.5'}`} />
              )}
            </button>
          </div>

          {/* Scrubber Mock */}
          <div className="w-full space-y-1">
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-1/3" />
            </div>
            <div className="flex justify-between text-[10px] text-white/60">
              <span>04:12</span>
              <span>{activeLesson.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Details & Interactive Controls */}
      <div className="flex-1 bg-slate-900 px-4 py-4 space-y-4 text-start">
        {/* Title & Complete Action */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              {isRtl ? 'الدرس الحالي' : 'Active Lesson'}
            </span>
            <h1 className="text-base font-extrabold text-white mt-0.5 leading-snug">
              {activeLesson.title}
            </h1>
          </div>

          <button
            onClick={() => toggleLessonComplete(activeLesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              isLessonCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isLessonCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isRtl ? 'مكتمل' : 'Completed'}</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>{isRtl ? 'إكمال الدرس' : 'Mark Done'}</span>
              </>
            )}
          </button>
        </div>

        {/* AI Tutor Quick Access Button */}
        <button
          onClick={() => setIsTutorOpen(true)}
          className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-800 border border-indigo-500/30 flex items-center justify-between text-start cursor-pointer group active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                {t('learning.aiTutorTitle', 'Ask AI Tutor about this lesson')}
              </p>
              <p className="text-[11px] text-slate-400">
                {isRtl ? 'احصل على شرح فوري وتدقيق للكود' : 'Get instant code explanations & hints'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
            {isRtl ? 'فتح المساعد' : 'Open'}
          </span>
        </button>

        {/* Syllabus Playlist */}
        <div className="pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {t('learning.syllabus', 'Syllabus & Modules')}
          </h2>

          <div className="space-y-4">
            {course.syllabus?.map((module) => (
              <div key={module.id} className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  {module.title}
                </span>

                <div className="space-y-1.5">
                  {module.lessons.map((lesson) => {
                    const isCurrent = lesson.id === activeLesson.id
                    const isDone = completedLessons.includes(lesson.id)

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLesson(lesson)
                          setIsPlaying(true)
                        }}
                        className={`w-full p-2.5 rounded-xl flex items-center justify-between text-xs text-start transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-600/30 border border-indigo-500/40 text-white'
                            : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pe-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isCurrent ? (
                            <Play className={`w-4 h-4 text-indigo-400 shrink-0 fill-current ${isRtl ? 'rotate-180' : ''}`} />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {lesson.duration}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded In-Lesson AI Tutor Bottom Sheet */}
      <BottomSheet
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        title={t('learning.aiTutorTitle', 'Ask AI Tutor')}
        subtitle={activeLesson.title}
      >
        <div className="flex flex-col h-[55vh] -mx-1 text-start">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3 no-scrollbar">
            {tutorMessages.map((msg) => {
              const isTutorUser = msg.role === 'user'
              return (
                <div
                  key={msg.id}
                  className={`flex ${isTutorUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed text-start ${
                      isTutorUser
                        ? `bg-indigo-600 text-white ${isRtl ? 'rounded-tl-xs' : 'rounded-tr-xs'}`
                        : `bg-slate-100 text-slate-800 border border-slate-200 ${isRtl ? 'rounded-tr-xs' : 'rounded-tl-xs'}`
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              )
            })}
            {tutorLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-500 p-3 rounded-2xl text-xs">
                  {isRtl ? 'المساعد الذكي دا يحلل الكود...' : 'AI Tutor is analyzing lesson code...'}
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendTutor()
            }}
            className="pt-2 border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={tutorInput}
              onChange={(e) => setTutorInput(e.target.value)}
              placeholder={t('learning.aiTutorPlaceholder', 'Ask a clarifying question...')}
              className="flex-1 min-h-[44px] rounded-xl bg-slate-100 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-start"
            />
            <button
              type="submit"
              disabled={!tutorInput.trim() || tutorLoading}
              className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center disabled:opacity-40 cursor-pointer active:scale-95"
            >
              <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>
      </BottomSheet>
    </div>
  )
}
