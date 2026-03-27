/**
 * Skeleton Loader Components
 * Provides smooth loading states while data is being fetched
 */

export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse ${className}`} />
)

export const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
)

export const SkeletonJobCard = () => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse">
    <div className="flex gap-4">
      <SkeletonCard className="w-12 h-12 flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <SkeletonCard className="h-5 w-3/4" />
        <SkeletonCard className="h-4 w-1/2" />
        <div className="flex gap-2">
          <SkeletonCard className="h-6 w-16" />
          <SkeletonCard className="h-6 w-16" />
        </div>
      </div>
    </div>
  </div>
)

export const SkeletonCompanyCard = () => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse">
    <div className="flex items-center gap-4">
      <SkeletonCard className="w-12 h-12 flex-shrink-0 rounded-lg" />
      <div className="flex-1 space-y-2">
        <SkeletonCard className="h-4 w-3/4" />
        <SkeletonCard className="h-3 w-1/2" />
      </div>
    </div>
  </div>
)

export const SkeletonChart = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <SkeletonCard className="h-5 w-40" />
        <SkeletonCard className="h-4 w-32" />
      </div>
      <SkeletonCard className="h-6 w-20" />
    </div>
    <SkeletonCard className="h-64 w-full" />
    <div className="flex justify-between">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} className="h-4 w-12" />
      ))}
    </div>
  </div>
)

export const SkeletonGrid = ({ count = 4, columns = 2 }) => (
  <div className={`grid grid-cols-${columns} gap-4`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} className="h-32" />
    ))}
  </div>
)

export const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-4">
        <SkeletonCard className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonCard className="h-4 w-3/4" />
          <SkeletonCard className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
)

// Default generic skeleton loader component
const SkeletonLoader = ({ className = '' }) => (
  <div className={`bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse ${className}`} />
)

export default SkeletonLoader
