import React from 'react'

export function Tabs({
  tabs, // [{ id, label, icon: Icon, count }]
  activeTab,
  onChange,
  className = ''
}) {
  return (
    <div
      role="tablist"
      className={`flex items-center p-1 bg-[#27261F] rounded-xl border border-[#F5F5F5]/10 select-none ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all min-h-[38px] active:scale-[0.98] ${
              isActive
                ? 'bg-[#3D3B30] text-[#F5F5F5] border border-[#F5F5F5]/12'
                : 'text-[#F5F5F5]/65 hover:text-[#F5F5F5]'
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5 stroke-[1.5]" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`ms-1 text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
                  isActive ? 'bg-[#BFA15A] text-[#0C0C0C]' : 'bg-[#3D3B30] text-[#F5F5F5]/65'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
