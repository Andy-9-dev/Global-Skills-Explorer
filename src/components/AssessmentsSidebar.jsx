import { NavLink } from 'react-router-dom'

const AssessmentsSidebar = () => {
  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined">explore</span>
        </div>
        <div>
          <h1 className="text-slate-900 dark:text-slate-100 text-base font-bold leading-none">Global Skills</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Career Explorer</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`
          }
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm font-semibold">Dashboard</span>
        </NavLink>

        <NavLink
          to="/career-path"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`
          }
        >
          <span className="material-symbols-outlined">map</span>
          <span className="text-sm font-semibold">Career Map</span>
        </NavLink>

        <NavLink
          to="/skill-assessments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`
          }
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            description
          </span>
          <span className="text-sm font-semibold">Assessments</span>
        </NavLink>

        <NavLink
          to="/certifications"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`
          }
        >
          <span className="material-symbols-outlined">military_tech</span>
          <span className="text-sm font-semibold">Certifications</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`
          }
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-semibold">Settings</span>
        </NavLink>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Current Plan
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">Pro Professional</p>
          <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-sm shadow-primary/20 hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AssessmentsSidebar
