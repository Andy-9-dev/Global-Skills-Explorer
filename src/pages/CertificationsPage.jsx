import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { allCertifications, recommendedCertifications, filterCertifications } from '../data/certificationsData'

const CertificationsPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [showCertModal, setShowCertModal] = useState(false)
  const [selectedCert, setSelectedCert] = useState(null)

  // Get all unique skills for filter
  const allSkills = useMemo(() => {
    const skills = new Set()
    allCertifications.forEach(cert => {
      cert.skills.forEach(skill => skills.add(skill))
    })
    return Array.from(skills).sort()
  }, [])

  // Filter certifications based on tab and search
  const filteredCerts = useMemo(() => {
    let results = filterCertifications(searchQuery, {
      difficulty: selectedDifficulty,
      skill: selectedSkill
    })

    if (activeTab === 'completed') {
      results = results.filter(c => c.status === 'completed')
    } else if (activeTab === 'in_progress') {
      results = results.filter(c => c.status === 'in_progress')
    } else if (activeTab === 'recommended') {
      results = results.filter(c => c.status === 'not_started')
    }

    return results
  }, [activeTab, searchQuery, selectedDifficulty, selectedSkill])

  const completedCount = allCertifications.filter(c => c.status === 'completed').length
  const inProgressCount = allCertifications.filter(c => c.status === 'in_progress').length

  const handleViewCert = (cert) => {
    setSelectedCert(cert)
    setShowCertModal(true)
  }

  const handleShareCert = (certId) => {
    // Mock share to LinkedIn
    alert(`Certificate "${allCertifications.find(c => c.id === certId)?.title}" shared to LinkedIn!`)
  }

  const handleStartCert = (certId) => {
    const cert = allCertifications.find(c => c.id === certId)
    navigate(`/certifications/${certId}`)
  }

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
    setActiveTab('all')
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedDifficulty('')
    setSelectedSkill('')
  }

  const hasActiveFilters = searchQuery || selectedDifficulty || selectedSkill

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 dark:text-white"
              placeholder="Search certifications, skills, or providers..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 ml-6">
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Skill Filter */}
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          >
            <option value="">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Page Header */}
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Certifications
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Validate your skills with globally recognized credentials
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/share-profile')}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-200 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Certifications
            </p>
            <p className="text-4xl font-black mt-2 text-slate-900 dark:text-white">{allCertifications.length}</p>
            <p className="text-xs text-slate-400 mt-2">{completedCount} completed</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              In Progress
            </p>
            <p className="text-4xl font-black mt-2 text-primary">{inProgressCount}</p>
            <p className="text-xs text-slate-400 mt-2">Keep learning</p>
          </div>

          <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-xl border border-primary/20">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Skills Covered
            </p>
            <p className="text-4xl font-black mt-2 text-primary">{allSkills.length}</p>
            <p className="text-xs text-slate-400 mt-2">Across all certs</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 pt-6 border-b border-slate-200 dark:border-slate-800 flex gap-8">
          {[
            { id: 'all', label: 'All Certifications', count: allCertifications.length },
            { id: 'in_progress', label: 'In Progress', count: inProgressCount },
            { id: 'completed', label: 'Completed', count: completedCount },
            { id: 'recommended', label: 'Recommended', count: recommendedCertifications.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 font-semibold text-sm transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs font-bold text-slate-400">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="px-8 pt-4 pb-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500">Active filters:</span>
            {searchQuery && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium flex items-center gap-1">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:scale-125 transition-transform">
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            )}
            {selectedDifficulty && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium flex items-center gap-1">
                {selectedDifficulty}
                <button onClick={() => setSelectedDifficulty('')} className="hover:scale-125 transition-transform">
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            )}
            {selectedSkill && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium flex items-center gap-1">
                {selectedSkill}
                <button onClick={() => setSelectedSkill('')} className="hover:scale-125 transition-transform">
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {filteredCerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">
                workspace_premium
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No certifications found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters or search query</p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map(cert => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`size-14 rounded-lg ${cert.logoBg} flex items-center justify-center text-white font-bold text-xs`}>
                        {cert.logo}
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        cert.status === 'completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : cert.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {cert.status === 'completed' ? 'Earned' : cert.status === 'in_progress' ? 'In Progress' : 'Available'}
                      </span>
                    </div>

                    <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{cert.issuer}</p>

                    {/* Difficulty & Duration */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
                        {cert.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {cert.duration}
                      </span>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleSkillClick(skill)}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium hover:bg-primary hover:text-white transition-colors"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    {cert.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Progress</span>
                          <span className="text-xs font-bold text-primary">{cert.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${cert.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Dates */}
                    {cert.issued && (
                      <div className="text-xs text-slate-400 space-y-1 border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                        <div className="flex justify-between">
                          <span>Issued</span>
                          <span className="font-medium">{cert.issued}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expires</span>
                          <span className="font-medium">{cert.expires}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex gap-2">
                    {cert.status === 'completed' ? (
                      <>
                        <button
                          onClick={() => handleViewCert(cert)}
                          className="flex-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                          View Cert
                        </button>
                        <button
                          onClick={() => handleShareCert(cert.id)}
                          className="px-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 py-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">share</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleStartCert(cert.id)}
                        className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors"
                      >
                        {cert.status === 'in_progress' ? 'Continue' : 'Start'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertModal && selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Certificate Details</h2>
              <button
                onClick={() => setShowCertModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-8 text-white text-center aspect-video flex flex-col items-center justify-center">
                <div className={`size-20 rounded-lg ${selectedCert.logoBg} flex items-center justify-center text-white font-bold text-2xl mb-4`}>
                  {selectedCert.logo}
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedCert.title}</h3>
                <p className="text-white/80">{selectedCert.issuer}</p>
                <p className="text-white/60 text-sm mt-4">Issued: {selectedCert.issued}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Difficulty</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedCert.difficulty}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Duration</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedCert.duration}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">About this certification</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{selectedCert.description}</p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">Skills Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    alert('PDF download started!')
                    setShowCertModal(false)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-bold transition-colors"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    alert(`Certificate shared to LinkedIn!`)
                    setShowCertModal(false)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white hover:bg-primary/90 rounded-lg font-bold transition-colors"
                >
                  <span className="material-symbols-outlined">share</span>
                  Share to LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificationsPage
