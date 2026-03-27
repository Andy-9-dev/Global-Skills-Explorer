import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { roles, skillGaps, recommendedCourses } from '../data/careerPathData'

const CareerPathPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [selectedRole, setSelectedRole] = useState(null)
  const [highlightedSkill, setHighlightedSkill] = useState(null)
  const [savedTarget, setSavedTarget] = useState(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  // Roles that require the highlighted skill
  const rolesWithSkill = highlightedSkill
    ? roles.filter(r =>
        r.skills.some(s =>
          typeof s === 'string'
            ? s.toLowerCase().includes(highlightedSkill.toLowerCase())
            : s.name.toLowerCase().includes(highlightedSkill.toLowerCase())
        )
      ).map(r => r.id)
    : []

  const handleRoleClick = (role) => {
    setSelectedRole(prev => prev?.id === role.id ? null : role)
    setHighlightedSkill(null)
  }

  const handleSkillClick = (skillName, e) => {
    e.stopPropagation()
    setHighlightedSkill(prev => prev === skillName ? null : skillName)
  }

  const handleSetTarget = (role) => {
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }
    setSavedTarget(role.id)
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  const handleSharePath = () => {
    if (navigator.share) {
      navigator.share({ title: 'My Career Path', url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const nextRole = roles.find(r => r.status === 'next')

  const getSkillName = (skill) => typeof skill === 'string' ? skill : skill.name
  const isSkillCompleted = (skill) => typeof skill === 'object' && skill.completed

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto">

      {/* Sign-in banner for unauthenticated users */}
      {!isAuthenticated && !bannerDismissed && (
        <div className="flex items-center justify-between gap-4 mb-6 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[20px]">lock_open</span>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold">Sign in</span> to save your career path and track your progress
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/auth/login')}
              className="text-xs font-bold text-primary hover:underline"
            >
              Sign in
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              className="text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            <button
              onClick={() => setSelectedRole(null)}
              className="hover:text-primary transition-colors"
            >
              Engineering
            </button>
            <span>/</span>
            <span className="text-primary">Architecture Path</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Career Path Map</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Your journey to{' '}
            <span className="text-slate-900 dark:text-slate-200 font-bold">Senior React Architect</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            Download PDF
          </button>
          <button
            onClick={handleSharePath}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
            Share Path
          </button>
        </div>
      </div>

      {/* Skill highlight hint */}
      {highlightedSkill && (
        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <span className="material-symbols-outlined text-amber-500 text-[18px]">filter_alt</span>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Showing roles that require <span className="font-bold">"{highlightedSkill}"</span>
          </p>
          <button onClick={() => setHighlightedSkill(null)} className="ml-auto text-amber-400 hover:text-amber-600">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Roadmap Timeline Column */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

            <h3 className="text-lg font-bold mb-8 flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-primary">alt_route</span>
              Roadmap Overview
              <span className="text-xs font-normal text-slate-400 ml-1">— click a role to explore</span>
            </h3>

            <div className="relative">
              {/* Continuous Line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-slate-800"></div>

              {roles.map((step, index) => {
                const isSelected = selectedRole?.id === step.id
                const isDimmed = highlightedSkill && !rolesWithSkill.includes(step.id)

                return (
                  <div
                    key={step.id}
                    className={`relative flex gap-6 ${index < roles.length - 1 ? 'pb-10' : ''} transition-opacity duration-200 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                  >
                    {/* Step Icon */}
                    {step.status === 'completed' && (
                      <button
                        onClick={() => handleRoleClick(step)}
                        className={`z-10 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-transform cursor-pointer ${isSelected ? 'ring-2 ring-offset-2 ring-emerald-400' : ''}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </button>
                    )}

                    {step.status === 'current' && (
                      <>
                        <div className="absolute left-[-8px] top-[-8px] w-14 h-14 rounded-full bg-primary/20 animate-pulse"></div>
                        <button
                          onClick={() => handleRoleClick(step)}
                          className={`z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:scale-110 active:scale-95 transition-transform cursor-pointer ${isSelected ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">person</span>
                        </button>
                      </>
                    )}

                    {(step.status === 'next' || step.status === 'future') && (
                      <button
                        onClick={() => handleRoleClick(step)}
                        className={`z-10 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 hover:scale-110 hover:border-primary hover:text-primary active:scale-95 transition-all cursor-pointer ${isSelected ? 'ring-2 ring-offset-2 ring-primary border-primary text-primary' : ''}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{step.status === 'future' ? 'fork_right' : 'star'}</span>
                      </button>
                    )}

                    {/* Step Content */}
                    <button
                      onClick={() => handleRoleClick(step)}
                      className={`flex-1 text-left transition-all duration-200 rounded-xl ${
                        step.status === 'current'
                          ? `p-4 border ${isSelected ? 'bg-primary/10 border-primary/40' : 'bg-primary/5 border-primary/20'}`
                          : step.status === 'next' || step.status === 'future'
                          ? `p-3 border ${isSelected ? 'bg-slate-50 dark:bg-slate-800 border-primary/30' : 'border-transparent opacity-70 hover:opacity-100'}`
                          : `p-3 border ${isSelected ? 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600' : 'border-transparent'}`
                      } hover:bg-slate-50 dark:hover:bg-slate-800/50`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">{step.title}</h4>
                            {step.status === 'current' && (
                              <span className="px-2 py-0.5 rounded-full bg-primary text-[10px] text-white font-bold uppercase tracking-tight">
                                Current
                              </span>
                            )}
                            {savedTarget === step.id && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] text-white font-bold uppercase tracking-tight">
                                Target
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                            {step.status === 'completed' && 'Completed • '}
                            {step.status === 'current' && 'In Progress • '}
                            {step.status === 'next' && 'Next Milestone • '}
                            {step.status === 'future' && 'Alternative Path • '}
                            {step.duration}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-tighter">
                          {step.level}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-3" onClick={e => e.stopPropagation()}>
                        {step.status === 'current' && Array.isArray(step.skills) && step.skills[0]?.name ? (
                          step.skills.map((skill, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => handleSkillClick(skill.name, e)}
                              className={`text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-1 transition-all hover:scale-105 ${
                                highlightedSkill === skill.name
                                  ? 'bg-amber-100 border border-amber-400 text-amber-700'
                                  : skill.completed
                                  ? 'bg-white dark:bg-slate-800 border border-primary/30 text-primary'
                                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[12px]">
                                {skill.completed ? 'check_circle' : 'pending'}
                              </span>
                              {skill.name}
                            </button>
                          ))
                        ) : (
                          step.skills.map((skill, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => handleSkillClick(getSkillName(skill), e)}
                              className={`text-[10px] px-2 py-1 rounded-full transition-all hover:scale-105 ${
                                highlightedSkill === getSkillName(skill)
                                  ? 'bg-amber-100 border border-amber-400 text-amber-700 font-bold'
                                  : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {getSkillName(skill)}
                            </button>
                          ))
                        )}
                      </div>

                      {/* Progress Bar for Current Step */}
                      {step.status === 'current' && step.progress && (
                        <div className="mt-4 pt-4 border-t border-primary/10">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-slate-500">Milestone Progress</span>
                            <span className="text-primary font-bold">{step.progress}%</span>
                          </div>
                          <div className="w-full bg-primary/10 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-500"
                              style={{ width: `${step.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Role Detail Panel — shown when a role is selected */}
          {selectedRole ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/20 p-6 animate-in fade-in duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[28px]">
                      {selectedRole.status === 'completed' ? 'verified' : selectedRole.status === 'current' ? 'person' : 'architecture'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">{selectedRole.title}</h3>
                    <p className="text-xs text-primary font-bold">{selectedRole.level}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                {selectedRole.description}
              </p>

              <div className="space-y-4">
                {/* Salary */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Salary Range</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{selectedRole.salaryRange}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Annual, based on global market data</p>
                </div>

                {/* Time to progress */}
                {selectedRole.timeToNext && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Time to Next Level</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedRole.timeToNext}</p>
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.skills.map((skill, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => handleSkillClick(getSkillName(skill), e)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all hover:scale-105 ${
                          highlightedSkill === getSkillName(skill)
                            ? 'bg-amber-100 border border-amber-400 text-amber-700 font-bold'
                            : isSkillCompleted(skill)
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {getSkillName(skill)}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">Tap a skill to see which roles require it</p>
                </div>

                {/* Set as target */}
                {selectedRole.status !== 'completed' && selectedRole.status !== 'current' && (
                  <button
                    onClick={() => handleSetTarget(selectedRole)}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                      savedTarget === selectedRole.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:brightness-110'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {savedTarget === selectedRole.id ? 'check_circle' : 'bolt'}
                    </span>
                    {savedTarget === selectedRole.id ? 'Target Set!' : 'Set as Active Target'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Default: Next Goal card */
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[28px]">architecture</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Next Goal</h3>
                  <p className="text-xs text-primary font-bold">{nextRole?.title}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Salary Growth */}
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Est. Salary Growth</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{nextRole?.salaryRange}</span>
                    <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                      <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                      +25%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Based on global market data for 2024</p>
                </div>

                {/* Gap Analysis */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Gap Analysis (Top 3)</h4>
                  <div className="space-y-3">
                    {skillGaps.map((gap, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleSkillClick(gap.skill, e)}
                        className={`w-full flex items-center justify-between group transition-all rounded-lg px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 ${highlightedSkill === gap.skill ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${gap.color}-400`}></div>
                          <span className="text-sm font-medium">{gap.skill}</span>
                        </div>
                        <span className={`text-[10px] font-bold ${gap.status === 'learning' ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {gap.status === 'learning' ? 'Learning' : 'Required'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recommended Courses */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Top Recommendations</h4>
                  <div className="space-y-3">
                    {recommendedCourses.map((course, index) => (
                      <a key={index} className="block group" href="#">
                        <div className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <div className="w-16 h-10 rounded bg-slate-200 dark:bg-slate-700 shrink-0 overflow-hidden relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient}`}></div>
                            <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-white text-[16px]">
                              {course.type === 'video' ? 'play_circle' : 'menu_book'}
                            </span>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{course.title}</p>
                            <p className="text-[10px] text-slate-400">{course.provider} • {course.duration}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => nextRole && handleSetTarget(nextRole)}
                  className={`w-full py-3 rounded-lg font-bold text-sm hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 ${
                    savedTarget === nextRole?.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white'
                  }`}
                >
                  {savedTarget === nextRole?.id ? 'Target Set!' : 'Set as Active Target'}
                  <span className="material-symbols-outlined text-[18px]">
                    {savedTarget === nextRole?.id ? 'check_circle' : 'bolt'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Insight card — always visible */}
          <div className="bg-gradient-to-br from-primary to-blue-500 rounded-xl p-6 text-white shadow-lg shadow-primary/20">
            <h4 className="font-bold text-sm mb-2">Did you know?</h4>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Architects who master{' '}
              <button
                onClick={(e) => handleSkillClick('Next.js Advanced', e)}
                className="font-bold text-white underline underline-offset-2 hover:text-white/80 transition-colors"
              >
                Next.js 14 Server Actions
              </button>{' '}
              see an average 15% increase in offer rates this year.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60">
              <span className="material-symbols-outlined text-[14px]">lightbulb</span>
              Tech Insights
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerPathPage
