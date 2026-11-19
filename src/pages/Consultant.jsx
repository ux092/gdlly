import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Send,
  Plus,
  ArrowDown,
  WifiOff,
  AlertTriangle,
  RotateCw,
  FileText,
  ArrowRight
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { ChatBubble } from '../components/ChatBubble'
import { BottomSheet } from '../components/BottomSheet'
import { sendMessage } from '../services/aiService'
import { useApp } from '../context/AppContext'

export function Consultant() {
  const navigate = useNavigate()
  const { chatHistory, setChatHistory, pendingPrompt, setPendingPrompt, t, isRtl } = useApp()

  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFailedMessage, setLastFailedMessage] = useState(null)
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false)
  const [isSourcesSheetOpen, setIsSourcesSheetOpen] = useState(false)
  const [showScrollBottom, setShowScrollBottom] = useState(false)

  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const defaultStarterChips = [
    'How do I master React 19 & Next.js?',
    'I want to double my freelance consulting rates',
    'How can I automate customer workflows with AI agents?',
    'Audit my mobile app design system'
  ]

  const starterChips = t('consultant.starters') || defaultStarterChips

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Auto-scroll helper
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

  // Handle scroll detection for "Scroll to bottom" button
  const handleScroll = () => {
    if (!chatContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120
    setShowScrollBottom(!isNearBottom && chatHistory.length > 2)
  }

  // Core Send handler defined before usage
  const handleSend = useCallback(async (messageText) => {
    const text = (messageText || inputMessage).trim()
    if (!text || loading) return

    setInputMessage('')
    setError(null)
    setLastFailedMessage(null)

    const userMsg = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    }

    setChatHistory((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const updatedHistory = [...chatHistory, userMsg]
      const response = await sendMessage(text, updatedHistory, 'guidely-session-1')

      const assistantMsg = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: response.answer,
        answer: response.answer,
        sources: response.sources || [],
        recommendations: response.recommendations || [],
        followups: response.followups || [],
        timestamp: new Date().toISOString()
      }

      setChatHistory((prev) => [...prev, assistantMsg])
    } catch (err) {
      console.error('AI chat failed:', err)
      setError(err.message || 'Failed to reach AI consultant. Please try again.')
      setLastFailedMessage(text)
    } finally {
      setLoading(false)
    }
  }, [inputMessage, loading, chatHistory, setChatHistory])

  // Handle pendingPrompt sent from Home or Course Detail
  useEffect(() => {
    if (pendingPrompt && pendingPrompt.trim()) {
      const promptToRun = pendingPrompt
      const timer = setTimeout(() => {
        setPendingPrompt('')
        handleSend(promptToRun)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [pendingPrompt, setPendingPrompt, handleSend])

  useEffect(() => {
    scrollToBottom('auto')
  }, [chatHistory, loading, scrollToBottom])

  // Clear / New Chat
  const handleNewChat = () => {
    setChatHistory([])
    setError(null)
    setLastFailedMessage(null)
  }

  // Talk to Expert Handoff
  const handleExpertHandoff = (summary) => {
    navigate('/enroll/expert/session', {
      state: { chatSummary: summary || 'User inquiry from AI Consultant' }
    })
  }

  // Collect all unique sources from current chat history for the Sources sheet
  const allSources = chatHistory
    .filter((m) => m.role === 'assistant' && m.sources && m.sources.length > 0)
    .flatMap((m) => m.sources)
    .filter((s, index, self) => index === self.findIndex((t) => t.title === s.title))

  // Find latest followups from last assistant message
  const lastAssistantMessage = [...chatHistory].reverse().find((m) => m.role === 'assistant')
  const activeFollowups = lastAssistantMessage?.followups || []

  return (
    <div className="h-dvh bg-[#0C0C0C] text-[#F5F5F5] flex flex-col overflow-hidden">
      {/* Top App Bar */}
      <AppBar
        showBack
        title={t('consultant.title')}
        subtitle={t('consultant.subtitle')}
        actions={
          <div className="flex items-center gap-1">
            {allSources.length > 0 && (
              <button
                onClick={() => setIsSourcesSheetOpen(true)}
                aria-label="View sources"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[#F5F5F5] active:bg-[#3D3B30] transition-colors"
                title={t('consultant.sourcesCited')}
              >
                <FileText className="w-4 h-4 text-[#BFA15A]" />
              </button>
            )}
            <button
              onClick={handleNewChat}
              aria-label={t('consultant.newChat')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 text-xs font-medium text-[#F5F5F5] active:bg-[#4E4B3E] transition-colors"
            >
              <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{t('consultant.newChat')}</span>
            </button>
          </div>
        }
      />

      {/* Offline Status Alert Banner */}
      {isOffline && (
        <div className="mt-14 bg-[#27261F] border-b border-[#A68A56]/40 text-[#A68A56] px-4 py-2 text-xs font-medium flex items-center justify-center gap-2 shrink-0 z-20">
          <WifiOff className="w-4 h-4 shrink-0 stroke-[1.5]" />
          <span>{t('consultant.offlineError')}</span>
        </div>
      )}

      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar ${
          isOffline ? 'pt-2' : 'pt-16'
        }`}
      >
        {/* Empty State - Restrained Editorial Typography */}
        {chatHistory.length === 0 && !loading && (
          <div className="pt-8 pb-4 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#3D3B30] border border-[#BFA15A]/60 text-[#BFA15A] flex items-center justify-center font-bold text-base mb-3">
              AI
            </div>
            <h2 className="text-lg font-semibold text-[#F5F5F5] tracking-tight">
              {t('consultant.title')}
            </h2>
            <p className="text-xs text-[#F5F5F5]/65 mt-1 max-w-[280px] leading-relaxed">
              {t('consultant.emptySubtitle')}
            </p>

            {/* 4 Starter Chips */}
            <div className="mt-6 w-full max-w-sm space-y-2 text-start">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#F5F5F5]/50 block ms-1">
                {t('consultant.starterTitle')}
              </span>
              {Array.isArray(starterChips) && starterChips.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="w-full p-3 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 text-xs font-normal text-[#F5F5F5] text-start active:bg-[#4E4B3E] hover:border-[#BFA15A]/40 transition-colors flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <ArrowRight className={`w-3.5 h-3.5 text-[#BFA15A] shrink-0 opacity-60 group-hover:opacity-100 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        {chatHistory.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            onFollowupClick={(fText) => handleSend(fText)}
            onSelectHandoff={handleExpertHandoff}
          />
        ))}

        {/* Loading Indicator ("Searching knowledge base...") */}
        {loading && (
          <div className="flex items-start gap-2.5 mb-4 animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-full border border-[#BFA15A] bg-[#3D3B30] text-[#BFA15A] flex items-center justify-center shrink-0 font-bold text-xs mt-1">
              AI
            </div>
            <div className={`bg-[#3D3B30] border border-[#F5F5F5]/12 rounded-2xl ${isRtl ? 'rounded-tr-xs' : 'rounded-tl-xs'} p-3.5 max-w-[85%]`}>
              <div className="flex items-center gap-2 text-xs font-medium text-[#BFA15A]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#BFA15A] animate-ping" />
                <span>{t('consultant.searching')}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 ms-4">
                <span className="w-2 h-2 rounded-full bg-[#BFA15A] animate-typing-1" />
                <span className="w-2 h-2 rounded-full bg-[#BFA15A] animate-typing-2" />
                <span className="w-2 h-2 rounded-full bg-[#BFA15A] animate-typing-3" />
              </div>
            </div>
          </div>
        )}

        {/* Error / Timeout State with Retry Button */}
        {error && (
          <div className="bg-[#27261F] border border-[#995252]/40 rounded-2xl p-4 text-xs text-[#E08585] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#995252] shrink-0 mt-0.5 stroke-[1.5]" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#F5F5F5]">{t('consultant.requestFailed')}</p>
              <p className="text-[11px] text-[#E08585] mt-0.5">{error}</p>
              {lastFailedMessage && (
                <button
                  type="button"
                  onClick={() => handleSend(lastFailedMessage)}
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#995252]/30 text-[#F5F5F5] border border-[#995252]/60 font-semibold text-xs active:bg-[#995252]/50 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>{t('consultant.retryMessage')}</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom('smooth')}
          aria-label={t('consultant.scrollBottom')}
          className="fixed bottom-24 end-5 z-20 w-10 h-10 rounded-xl bg-[#3D3B30] text-[#BFA15A] border border-[#F5F5F5]/12 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowDown className="w-5 h-5 stroke-[1.5]" />
        </button>
      )}

      {/* Horizontally scrollable follow-up chips above input bar */}
      {activeFollowups.length > 0 && !loading && (
        <div className="px-4 py-1.5 bg-[#0C0C0C] border-t border-[#F5F5F5]/10 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {activeFollowups.map((followup, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(followup)}
              className="shrink-0 text-xs text-[#F5F5F5] bg-[#3D3B30] border border-[#F5F5F5]/12 rounded-xl px-3 py-1.5 active:bg-[#4E4B3E] transition-colors"
            >
              {followup}
            </button>
          ))}
        </div>
      )}

      {/* Fixed Chat Input Bar */}
      <div className="bg-[#0C0C0C] border-t border-[#F5F5F5]/12 p-3 pb-safe shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t('consultant.inputPlaceholder')}
              disabled={loading}
              className="w-full min-h-[44px] bg-[#3D3B30] border border-[#F5F5F5]/12 rounded-xl px-4 py-2 text-base text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:outline-none focus:border-[#BFA15A] transition-all text-start"
            />
          </div>

          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            aria-label={t('consultant.send')}
            className="w-11 h-11 rounded-xl bg-[#BFA15A] text-[#0C0C0C] flex items-center justify-center active:scale-95 disabled:opacity-30 transition-all cursor-pointer shrink-0 font-bold"
          >
            <Send className={`w-4 h-4 stroke-[1.8] ${isRtl ? 'rotate-180 -mr-0.5' : 'ml-0.5'}`} />
          </button>
        </form>
      </div>

      {/* Sources Bottom Sheet */}
      <BottomSheet
        isOpen={isSourcesSheetOpen}
        onClose={() => setIsSourcesSheetOpen(false)}
        title={t('consultant.sourcesCited')}
        subtitle={t('consultant.sourcesCitedSubtitle')}
      >
        <div className="space-y-2">
          {allSources.length > 0 ? (
            allSources.map((source, index) => (
              <div
                key={index}
                onClick={() => {
                  setIsSourcesSheetOpen(false)
                  if (source.link) navigate(source.link)
                }}
                className="p-3 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 flex items-center justify-between cursor-pointer active:bg-[#4E4B3E] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 pe-2">
                  <FileText className="w-4 h-4 text-[#BFA15A] shrink-0 stroke-[1.5]" />
                  <span className="text-xs font-semibold text-[#F5F5F5] truncate">
                    {source.title}
                  </span>
                </div>
                <span className="text-xs font-medium text-[#BFA15A] shrink-0">
                  {t('consultant.view')}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#F5F5F5]/40 text-center py-4">
              {t('consultant.noSourcesCited')}
            </p>
          )}
        </div>
      </BottomSheet>
    </div>
  )
}
