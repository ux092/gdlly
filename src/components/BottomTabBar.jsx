import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Compass, BookOpen, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function BottomTabBar() {
  const location = useLocation()
  const { t } = useApp()
  const pathname = location.pathname

  // Hide tab bar on specific screens per mobile-only requirements
  const isHidden =
    pathname.startsWith('/consultant') ||
    pathname.startsWith('/learn/') ||
    pathname.startsWith('/enroll/') ||
    pathname.startsWith('/onboarding') ||
    pathname === '/login'

  if (isHidden) {
    return null
  }

  const tabs = [
    { key: 'home', name: t('nav.home', 'Home'), path: '/', icon: Home },
    { key: 'explore', name: t('nav.explore', 'Explore'), path: '/explore', icon: Compass },
    { key: 'ai', name: t('nav.askAi', 'Ask AI'), path: '/consultant', isAI: true },
    { key: 'learning', name: t('nav.learning', 'Learning'), path: '/learning', icon: BookOpen },
    { key: 'profile', name: t('nav.profile', 'Profile'), path: '/profile', icon: User }
  ]

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none"
    >
      <div className="max-w-[430px] mx-auto pointer-events-auto px-4 pb-safe pt-1">
        <div className="bg-[#0C0C0C] border border-[#F5F5F5]/12 rounded-2xl flex items-center justify-around h-16 px-1">
          {tabs.map((tab) => {
            if (tab.isAI) {
              return (
                <NavLink
                  key={tab.key}
                  to={tab.path}
                  className="flex flex-col items-center justify-center -mt-5 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#BFA15A] text-[#0C0C0C] flex items-center justify-center border-2 border-[#0C0C0C] active:scale-95 transition-transform duration-150">
                    <span className="font-bold text-xs tracking-tight">AI</span>
                  </div>
                  <span className="text-[10px] font-medium text-[#BFA15A] tracking-tight mt-0.5">
                    {tab.name}
                  </span>
                </NavLink>
              )
            }

            const Icon = tab.icon

            return (
              <NavLink
                key={tab.key}
                to={tab.path}
                end={tab.path === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-14 h-13 rounded-xl active:bg-[#3D3B30] transition-colors ${
                    isActive ? 'text-[#BFA15A] font-medium' : 'text-[#F5F5F5]/65 font-normal hover:text-[#F5F5F5]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-6 h-6 stroke-[1.5] transition-colors ${
                        isActive ? 'text-[#BFA15A]' : 'text-[#F5F5F5]/65'
                      }`}
                    />
                    <span className="text-[10px] mt-1 tracking-tight truncate max-w-[58px] text-center">
                      {tab.name}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
