import React, { useState } from 'react'
import { ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'
import { SourceChip } from './SourceChip'
import { RecommendationCard } from './RecommendationCard'
import { useApp } from '../context/AppContext'

export function ChatBubble({
  message,
  onFollowupClick,
  onSelectHandoff,
  className = ''
}) {
  const { isRtl, t } = useApp()
  const isUser = message.role === 'user'
  const [feedback, setFeedback] = useState(message.feedback || null) // 'up' | 'down' | null

  if (isUser) {
    return (
      <div className={`flex justify-end mb-4 ${className}`}>
        <div
          className={`max-w-[85%] bg-[#F5F5F5] text-[#0C0C0C] rounded-2xl ${
            isRtl ? 'rounded-tl-xs' : 'rounded-tr-xs'
          } px-4 py-3 text-start`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <span className="block text-[10px] text-[#0C0C0C]/65 text-end mt-1 font-medium">
            {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
          </span>
        </div>
      </div>
    )
  }

  // Assistant Message
  const { answer, sources = [], recommendations = [], followups = [] } = message

  return (
    <div className={`flex items-start gap-2.5 mb-5 ${className}`}>
      {/* AI Monogram Avatar: thin gold circle with "AI" */}
      <div className="w-8 h-8 rounded-full border border-[#BFA15A] bg-[#3D3B30] text-[#BFA15A] flex items-center justify-center shrink-0 font-bold text-xs mt-1">
        AI
      </div>

      <div className="flex-1 min-w-0 text-start">
        {/* Main AI Bubble: Olive Shadow with 1px Soft Gold hairline on leading edge */}
        <div
          className={`bg-[#3D3B30] border border-[#F5F5F5]/10 ${
            isRtl ? 'border-r-2 border-r-[#BFA15A] rounded-tr-xs' : 'border-l-2 border-l-[#BFA15A] rounded-tl-xs'
          } rounded-2xl p-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#BFA15A]">
              {t('consultant.title', 'Guidely Intelligence')}
            </span>
            <span className="text-[10px] text-[#F5F5F5]/40">
              {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
            </span>
          </div>

          <p className="text-sm text-[#F5F5F5] leading-relaxed whitespace-pre-wrap font-normal">
            {answer || message.content}
          </p>

          {/* Sources Section */}
          {sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#F5F5F5]/10">
              <span className="text-[11px] font-medium text-[#F5F5F5]/65 block mb-1.5">
                {t('consultant.sourcesTitle', 'Based on verified catalog knowledge:')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sources.map((src, i) => (
                  <SourceChip key={i} source={src} />
                ))}
              </div>
            </div>
          )}

          {/* Feedback & Actions */}
          <div className="mt-3 pt-2.5 border-t border-[#F5F5F5]/10 flex items-center justify-between text-xs text-[#F5F5F5]/50">
            <span className="text-[11px]">{t('consultant.helpfulPrompt', 'Was this advice helpful?')}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFeedback('up')}
                aria-label="Thumbs up"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  feedback === 'up'
                    ? 'bg-[#BFA15A]/20 text-[#BFA15A] font-bold'
                    : 'text-[#F5F5F5]/50 hover:text-[#F5F5F5] active:bg-[#4E4B3E]'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
              <button
                onClick={() => setFeedback('down')}
                aria-label="Thumbs down"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  feedback === 'down'
                    ? 'bg-[#995252]/20 text-[#E08585] font-bold'
                    : 'text-[#F5F5F5]/50 hover:text-[#F5F5F5] active:bg-[#4E4B3E]'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Inline Horizontal Swipeable Recommendation Cards */}
        {recommendations.length > 0 && (
          <div className="mt-3">
            <span className="text-xs font-semibold text-[#F5F5F5] ms-1 block mb-2">
              {t('consultant.recommendedForGoal', 'Recommended for your goal:')}
            </span>
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 snap-x -mx-2 px-2">
              {recommendations.map((rec, i) => (
                <div key={i} className="snap-start shrink-0">
                  <RecommendationCard recommendation={rec} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expert Handoff Card */}
        <div className="mt-3 bg-[#27261F] border border-[#F5F5F5]/12 text-[#F5F5F5] rounded-2xl p-3.5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-[#F5F5F5]">
              {t('consultant.expertHandoffTitle', 'Not sure? Talk to a verified expert')}
            </h4>
            <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5 line-clamp-1">
              {t('consultant.expertHandoffDesc', 'Book a live 1-on-1 strategy session with attached chat context.')}
            </p>
          </div>
          <button
            onClick={() => {
              if (onSelectHandoff) {
                onSelectHandoff(answer || message.content)
              }
            }}
            className="shrink-0 bg-[#BFA15A] text-[#0C0C0C] text-xs font-semibold px-3 py-2 rounded-xl active:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
          >
            <span>{t('consultant.bookExpertBtn', 'Book Expert')}</span>
            <ArrowRight className={`w-3.5 h-3.5 stroke-[1.5] transition-transform ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Followup Chips */}
        {followups.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {followups.map((f, i) => (
              <button
                key={i}
                onClick={() => onFollowupClick && onFollowupClick(f)}
                className="shrink-0 text-xs font-normal text-[#F5F5F5] bg-[#3D3B30] border border-[#F5F5F5]/12 rounded-xl px-3.5 py-1.5 active:bg-[#4E4B3E] transition-colors cursor-pointer"
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
