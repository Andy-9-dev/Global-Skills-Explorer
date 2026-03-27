import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SkeletonJobCard } from '../components/SkeletonLoader'
import { getMockJobs } from '../services/jobsApi'

// Icon colors cycling for variety
const iconStyles = [
  { icon: 'work', iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-600', iconBorder: 'border-blue-100 dark:border-blue-800' },
  { icon: 'code', iconBg: 'bg-purple-50 dark:bg-purple-900/20', iconColor: 'text-purple-600', iconBorder: 'border-purple-100 dark:border-purple-800' },
  { icon: 'hub', iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-600', iconBorder: 'border-emerald-100 dark:border-emerald-800' },
  { icon: 'analytics', iconBg: 'bg-orange-50 dark:bg-orange-900/20', iconColor: 'text-orange-600', iconBorder: 'border-orange-100 dark:border-orange-800' },
  { icon: 'cloud', iconBg: 'bg-sky-50 dark:bg-sky-900/20', iconColor: 'text-sky-600', iconBorder: 'border-sky-100 dark:border-sky-800' },
]

const getExperienceLevel = (title) => {
  const t = title.toLowerCase()
  if (t.includes('senior') || t.includes('lead') || t.includes('principal')) return 'Senior'
  if (t.includes('junior') || t.includes('entry') || t.includes('graduate')) return 'Entry Level'
  if (t.includes('director') || t.includes('head') || t.includes('manager')) return 'Director/Lead'
  return 'Mid-Level'
}

const extractSkills = (text) => {
  const keywords = [
    'React', 'Python', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
    'TypeScript', 'JavaScript', 'Java', 'Go', 'Rust', 'C++',
    'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST',
    'DevOps', 'CI/CD', 'Git', 'Linux', 'Terraform', 'Flutter',
    'Figma', 'UI/UX', 'Vue', 'Angular', 'Swift', 'Kotlin', 'PHP', 'Ruby'
  ]
  const found = keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()))
  return found.length > 0 ? found.slice(0, 4) : ['Technology', 'Problem Solving']
}

// Build the full jobs list once
const buildJobs = () =>
  getMockJobs().map((job, i) => {
    const style = iconStyles[i % iconStyles.length]
    return {
      ...job,
      companySlug: job.company.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
      type: 'Full-time',
      remote: job.location.toLowerCase().includes('remote') ? 'Remote' : 'On-site',
      experience: getExperienceLevel(job.title),
      skills: extractSkills(job.title),
      description: `Join ${job.company} as a ${job.title}. We're looking for talented professionals to join our growing team and make a real impact.`,
      fullDescription: `At ${job.company}, we're building innovative solutions. As a ${job.title}, you will work on exciting projects and collaborate with talented team members. This is a great opportunity to grow your career.`,
      requirements: [
        'Strong technical skills and problem-solving abilities',
        'Experience with relevant technologies and tools',
        'Excellent communication and teamwork skills',
        'Passion for learning and continuous improvement',
        'Ability to work in a fast-paced environment'
      ],
      requiredSkills: extractSkills(job.title),
      industry: 'Technology',
      ...style
    }
  })

const ALL_JOBS = buildJobs()

const JobsPage = () => {
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState(null)
  const [loading, setLoading] = useState(true)

  // Search inputs (controlled)
  const [roleInput, setRoleInput] = useState('')
  const [locationInput, setLocationInput] = useState('')

  // Applied search terms (only update when Search is clicked or Enter pressed)
  const [appliedRole, setAppliedRole] = useState('')
  const [appliedLocation, setAppliedLocation] = useState('')

  // Sidebar filters
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [salaryRange, setSalaryRange] = useState([])
  const [jobType, setJobType] = useState([])
  const [experienceLevel, setExperienceLevel] = useState([])
  const [sortBy, setSortBy] = useState('Most Relevant')

  useEffect(() => {
    // Simulate brief loading then show jobs
    const t = setTimeout(() => {
      setLoading(false)
      setSelectedJob(ALL_JOBS[0])
    }, 600)
    return () => clearTimeout(t)
  }, [])

  const applySearch = () => {
    setAppliedRole(roleInput.trim())
    setAppliedLocation(locationInput.trim())
  }

  const handleClearFilters = () => {
    setRoleInput('')
    setLocationInput('')
    setAppliedRole('')
    setAppliedLocation('')
    setRemoteOnly(false)
    setSalaryRange([])
    setJobType([])
    setExperienceLevel([])
  }

  const toggleSalaryRange = (range) =>
    setSalaryRange(prev => prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range])

  const toggleJobType = (type) =>
    setJobType(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])

  const toggleExperienceLevel = (level) =>
    setExperienceLevel(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level])

  const displayedJobs = useMemo(() => {
    let jobs = ALL_JOBS.filter(job => {
      const matchesRole = !appliedRole ||
        job.title.toLowerCase().includes(appliedRole.toLowerCase()) ||
        job.company.toLowerCase().includes(appliedRole.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(appliedRole.toLowerCase()))

      const matchesLocation = !appliedLocation ||
        job.location.toLowerCase().includes(appliedLocation.toLowerCase())

      const matchesRemote = !remoteOnly || job.remote === 'Remote'

      const matchesSalary = salaryRange.length === 0 || salaryRange.some(range => {
        if (range === '$160k+') return job.salary.includes('$160k') || job.salary.includes('$180k')
        return job.salary.includes(range.split(' - ')[0])
      })

      const matchesJobType = jobType.length === 0 || jobType.includes(job.type)
      const matchesExperience = experienceLevel.length === 0 || experienceLevel.includes(job.experience)

      return matchesRole && matchesLocation && matchesRemote && matchesSalary && matchesJobType && matchesExperience
    })

    if (sortBy === 'Salary: High to Low') {
      jobs = [...jobs].sort((a, b) => {
        const aVal = parseInt(a.salary.replace(/[^0-9]/g, '').slice(0, 3)) || 0
        const bVal = parseInt(b.salary.replace(/[^0-9]/g, '').slice(0, 3)) || 0
        return bVal - aVal
      })
    }

    return jobs
  }, [appliedRole, appliedLocation, remoteOnly, salaryRange, jobType, experienceLevel, sortBy])

  const activeJob = selectedJob || displayedJobs[0]

  const handleApplyNow = () => {
    if (activeJob?.url && activeJob.url !== '#') window.open(activeJob.url, '_blank')
  }

  const handleShare = () => {
    if (navigator.share && activeJob) {
      navigator.share({ title: activeJob.title, text: `${activeJob.title} at ${activeJob.company}`, url: window.location.href })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-12 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <span className="material-symbols-outlined block">explore</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Global Skills Explorer</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {[['Dashboard', '/dashboard'], ['Career Map', '/career-path'], ['Assessments', '/skill-assessments'], ['Certifications', '/certifications']].map(([label, href]) => (
            <a key={href} href={href} className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">{label}</a>
          ))}
          <a href="/jobs" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Jobs</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Alex Rivera</p>
            <p className="text-[10px] text-slate-500">Senior Developer</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-12 py-5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-4 border border-transparent focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 w-full py-3 px-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              placeholder="Role, company, or keyword (e.g. React, DevOps)"
              type="text"
              value={roleInput}
              onChange={e => setRoleInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && applySearch()}
            />
            {roleInput && (
              <button onClick={() => { setRoleInput(''); setAppliedRole('') }} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-4 border border-transparent focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">location_on</span>
            <input
              className="bg-transparent border-none focus:ring-0 w-full py-3 px-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              placeholder="City, country, or Remote"
              type="text"
              value={locationInput}
              onChange={e => setLocationInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && applySearch()}
            />
            {locationInput && (
              <button onClick={() => { setLocationInput(''); setAppliedLocation('') }} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <button
            onClick={applySearch}
            className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2 min-w-[140px]"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            Search Jobs
          </button>
        </div>
        {/* Active search indicator */}
        {(appliedRole || appliedLocation) && (
          <div className="max-w-5xl mx-auto mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Searching for:</span>
            {appliedRole && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {appliedRole}
                <button onClick={() => { setRoleInput(''); setAppliedRole('') }}>
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}
            {appliedLocation && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {appliedLocation}
                <button onClick={() => { setLocationInput(''); setAppliedLocation('') }}>
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-4 lg:px-8 py-6 gap-6 overflow-hidden">

        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Filters</h3>
            <button onClick={handleClearFilters} className="text-primary text-xs font-semibold hover:underline">Clear all</button>
          </div>

          {/* Remote Toggle */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Remote Only</span>
              <button
                onClick={() => setRemoteOnly(!remoteOnly)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${remoteOnly ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <span className={`${remoteOnly ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200`} />
              </button>
            </div>
          </div>

          {/* Salary Range */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Salary Range</p>
            <div className="space-y-2">
              {['$50k - $80k', '$80k - $120k', '$120k - $160k', '$160k+'].map(range => (
                <label key={range} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={salaryRange.includes(range)} onChange={() => toggleSalaryRange(range)}
                    className="rounded text-primary focus:ring-primary h-4 w-4 border-slate-300" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{range}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Job Type</p>
            <div className="space-y-2">
              {['Full-time', 'Contract', 'Freelance', 'Internship'].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={jobType.includes(type)} onChange={() => toggleJobType(type)}
                    className="rounded text-primary focus:ring-primary h-4 w-4 border-slate-300" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Experience Level</p>
            <div className="space-y-2">
              {['Entry Level', 'Mid-Level', 'Senior', 'Director/Lead'].map(level => (
                <label key={level} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={experienceLevel.includes(level)} onChange={() => toggleExperienceLevel(level)}
                    className="rounded text-primary focus:ring-primary h-4 w-4 border-slate-300" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Job List */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-260px)]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-slate-100">{displayedJobs.length}</span> jobs found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg px-2 py-1 font-semibold text-slate-900 dark:text-slate-100 focus:ring-primary">
                <option>Most Relevant</option>
                <option>Salary: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <><SkeletonJobCard /><SkeletonJobCard /><SkeletonJobCard /></>
          ) : displayedJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">search_off</span>
              <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No jobs found</p>
              <p className="text-sm text-slate-500 mt-1">Try different keywords or clear your filters</p>
              <button onClick={handleClearFilters} className="mt-4 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            displayedJobs.map(job => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white dark:bg-slate-900 p-5 rounded-xl border-2 shadow-sm cursor-pointer relative transition-all hover:shadow-md ${
                  activeJob?.id === job.id ? 'border-primary shadow-lg' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                }`}
              >
                <div className="absolute top-5 right-5">
                  <span className={`material-symbols-outlined ${activeJob?.id === job.id ? 'text-primary' : 'text-slate-300'}`}>bookmark</span>
                </div>
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg ${job.iconBg} flex items-center justify-center flex-shrink-0 border ${job.iconBorder}`}>
                    <span className={`material-symbols-outlined ${job.iconColor} text-2xl`}>{job.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1 leading-tight">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                      <span onClick={e => { e.stopPropagation(); navigate(`/company/${job.companySlug}`) }}
                        className="text-sm font-bold text-primary hover:underline cursor-pointer">{job.company}</span>
                      <span className="flex items-center text-xs text-slate-400">
                        <span className="material-symbols-outlined text-sm mr-0.5">location_on</span>{job.location}
                      </span>
                      <span className="flex items-center text-xs text-slate-400">
                        <span className="material-symbols-outlined text-sm mr-0.5">payments</span>{job.salary}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${job.remote === 'Remote' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        {job.remote}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded font-medium">{skill}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{job.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Job Detail Pane */}
        {activeJob && (
          <div className="hidden lg:flex w-full max-w-md flex-col bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-primary/30 to-blue-600/30 relative flex-shrink-0">
              <div className="absolute -bottom-8 left-6">
                <div className={`w-16 h-16 rounded-xl bg-white dark:bg-slate-900 shadow-md flex items-center justify-center border ${activeJob.iconBorder} ${activeJob.iconBg}`}>
                  <span className={`material-symbols-outlined ${activeJob.iconColor} text-3xl`}>{activeJob.icon}</span>
                </div>
              </div>
            </div>
            <div className="pt-12 px-6 pb-6 flex-1 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight">{activeJob.title}</h2>
                  <span onClick={() => navigate(`/company/${activeJob.companySlug}`)}
                    className="inline-flex items-center gap-1 text-primary font-bold hover:underline cursor-pointer text-sm mt-1">
                    <span className="material-symbols-outlined text-sm">apartment</span>{activeJob.company}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">{activeJob.location}</p>
                </div>
                <button onClick={handleShare} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
              <div className="flex gap-3 mb-6">
                <button onClick={handleApplyNow}
                  className="flex-1 bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                  Apply Now
                </button>
                <button className="px-4 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-sm">
                  <span className="material-symbols-outlined text-[18px]">bookmark</span>Save
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-slate-100 dark:border-slate-800">
                {[['Salary', `${activeJob.salary} /yr`], ['Job Type', activeJob.type], ['Experience', activeJob.experience], ['Industry', activeJob.industry]].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{val}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-sm">About the Role</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{activeJob.fullDescription}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-sm">Key Requirements</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                    {activeJob.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-sm">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeJob.requiredSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-bold">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default JobsPage
