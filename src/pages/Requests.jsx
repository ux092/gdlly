import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  MessageSquare,
  Inbox
} from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { Tabs } from '../components/Tabs'
import { EmptyState } from '../components/EmptyState'
import { Badge } from '../components/Badge'
import { useApp } from '../context/AppContext'

export function Requests() {
  const navigate = useNavigate()
  const { requests, showToast, isRtl, t } = useApp()
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'Pending' | 'In progress' | 'Completed'

  const filterTabs = [
    { id: 'all', label: isRtl ? 'الكل' : 'All', count: requests.length },
    {
      id: 'Pending',
      label: isRtl ? 'قيد المراجعة' : 'Pending',
      count: requests.filter((r) => r.status === 'Pending').length
    },
    {
      id: 'In progress',
      label: isRtl ? 'قيد التنفيذ' : 'Active',
      count: requests.filter((r) => r.status === 'In progress').length
    },
    {
      id: 'Completed',
      label: isRtl ? 'مكتمل' : 'Done',
      count: requests.filter((r) => r.status === 'Completed').length
    }
  ]

  const filteredRequests = requests.filter((r) => {
    if (statusFilter === 'all') return true
    return r.status === statusFilter
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="warning">{isRtl ? '⏳ قيد مراجعة الخبير' : '⏳ Pending Expert Confirmation'}</Badge>
      case 'In progress':
        return <Badge variant="indigo">{isRtl ? '⚡ قيد التنفيذ والمتابعة' : '⚡ Work In Progress'}</Badge>
      case 'Completed':
        return <Badge variant="success">{isRtl ? '✓ تم إنجاز الجلسة' : '✓ Completed'}</Badge>
      default:
        return <Badge variant="neutral">{status}</Badge>
    }
  }

  return (
    <div className="min-h-dvh bg-[#0C0C0C] text-[#F5F5F5] flex flex-col pb-safe-tab">
      <AppBar
        title={t('requests.title', 'My Requests')}
        subtitle={isRtl ? 'جلسات الاستشارة والتدقيق المباشر' : '1-on-1 audits & consulting sessions'}
      />

      <main className="pt-16 px-4 space-y-4 text-start">
        {/* Status Segmented Filter */}
        <div className="pt-1">
          <Tabs tabs={filterTabs} activeTab={statusFilter} onChange={setStatusFilter} />
        </div>

        {/* Request Cards List */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-3.5">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 space-y-3 text-start"
              >
                {/* Header status + price */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(req.status)}
                  <span className="text-sm font-semibold text-[#BFA15A]">
                    ${req.price || 150}
                  </span>
                </div>

                {/* Title & Expert */}
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F5F5] leading-snug">
                    {req.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#F5F5F5]/65 mt-1">
                    <span className="font-medium text-[#BFA15A]">
                      {isRtl ? 'الخبير: ' : 'Expert: '}
                      {req.expertName || (isRtl ? 'خبير معتمد' : 'Verified Expert')}
                    </span>
                    <span>•</span>
                    <span className="text-[#F5F5F5]/50">
                      {req.packageName || (isRtl ? 'جلسة قياسية' : 'Standard Session')}
                    </span>
                  </div>
                </div>

                {/* Notes or timeline */}
                {req.notes && (
                  <p className="text-xs text-[#F5F5F5]/85 bg-[#27261F] rounded-xl p-2.5 border border-[#F5F5F5]/10 leading-relaxed text-start">
                    📝 "{req.notes}"
                  </p>
                )}

                {/* Footer metadata & action */}
                <div className="pt-2.5 border-t border-[#F5F5F5]/10 flex items-center justify-between text-xs text-[#F5F5F5]/50">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#F5F5F5]/50 stroke-[1.5]" />
                    <span>
                      {req.scheduledDate ||
                        `${isRtl ? 'تاريخ الطلب: ' : 'Requested '} ${new Date(req.requestedAt).toLocaleDateString()}`}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      showToast(
                        isRtl
                          ? `قناة التواصل مفتوحة ويا الخبير ${req.expertName || ''}`
                          : `Messaging channel with ${req.expertName || 'Expert'} is open`,
                        'info'
                      )
                    }
                    className="flex items-center gap-1 text-xs font-medium text-[#BFA15A] hover:underline cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>{isRtl ? 'مراسلة' : 'Chat'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Inbox}
            title={t('requests.empty', 'No booking requests yet')}
            description={t(
              'requests.emptyDesc',
              'When you book a strategy session or codebase audit, track its status here.'
            )}
            actionLabel={isRtl ? 'تصفح خدمات واستشارات الخبراء' : 'Browse Expert Services'}
            onAction={() => navigate('/explore?tab=services')}
          />
        )}
      </main>
    </div>
  )
}
