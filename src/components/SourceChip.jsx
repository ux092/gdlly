import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, ArrowUpRight } from 'lucide-react'

export function SourceChip({ source }) {
  if (!source || !source.title) return null

  return (
    <Link
      to={source.link || '#'}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#27261F] border border-[#F5F5F5]/12 text-[11px] font-normal text-[#F5F5F5] active:bg-[#4E4B3E] transition-colors shrink-0 max-w-[260px]"
    >
      <FileText className="w-3 h-3 text-[#BFA15A] shrink-0 stroke-[1.5]" />
      <span className="truncate">{source.title}</span>
      <ArrowUpRight className="w-3 h-3 text-[#F5F5F5]/50 shrink-0 rtl:scale-x-[-1] transition-transform stroke-[1.5]" />
    </Link>
  )
}
