import { useState, useEffect, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import JobMap from '../components/JobMap'
import { SalaryByRegionChart } from '../components/SkillsChart'
import SkeletonLoader from '../components/SkeletonLoader'
import { getMockJobs } from '../services/jobsApi'
import { SearchContext } from '../components/DashboardLayout'

const ALL_JOBS = getMockJobs()

const DashboardPage = () => {
  const navigate = useNavigate()
  const searchQuery = useContext(SearchContext) || ''

  const [topJobs, setTopJobs] = useState([])
  const [loadingTopJobs, setLoadingTopJobs] = useState(true)
  const [viewMode, setViewMode] = useState('world')
  const [selectedJobId, setSelectedJobId] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => {
      setTopJobs(ALL_JOBS)
      setLoadingTopJobs(false)
    }, 300)
    return () => clearTimeout(t)
  }, [])

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return topJobs
    const q = searchQuery.toLowerCase()
    return topJobs.filter(job =>
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q)
    )
  }, [searchQuery, topJobs])

  const mapJobs = useMemo(() => {
    if (!searchQuery.trim()) return topJobs
    return topJobs.map(job => ({
      ...job,
      highlighted: filteredJobs.some(f => f.id === job.id)
    }))
  }, [searchQuery, topJobs, filteredJobs])

  const handleViewAllJobs = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/jobs')
    }
  }

  return (
    <div className="flex flex-col flex-1 px-4 md:px-8 py-6 gap-8 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Global Talent Insights</h1>
            <p className="text-sm text-slate-500">Explore opportunities across 150+ countries</p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setViewMode('world')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${
                viewMode === 'world'
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              World View
            </button>
            <button
              onClick={() => setViewMode('region')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${
                viewMode === 'region'
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Region Detail
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Job Opportunities Map</h2>
          <p className="text-xs text-slate-500">
            {searchQuery.trim()
              ? `${filteredJobs.length} results for "${searchQuery}"`
              : `${topJobs.length} jobs with locations`}
          </p>
        </div>
        <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900">
          <div className="w-full h-96">
            <JobMap
              jobs={mapJobs}
              selectedJobId={selectedJobId}
              onJobSelect={setSelectedJobId}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>

      {/* Job Postings & Salary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Top Job Postings
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] text-slate-500 font-semibold">
                {filteredJobs.length} Available
              </span>
            </h2>
            <button onClick={handleViewAllJobs} className="text-xs font-semibold text-primary hover:underline">
              View All
            </button>
          </div>

          {searchQuery.trim() && (
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
              <span className="material-symbols-outlined text-primary text-[16px]">filter_alt</span>
              <p className="text-xs text-primary font-medium">
                Showing results for "<span className="font-bold">{searchQuery}</span>"
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
            {loadingTopJobs ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonLoader key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border transition-colors cursor-pointer ${
                    selectedJobId === job.id
                      ? 'border-primary shadow-md'
                      : 'border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedJobId(job.id === selectedJobId ? null : job.id)}
                >
                  <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-blue-600">work</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{job.title}</h4>
                    <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{job.salary}</p>
                    <p className="text-[10px] text-slate-400">{job.posted}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
                <p className="text-sm text-slate-500 mt-2">No jobs match "{searchQuery}"</p>
                <button
                  onClick={() => navigate('/jobs')}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90"
                >
                  Browse All Jobs
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Salary Chart */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Salary Insights (Annual USD)</h2>
            <button className="p-1 text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <SalaryByRegionChart />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
