import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen, Play } from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'
import { getCourseById } from '../data/courses'
import { getExpertById } from '../data/experts'
import { useApp } from '../context/AppContext'

export function Learning() {
  const navigate = useNavigate()
  const { enrollments, isRtl, t } = useApp()

  const completedCount = enrollments.filter((e) => e.progress >= 100).length
  const inProgressCount = enrollments.length - completedCount

  return (
    <div className="min-h-dvh bg-[#0C0C0C] text-[#F5F5F5] flex flex-col pb-safe-tab">
      <AppBar
        title={t('learning.title', 'My Learning')}
        subtitle={isRtl ? `${enrollments.length} برامج مسجل بيها` : `${enrollments.length} enrolled programs`}
      />

      <main className="pt-16 px-4 space-y-4 text-start">
        {/* Metric Badges Header */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-[#3D3B30] rounded-xl p-3 border border-[#F5F5F5]/12 text-center">
            <span className="text-base font-semibold text-[#F5F5F5] block">{inProgressCount}</span>
            <span className="text-[10px] text-[#F5F5F5]/50 font-medium uppercase">
              {isRtl ? 'قيد الدراسة' : 'In Progress'}
            </span>
          </div>
          <div className="bg-[#3D3B30] rounded-xl p-3 border border-[#F5F5F5]/12 text-center">
            <span className="text-base font-semibold text-[#5A7A60] block">{completedCount}</span>
            <span className="text-[10px] text-[#F5F5F5]/50 font-medium uppercase">
              {isRtl ? 'مكتملة' : 'Completed'}
            </span>
          </div>
          <div className="bg-[#3D3B30] rounded-xl p-3 border border-[#F5F5F5]/12 text-center">
            <span className="text-base font-semibold text-[#BFA15A] block">32h</span>
            <span className="text-[10px] text-[#F5F5F5]/50 font-medium uppercase">
              {isRtl ? 'ساعات المشاهدة' : 'Total Watch'}
            </span>
          </div>
        </div>

        {/* Enrolled Courses List */}
        {enrollments.length > 0 ? (
          <div className="space-y-3.5 pt-1">
            {enrollments.map((enrollment) => {
              const course = getCourseById(enrollment.courseId)
              if (!course) return null
              const instructor = getExpertById(course.instructorId)

              return (
                <div
                  key={enrollment.courseId}
                  className="bg-[#3D3B30] rounded-2xl p-4 border border-[#F5F5F5]/12 space-y-3 text-start"
                >
                  <div className="flex gap-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 brightness-90 bg-[#27261F]"
                    />
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-medium text-[#BFA15A] uppercase tracking-wider">
                          {course.level}
                        </span>
                        <h3 className="text-xs font-semibold text-[#F5F5F5] line-clamp-2 leading-snug mt-0.5">
                          {course.title}
                        </h3>
                        <p className="text-[11px] text-[#F5F5F5]/65 mt-0.5">
                          {isRtl ? 'بإشراف: ' : 'By '}
                          {instructor?.name || 'Expert'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-medium text-[#F5F5F5]/80">
                        <span>{t('learning.progress', 'Progress')}</span>
                        <span className="text-[#BFA15A]">{enrollment.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar in Soft Gold */}
                  <div className="w-full bg-[#27261F] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#BFA15A] h-full rounded-full transition-all duration-300"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>

                  {/* Current Lesson snippet & Action CTA */}
                  <div className="pt-2 border-t border-[#F5F5F5]/10 flex items-center justify-between">
                    <div className="min-w-0 pe-2">
                      <span className="text-[10px] text-[#F5F5F5]/50 block font-medium">
                        {isRtl ? 'الدرس القادم' : 'Next Lesson'}
                      </span>
                      <p className="text-xs font-medium text-[#F5F5F5] truncate">
                        {enrollment.currentLesson?.title || (isRtl ? 'الدرس قيد المتابعة' : 'Lesson in progress')}
                      </p>
                    </div>

                    <Link to={`/learn/${course.id}`} className="shrink-0">
                      <Button
                        size="sm"
                        variant="primary"
                        iconRight={() => (
                          <Play className={`w-3.5 h-3.5 fill-current shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                        )}
                      >
                        {t('learning.continueBtn', 'Resume')}
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title={t('learning.noEnrollments', 'No active enrollments yet')}
            description={t(
              'learning.noEnrollmentsDesc',
              'Browse the catalog and start learning today.'
            )}
            actionLabel={t('learning.exploreCoursesBtn', 'Explore Courses')}
            onAction={() => navigate('/explore')}
          />
        )}
      </main>
    </div>
  )
}
