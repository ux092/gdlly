import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react'
import { AppBar } from '../components/AppBar'
import { Tabs } from '../components/Tabs'
import { CourseCard } from '../components/CourseCard'
import { ServiceCard } from '../components/ServiceCard'
import { BottomSheet } from '../components/BottomSheet'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'
import { courses } from '../data/courses'
import { services } from '../data/services'
import { categories } from '../data/categories'
import { useApp } from '../context/AppContext'

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'services' ? 'services' : 'courses'
  const initialCat = searchParams.get('cat') || 'all'

  const { isRtl, t } = useApp()
  const [activeTab, setActiveTab] = useState(initialTab) // 'courses' | 'services'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState(initialCat)
  const [selectedLevel, setSelectedLevel] = useState('all') // 'all' | 'Beginner' | 'Intermediate' | 'Advanced'
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState(250)
  const [sortBy, setSortBy] = useState('popular') // 'popular' | 'rating' | 'price-asc' | 'price-desc'

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const tabItems = [
    { id: 'courses', label: t('explore.courses', 'Courses'), count: courses.length },
    { id: 'services', label: t('explore.services', '1-on-1 Services'), count: services.length }
  ]

  // Track how many non-default filters are active
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCat !== 'all') count++
    if (selectedLevel !== 'all') count++
    if (minRating > 0) count++
    if (maxPrice < 250) count++
    if (sortBy !== 'popular') count++
    return count
  }, [selectedCat, selectedLevel, minRating, maxPrice, sortBy])

  const resetFilters = () => {
    setSelectedCat('all')
    setSelectedLevel('all')
    setMinRating(0)
    setMaxPrice(250)
    setSortBy('popular')
  }

  // Filter & sort logic
  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchTitle = c.title.toLowerCase().includes(q)
          const matchOverview = c.overview.toLowerCase().includes(q)
          if (!matchTitle && !matchOverview) return false
        }
        if (selectedCat !== 'all' && c.category !== selectedCat) return false
        if (selectedLevel !== 'all' && c.level !== selectedLevel) return false
        if (minRating > 0 && c.rating < minRating) return false
        if (c.price > maxPrice) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        return b.reviewCount - a.reviewCount // popular
      })
  }, [searchQuery, selectedCat, selectedLevel, minRating, maxPrice, sortBy])

  const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchTitle = s.title.toLowerCase().includes(q)
          const matchDesc = s.description.toLowerCase().includes(q)
          if (!matchTitle && !matchDesc) return false
        }
        if (selectedCat !== 'all' && s.category !== selectedCat) return false
        if (minRating > 0 && s.rating < minRating) return false
        if (s.price > maxPrice) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        return b.reviewCount - a.reviewCount
      })
  }, [searchQuery, selectedCat, minRating, maxPrice, sortBy])

  const currentList = activeTab === 'courses' ? filteredCourses : filteredServices

  return (
    <div className="min-h-dvh bg-[#0C0C0C] text-[#F5F5F5] flex flex-col pb-safe-tab">
      <AppBar
        title={t('explore.title', 'Explore & Search')}
        subtitle={isRtl ? 'الكورسات واستشارات الخبراء' : 'Courses & 1-on-1 Services'}
      />

      <main className="pt-16 px-4 space-y-4 text-start">
        {/* Segmented Control */}
        <div className="pt-1">
          <Tabs
            tabs={tabItems}
            activeTab={activeTab}
            onChange={(tab) => {
              setActiveTab(tab)
              setSearchParams({ tab })
            }}
          />
        </div>

        {/* Search Bar + Filter Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute start-3.5 top-3 w-4 h-4 text-[#F5F5F5]/40 pointer-events-none stroke-[1.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'courses'
                  ? isRtl
                    ? 'ابحث عن كورس React، بايثون، فيجما...'
                    : 'Search React, Python, Figma...'
                  : isRtl
                  ? 'ابحث عن تدقيق معماري، استشارات...'
                  : 'Search architecture audits, coaching...'
              }
              className="w-full min-h-[44px] ps-10 pe-9 py-2.5 rounded-xl bg-[#3D3B30] border border-[#F5F5F5]/12 text-sm text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:outline-none focus:border-[#BFA15A] text-start"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-3 top-3 text-[#F5F5F5]/40 hover:text-[#F5F5F5] p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>
            )}
          </div>

          {/* Filter Sheet Trigger */}
          <button
            onClick={() => setIsFilterOpen(true)}
            aria-label={t('common.filter', 'Open filter sheet')}
            className={`relative min-h-[44px] min-w-[44px] px-3 rounded-xl border flex items-center justify-center gap-1 text-xs font-medium transition-colors active:scale-95 cursor-pointer ${
              activeFiltersCount > 0
                ? 'bg-[#3D3B30] border-[#BFA15A] text-[#BFA15A]'
                : 'bg-[#3D3B30] border-[#F5F5F5]/12 text-[#F5F5F5]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#BFA15A] text-[#0C0C0C] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Category Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          <button
            onClick={() => setSelectedCat('all')}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-[#BFA15A] text-[#0C0C0C] border-[#BFA15A]'
                : 'bg-[#3D3B30] text-[#F5F5F5]/70 border-[#F5F5F5]/10 active:bg-[#4E4B3E]'
            }`}
          >
            {isRtl ? 'كل الأقسام' : 'All Categories'}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer ${
                selectedCat === c.id
                  ? 'bg-[#BFA15A] text-[#0C0C0C] border-[#BFA15A]'
                  : 'bg-[#3D3B30] text-[#F5F5F5]/70 border-[#F5F5F5]/10 active:bg-[#4E4B3E]'
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-[#F5F5F5]/65 px-0.5">
          <span>
            {isRtl ? (
              <>
                عرض <strong className="text-[#F5F5F5]">{currentList.length}</strong> نتيجة
              </>
            ) : (
              <>
                Showing <strong className="text-[#F5F5F5]">{currentList.length}</strong> {activeTab}
              </>
            )}
          </span>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[#BFA15A] font-medium hover:underline cursor-pointer"
            >
              {isRtl ? 'إلغاء كل الفلاتر' : 'Reset all filters'}
            </button>
          )}
        </div>

        {/* Vertical Card List */}
        {currentList.length > 0 ? (
          <div className="space-y-3.5">
            {activeTab === 'courses'
              ? filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} variant="list" />
                ))
              : filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} variant="list" />
                ))}
          </div>
        ) : (
          <EmptyState
            icon={Filter}
            title={t('explore.noResults', 'No matches found')}
            description={t('explore.noResultsDesc', 'Try loosening your search query, adjusting your price limit, or clearing active filters.')}
            actionLabel={isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            onAction={resetFilters}
          />
        )}
      </main>

      {/* Filter Bottom Sheet */}
      <BottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title={isRtl ? 'تصفية وترتيب النتائج' : 'Filter & Sort'}
        subtitle={isRtl ? `تخصيص بحث ${activeTab === 'courses' ? 'الكورسات' : 'الخدمات'}` : `Refine your ${activeTab} search`}
      >
        <div className="space-y-5 text-start">
          {/* Sort By */}
          <div>
            <label className="block text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider mb-2">
              {isRtl ? 'ترتيب حسب' : 'Sort By'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'popular', label: isRtl ? 'الأكثر طلباً' : 'Most Popular' },
                { id: 'rating', label: isRtl ? 'الأعلى تقييماً' : 'Highest Rated' },
                { id: 'price-asc', label: isRtl ? 'السعر: من الأقل' : 'Price: Low to High' },
                { id: 'price-desc', label: isRtl ? 'السعر: من الأعلى' : 'Price: High to Low' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  className={`p-2.5 rounded-xl border text-xs text-center transition-colors min-h-[44px] cursor-pointer ${
                    sortBy === s.id
                      ? 'bg-[#BFA15A] border-[#BFA15A] text-[#0C0C0C] font-semibold'
                      : 'bg-[#3D3B30] border-[#F5F5F5]/10 text-[#F5F5F5] active:bg-[#4E4B3E]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter (Courses only) */}
          {activeTab === 'courses' && (
            <div>
              <label className="block text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider mb-2">
                {isRtl ? 'مستوى الخبرة' : 'Skill Level'}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: isRtl ? 'كل المستويات' : 'All Levels' },
                  { id: 'Beginner', label: isRtl ? 'مبتدئ' : 'Beginner' },
                  { id: 'Intermediate', label: isRtl ? 'متوسط' : 'Intermediate' },
                  { id: 'Advanced', label: isRtl ? 'متقدم' : 'Advanced' }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`px-3 py-2 rounded-xl border text-xs transition-colors min-h-[40px] cursor-pointer ${
                      selectedLevel === lvl.id
                        ? 'bg-[#BFA15A] text-[#0C0C0C] border-[#BFA15A] font-semibold'
                        : 'bg-[#3D3B30] text-[#F5F5F5] border-[#F5F5F5]/10 active:bg-[#4E4B3E]'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider mb-2">
              {isRtl ? 'الحد الأدنى للتقييم' : 'Minimum Rating'}
            </label>
            <div className="flex gap-2">
              {[
                { val: 0, label: isRtl ? 'أي تقييم' : 'Any' },
                { val: 4.7, label: '★ 4.7+' },
                { val: 4.85, label: '★ 4.85+' },
                { val: 4.95, label: '★ 4.95+' }
              ].map((r) => (
                <button
                  key={r.val}
                  onClick={() => setMinRating(r.val)}
                  className={`flex-1 py-2 rounded-xl border text-xs transition-colors min-h-[44px] cursor-pointer ${
                    minRating === r.val
                      ? 'bg-[#BFA15A] border-[#BFA15A] text-[#0C0C0C] font-semibold'
                      : 'bg-[#3D3B30] border-[#F5F5F5]/10 text-[#F5F5F5] active:bg-[#4E4B3E]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-[#F5F5F5]/65 uppercase tracking-wider mb-2">
              <span>{isRtl ? 'الحد الأقصى للسعر' : 'Max Price'}</span>
              <span className="text-[#BFA15A] font-semibold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="40"
              max="250"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#BFA15A] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#F5F5F5]/50 mt-1">
              <span>$40</span>
              <span>$250+</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#F5F5F5]/10 flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => {
                resetFilters()
                setIsFilterOpen(false)
              }}
            >
              {t('common.reset', 'Reset')}
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => setIsFilterOpen(false)}
            >
              {isRtl ? `عرض ${currentList.length} نتيجة` : `Show ${currentList.length} Results`}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
