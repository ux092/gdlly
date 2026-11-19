import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Explore } from './pages/Explore'
import { CourseDetail } from './pages/CourseDetail'
import { ServiceDetail } from './pages/ServiceDetail'
import { ExpertProfile } from './pages/ExpertProfile'
import { Consultant } from './pages/Consultant'
import { SavedPlan } from './pages/SavedPlan'
import { Onboarding } from './pages/Onboarding'
import { Learning } from './pages/Learning'
import { CoursePlayer } from './pages/CoursePlayer'
import { Requests } from './pages/Requests'
import { Profile } from './pages/Profile'
import { Enroll } from './pages/Enroll'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { BottomTabBar } from './components/BottomTabBar'
import { Toast } from './components/Toast'

export default function App() {
  return (
    /* Outer viewport container: Centers phone-sized shell on wider screens */
    <div className="min-h-dvh w-full bg-black flex justify-center items-stretch antialiased selection:bg-[#BFA15A] selection:text-[#0C0C0C]">
      <div className="w-full max-w-[430px] min-h-dvh bg-[#0C0C0C] text-[#F5F5F5] relative flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-x-hidden border-x border-[#F5F5F5]/10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/experts/:id" element={<ExpertProfile />} />
          <Route path="/consultant" element={<Consultant />} />
          <Route path="/plan" element={<SavedPlan />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learn/:courseId" element={<CoursePlayer />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Navigate to="/profile" replace />} />
          <Route path="/enroll/:type/:id" element={<Enroll />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Global Bottom Tab Bar (hides automatically on specific routes) */}
        <BottomTabBar />

        {/* Global Action Toast System */}
        <Toast />
      </div>
    </div>
  )
}
