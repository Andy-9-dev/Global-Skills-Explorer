import { useState, useEffect } from 'react'
import JobMap from '../components/JobMap'
import { fetchAllJobs, getMockJobs } from '../services/jobsApi'

const JobDiscoveryPage = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [error, setError] = useState(null)

  // Load jobs on mount
  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setLoading(true)
    setError(null)

    try {
      // Try to fetch real jobs
      const realJobs = await fetchAllJobs()

      if (realJobs.length > 0) {
        setJobs(realJobs)
      } else {
        // Fallback to mock jobs
        setJobs(getMockJobs())
      }
    } catch (err) {
      console.error('Error loading jobs:', err)
      // Use mock jobs as fallback
      setJobs(getMockJobs())
    } finally {
      setLoading(false)
    }
  }

  // Filter jobs based on search and location
  useEffect(() => {
    let filtered = jobs

    if (searchTerm) {
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    setFilteredJobs(filtered)
  }, [jobs, searchTerm, locationFilter])

  // Get unique locations for filter
  const locations = [...new Set(jobs.map(job => job.location))].sort()

  // Get selected job details
  const selectedJob = jobs.find(job => job.id === selectedJobId)

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Job Discovery Map</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Explore job opportunities on an interactive map
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        {/* Left sidebar - Filters and job list */}
        <div className="w-96 flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800">
          {/* Filters */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
            {/* Search */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                Search Jobs
              </label>
              <input
                type="text"
                placeholder="Job title or company..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Results count */}
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Job list */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-slate-600 dark:text-slate-400">
                <p className="text-sm">Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-4 text-center text-slate-600 dark:text-slate-400">
                <p className="text-sm">No jobs found</p>
              </div>
            ) : (
              <div className="space-y-2 p-3">
                {filteredJobs.map(job => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedJobId === job.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                        : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                      {job.company}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
                      {job.location}
                    </p>
                    {job.salary && (
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">
                        {job.salary}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Map */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
            <JobMap jobs={filteredJobs} selectedJobId={selectedJobId} onJobSelect={setSelectedJobId} />
          </div>

          {/* Job details panel */}
          {selectedJob && (
            <div className="mt-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedJob.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selectedJob.company}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                  {selectedJob.source}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Location</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedJob.location}</p>
                </div>
                {selectedJob.salary && (
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Salary</p>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">{selectedJob.salary}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Coordinates</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedJob.lat?.toFixed(2)}, {selectedJob.lng?.toFixed(2)}
                  </p>
                </div>
              </div>

              <a
                href={selectedJob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                View Job
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDiscoveryPage
