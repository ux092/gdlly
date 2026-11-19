import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getTranslation } from '../i18n/translations'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // User Authentication
  const [user, setUser] = useLocalStorage('guidely_user', {
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    title: 'Frontend Engineer',
    language: 'English (US)',
    notifications: {
      emailAlerts: true,
      expertReplies: true,
      courseMilestones: true,
      recommendations: false
    }
  })

  // Language & Direction Management ('ar-IQ' | 'en')
  const [language, setLanguageState] = useLocalStorage('guidely_language', 'ar-IQ')

  const isRtl = language === 'ar-IQ'
  const dir = isRtl ? 'rtl' : 'ltr'

  // Update HTML document attributes when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir
      document.documentElement.lang = language
    }
  }, [dir, language])

  const setLanguage = useCallback(
    (newLang) => {
      const normalized = newLang === 'ar-IQ' || newLang === 'العربية (العراق)' ? 'ar-IQ' : 'en'
      setLanguageState(normalized)
      setUser((prev) =>
        prev
          ? {
              ...prev,
              language: normalized === 'ar-IQ' ? 'العربية (العراق)' : 'English (US)'
            }
          : prev
      )
    },
    [setLanguageState, setUser]
  )

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar-IQ' ? 'en' : 'ar-IQ')
  }, [language, setLanguage])

  // Translation helper function with parameter interpolation
  const t = useCallback(
    (path, fallback = '', params = {}) => {
      return getTranslation(language, path, fallback, params)
    },
    [language]
  )

  // Saved AI Learning Plan
  const [savedPlan, setSavedPlan] = useLocalStorage('guidely_plan', [
    {
      id: 'c1',
      type: 'course',
      title: 'Full-Stack Modern React & Next.js Masterclass',
      category: 'web-dev',
      price: 89,
      rating: 4.9,
      addedAt: '2026-11-18T10:00:00Z',
      notes: 'Recommended by AI for React 19 architecture'
    },
    {
      id: 's1',
      type: 'service',
      title: '1-on-1 Codebase & Architecture Audit',
      expertName: 'Alex Chen',
      category: 'web-dev',
      price: 150,
      rating: 5.0,
      addedAt: '2026-11-18T10:05:00Z',
      notes: 'Step 2: Get custom PR feedback on production repo'
    }
  ])

  // Enrolled Courses with Progress
  const [enrollments, setEnrollments] = useLocalStorage('guidely_enrollments', [
    {
      courseId: 'c1',
      title: 'Full-Stack Modern React & Next.js Masterclass',
      progress: 45,
      completedLessons: ['l1', 'l2', 'l3'],
      currentLesson: { id: 'l4', title: 'Clean Component Composition Rules' },
      enrolledAt: '2026-11-15T14:30:00Z'
    },
    {
      courseId: 'c7',
      title: 'Tailwind CSS & Modern Responsive Web Mastery',
      progress: 80,
      completedLessons: ['l1', 'l2'],
      currentLesson: { id: 'l2', title: 'State Variants: active, focus, disabled' },
      enrolledAt: '2026-11-10T09:15:00Z'
    }
  ])

  // Service & Expert Requests
  const [requests, setRequests] = useLocalStorage('guidely_requests', [
    {
      id: 'req-101',
      type: 'service',
      itemId: 's1',
      title: '1-on-1 Codebase & Architecture Audit',
      expertName: 'Alex Chen',
      packageName: 'Standard Deep Dive',
      price: 290,
      status: 'In progress', // 'Pending' | 'In progress' | 'Completed'
      requestedAt: '2026-11-17T11:20:00Z',
      scheduledDate: 'Tomorrow at 3:00 PM EST',
      notes: 'Looking for advice on Server Actions and Lighthouse LCP.'
    },
    {
      id: 'req-102',
      type: 'expert',
      itemId: 's5',
      title: 'Freelance Pitch Deck & Rate Doubling Coaching',
      expertName: 'David Kim',
      packageName: 'Basic Proposal Tear-Down',
      price: 110,
      status: 'Completed',
      requestedAt: '2026-11-12T16:00:00Z',
      scheduledDate: 'Nov 14, 2026',
      notes: 'Reviewed pricing on 3-tier proposals.'
    }
  ])

  // Chat drafts or pre-filled message (e.g. from Home search or Onboarding)
  const [pendingPrompt, setPendingPrompt] = useState('')

  // Chat history in localStorage
  const [chatHistory, setChatHistory] = useLocalStorage('guidely_chat_history', [])

  // Persistent Chat Session ID for n8n AI Agent / Simple Memory
  const [chatSessionId, setChatSessionIdState] = useLocalStorage(
    'guidely_chat_session_id',
    'guidely-session-default'
  )

  // Ensure unique session ID is initialized if empty or default
  useEffect(() => {
    if (!chatSessionId || chatSessionId === 'guidely-session-default') {
      const initialId = `guidely-sess-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`
      setChatSessionIdState(initialId)
    }
  }, [chatSessionId, setChatSessionIdState])

  const resetChatSession = useCallback(() => {
    const newSessionId = `guidely-sess-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`
    setChatSessionIdState(newSessionId)
    setChatHistory([])
    return newSessionId
  }, [setChatSessionIdState, setChatHistory])

  // Toast Notifications
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Plan Management
  const addToPlan = useCallback((item) => {
    setSavedPlan((prev) => {
      if (prev.some((p) => p.id === item.id)) {
        showToast('Already saved in your learning plan', 'info')
        return prev
      }
      showToast(`Added "${item.title || item.shortTitle}" to your plan!`, 'success')
      return [
        ...prev,
        {
          id: item.id,
          type: item.type || (item.lessonsCount ? 'course' : 'service'),
          title: item.title || item.shortTitle,
          category: item.category,
          price: item.price,
          rating: item.rating,
          addedAt: new Date().toISOString(),
          notes: item.notes || 'Saved from Guidely AI recommendation'
        }
      ]
    })
  }, [setSavedPlan, showToast])

  const removeFromPlan = useCallback((id) => {
    setSavedPlan((prev) => prev.filter((p) => p.id !== id))
    showToast('Removed item from your plan', 'info')
  }, [setSavedPlan, showToast])

  const isInPlan = useCallback((id) => {
    return savedPlan.some((p) => p.id === id)
  }, [savedPlan])

  // Enrollment Management
  const enrollCourse = useCallback((course) => {
    setEnrollments((prev) => {
      if (prev.some((e) => e.courseId === course.id)) {
        showToast('Already enrolled in this course!', 'info')
        return prev
      }
      showToast(`Successfully enrolled in ${course.shortTitle || course.title}!`, 'success')
      return [
        ...prev,
        {
          courseId: course.id,
          title: course.title,
          progress: 0,
          completedLessons: [],
          currentLesson: course.syllabus?.[0]?.lessons?.[0] || { id: 'l1', title: 'Introduction' },
          enrolledAt: new Date().toISOString()
        }
      ]
    })
  }, [setEnrollments, showToast])

  const isEnrolled = useCallback((courseId) => {
    return enrollments.some((e) => e.courseId === courseId)
  }, [enrollments])

  const updateProgress = useCallback((courseId, lessonId, percent) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.courseId === courseId) {
          const completed = e.completedLessons.includes(lessonId)
            ? e.completedLessons
            : [...e.completedLessons, lessonId]
          return {
            ...e,
            completedLessons: completed,
            progress: Math.min(100, Math.max(e.progress, percent || Math.round((completed.length / 10) * 100)))
          }
        }
        return e
      })
    )
  }, [setEnrollments])

  // Submit Request (Service or Expert Session)
  const submitRequest = useCallback(async (requestData) => {
    const webhookUrl = import.meta.env.VITE_N8N_REQUEST_WEBHOOK_URL
    const newRequest = {
      id: `req-${Date.now()}`,
      status: 'Pending',
      requestedAt: new Date().toISOString(),
      ...requestData
    }

    if (webhookUrl && webhookUrl.trim() !== '') {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRequest)
        })
      } catch (err) {
        console.warn('Request webhook failed; saving locally:', err)
      }
    }

    setRequests((prev) => [newRequest, ...prev])
    showToast('Your request has been submitted successfully!', 'success')
    return newRequest
  }, [setRequests, showToast])

  // Auth Management
  const loginUser = useCallback((userData) => {
    setUser({
      name: userData.name || 'Alex Rivera',
      email: userData.email || 'alex.rivera@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      title: 'Learner',
      language: 'English (US)',
      notifications: {
        emailAlerts: true,
        expertReplies: true,
        courseMilestones: true,
        recommendations: true
      }
    })
    showToast(`Welcome back, ${userData.name || 'Learner'}!`, 'success')
  }, [setUser, showToast])

  const logoutUser = useCallback(() => {
    setUser(null)
    showToast('Logged out of Guidely', 'info')
  }, [setUser, showToast])

  const updateSettings = useCallback(
    (newSettings) => {
      if (newSettings.language) {
        const normalized =
          newSettings.language === 'ar-IQ' || newSettings.language === 'العربية (العراق)'
            ? 'ar-IQ'
            : 'en'
        setLanguageState(normalized)
      }
      setUser((prev) => ({ ...prev, ...newSettings }))
      showToast(
        language === 'ar-IQ' ? 'تم حفظ التعديلات بنجاح!' : 'Profile and settings updated!',
        'success'
      )
    },
    [setUser, setLanguageState, showToast, language]
  )

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        setLanguage,
        toggleLanguage,
        isRtl,
        dir,
        t,
        loginUser,
        logoutUser,
        updateSettings,
        savedPlan,
        addToPlan,
        removeFromPlan,
        isInPlan,
        enrollments,
        enrollCourse,
        isEnrolled,
        updateProgress,
        requests,
        submitRequest,
        toasts,
        showToast,
        removeToast,
        pendingPrompt,
        setPendingPrompt,
        chatHistory,
        setChatHistory,
        chatSessionId,
        setChatSessionId: setChatSessionIdState,
        resetChatSession
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
