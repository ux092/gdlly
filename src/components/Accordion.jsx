import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion({ items = [], allowMultiple = false, className = '' }) {
  const [openIds, setOpenIds] = useState(() => {
    // Open the first item by default if any
    return items.length > 0 ? [items[0].id] : []
  })

  const toggle = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)

        return (
          <div
            key={item.id}
            className="bg-[#3D3B30] rounded-2xl border border-[#F5F5F5]/12 overflow-hidden transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full p-4 flex items-center justify-between text-start active:bg-[#4E4B3E] transition-colors min-h-[48px]"
            >
              <div className="pe-3">
                <span className="text-sm font-semibold text-[#F5F5F5] block leading-snug">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-xs text-[#F5F5F5]/65 font-normal mt-0.5 block">
                    {item.subtitle}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#F5F5F5]/50 stroke-[1.5] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180 text-[#BFA15A]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-[#F5F5F5]/10 text-xs text-[#F5F5F5]/85 leading-relaxed">
                {typeof item.content === 'function' ? item.content() : item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
