import { NavLink, Link } from 'react-router-dom'

const DashboardSidebar = ({ selectedSkills, setSelectedSkills, selectedRole, setSelectedRole }) => {
  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill))
  }

  const handleReset = () => {
    setSelectedSkills([])
    setSelectedRole('Software Engineer')
  }

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 shrink-0 h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="flex flex-col gap-8 h-full">
        {/* Filters Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900 dark:text-slate-100 text-base font-bold">Filters</h3>
            <button 
              onClick={handleReset}
              className="text-primary text-xs font-semibold uppercase tracking-wider hover:underline transition-all"
            >
              Reset
            </button>
          </div>

          <div className="space-y-4">
            {/* Role Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase mb-2 block">Role</label>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                {selectedRole}
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase mb-2 block">Top Skills</label>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium flex items-center gap-1 hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)}>
                      <span className="material-symbols-outlined text-xs cursor-pointer hover:scale-125 transition-transform">
                        close
                      </span>
                    </button>
                  </span>
                ))}
                <button className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-xs font-medium border border-dashed border-slate-300 dark:border-slate-700 hover:border-primary hover:text-primary transition-all">
                  + Add
                </button>
              </div>
            </div>

            {/* Geography Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase mb-2 block">Geography</label>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Global
                <span className="material-symbols-outlined text-lg">public</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text-sm font-medium">Overview</span>
          </NavLink>
          <NavLink
            to="/insights"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">insights</span>
            <span className="text-sm font-medium">Insights</span>
          </NavLink>
          <NavLink
            to="/insights/salary"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm font-medium">Salary Insights</span>
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">work</span>
            <span className="text-sm font-medium">Job Postings</span>
          </NavLink>
          <NavLink
            to="/certifications"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="text-sm font-medium">Certifications</span>
          </NavLink>
        </div>

        {/* CTA Card */}
        <div className="mt-auto bg-slate-900 rounded-xl p-4 relative overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
          <div className="relative z-10">
            <h4 className="text-white text-sm font-bold mb-1">New Career Path?</h4>
            <p className="text-slate-400 text-[10px] leading-relaxed mb-3">
              AI-driven mapping for your next big move based on current trends.
            </p>
            <Link to="/career-path">
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-slate-900 rounded-lg text-xs font-bold transition-all hover:scale-105 hover:bg-primary/90">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Generate Map
              </button>
            </Link>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-8xl text-white">insights</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default DashboardSidebar
