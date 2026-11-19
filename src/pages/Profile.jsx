import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Inbox,
  LogOut,
  ChevronRight,
  RotateCcw,
  Bookmark
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'

export function Profile() {
  const navigate = useNavigate()
  const { user, updateSettings, logoutUser, savedPlan, requests, isRtl, setLanguage: setAppLang, t } = useApp()

  const [name, setName] = useState(user?.name || 'علي الحسني')
  const [email, setEmail] = useState(user?.email || 'ali@example.com')
  const [language, setLanguage] = useState(user?.language || 'ar-IQ')
  const [notifications, setNotifications] = useState(
    user?.notifications || {
      emailAlerts: true,
      expertReplies: true,
      courseMilestones: true,
      recommendations: true
    }
  )

  const handleSave = (e) => {
    e.preventDefault()
    updateSettings({
      name,
      email,
      language,
      notifications
    })
  }

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  const notificationItems = [
    {
      key: 'emailAlerts',
      title: t('profile.emailAlerts', 'Email Announcements'),
      desc: t('profile.emailAlertsDesc', 'New courses and platform updates')
    },
    {
      key: 'expertReplies',
      title: t('profile.expertReplies', 'Expert Replies'),
      desc: t('profile.expertRepliesDesc', 'Real-time booking and audit notifications')
    },
    {
      key: 'courseMilestones',
      title: t('profile.courseMilestones', 'Course Milestones'),
      desc: t('profile.courseMilestonesDesc', 'Progress reminders and certificate alerts')
    },
    {
      key: 'recommendations',
      title: t('profile.aiRecs', 'AI Recommendations'),
      desc: t('profile.aiRecsDesc', 'Weekly suggested courses for your goals')
    }
  ]

  return (
    <div className="min-h-dvh bg-[#0C0C0C] text-[#F5F5F5] flex flex-col pb-safe-tab">
      <AppBar title={t('profile.title', 'Profile & Settings')} />

      <main className="pt-16 px-4 space-y-4 text-start">
        {/* Profile Card Header */}
        <div className="bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 flex items-center gap-3.5">
          <img
            src={
              user?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            }
            alt={name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#BFA15A] shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-[#F5F5F5] truncate">{name}</h2>
            <p className="text-xs text-[#F5F5F5]/65 truncate">{email}</p>
            <span className="inline-block mt-1 text-[10px] font-medium text-[#BFA15A] bg-[#27261F] px-2 py-0.5 rounded-md border border-[#F5F5F5]/10">
              {t('profile.memberBadge', 'Guidely Member')}
            </span>
          </div>
        </div>

        {/* Shortcuts Section */}
        <div className="bg-[#3D3B30] rounded-2xl border border-[#F5F5F5]/12 divide-y divide-[#F5F5F5]/10 overflow-hidden">
          <Link
            to="/plan"
            className="p-3.5 flex items-center justify-between active:bg-[#4E4B3E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#27261F] text-[#BFA15A] flex items-center justify-center shrink-0 border border-[#F5F5F5]/10">
                <Bookmark className="w-4 h-4 stroke-[1.5]" />
              </div>
              <span className="text-xs font-semibold text-[#F5F5F5]">
                {t('profile.savedPlanShortcut', 'Saved AI Learning Plan')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#F5F5F5]/65">
              <span className="font-medium text-[#BFA15A]">
                {savedPlan.length} {isRtl ? 'عناصر' : 'items'}
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            </div>
          </Link>

          <Link
            to="/requests"
            className="p-3.5 flex items-center justify-between active:bg-[#4E4B3E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#27261F] text-[#F5F5F5] flex items-center justify-center shrink-0 border border-[#F5F5F5]/10">
                <Inbox className="w-4 h-4 stroke-[1.5]" />
              </div>
              <span className="text-xs font-semibold text-[#F5F5F5]">
                {t('profile.requestsShortcut', 'My Expert Requests')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#F5F5F5]/65">
              <span className="font-medium text-[#BFA15A]">
                {requests.length} {isRtl ? 'طلبات' : 'requests'}
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
            </div>
          </Link>

          <Link
            to="/onboarding"
            className="p-3.5 flex items-center justify-between active:bg-[#4E4B3E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#27261F] text-[#F5F5F5] flex items-center justify-center shrink-0 border border-[#F5F5F5]/10">
                <RotateCcw className="w-4 h-4 stroke-[1.5]" />
              </div>
              <span className="text-xs font-semibold text-[#F5F5F5]">
                {t('profile.retakeOnboarding', 'Retake AI Onboarding')}
              </span>
            </div>
            <ChevronRight className={`w-4 h-4 text-[#F5F5F5]/40 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Profile Settings Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 space-y-3.5">
            <h3 className="text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider">
              {t('profile.accountDetails', 'Account Details')}
            </h3>

            <Input
              label={t('profile.fullName', 'Full Name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label={t('profile.email', 'Email Address')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider mb-1.5">
                {t('profile.preferredLanguage', 'Preferred Language')}
              </label>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  setAppLang(e.target.value)
                }}
                className="w-full min-h-[44px] rounded-xl bg-[#27261F] border border-[#F5F5F5]/12 px-3.5 py-2.5 text-base text-[#F5F5F5] focus:outline-none focus:border-[#BFA15A] cursor-pointer"
              >
                <option value="ar-IQ">العربية (العراق) — Iraqi Arabic</option>
                <option value="en">English (US)</option>
              </select>
            </div>
          </div>

          {/* Notifications Toggles */}
          <div className="bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 space-y-3">
            <h3 className="text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider">
              {t('profile.notifications', 'Notification Preferences')}
            </h3>

            {notificationItems.map((pref) => (
              <div key={pref.key} className="flex items-center justify-between py-1.5">
                <div className="pe-3">
                  <p className="text-xs font-medium text-[#F5F5F5]">{pref.title}</p>
                  <p className="text-[11px] text-[#F5F5F5]/65">{pref.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleNotification(pref.key)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
                    notifications[pref.key] ? 'bg-[#BFA15A]' : 'bg-[#27261F]'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full ${
                      notifications[pref.key] ? 'bg-[#0C0C0C]' : 'bg-[#F5F5F5]/50'
                    } transition-transform transform ${
                      notifications[pref.key]
                        ? isRtl
                          ? '-translate-x-5'
                          : 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Save Button (The ONE Primary Gold Button) */}
          <Button type="submit" variant="primary" size="md" fullWidth>
            {t('profile.saveProfileBtn', 'Save Profile & Preferences')}
          </Button>
        </form>

        {/* Logout Button */}
        <div className="pt-2">
          <Button
            variant="danger"
            size="md"
            fullWidth
            icon={LogOut}
            onClick={handleLogout}
          >
            {t('profile.logoutBtn', 'Log Out of Guidely')}
          </Button>
        </div>
      </main>
    </div>
  )
}
