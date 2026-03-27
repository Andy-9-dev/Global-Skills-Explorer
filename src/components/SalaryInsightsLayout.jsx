import { NavLink } from 'react-router-dom'

const SalaryInsightsLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">explore</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 dark:text-slate-100 text-sm font-bold leading-tight uppercase tracking-wider">Global Skills</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Career Intelligence</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/insights/salary"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm font-medium">Salary Insights</span>
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined">work</span>
            <span className="text-sm font-medium">Job Board</span>
          </NavLink>

          <NavLink
            to="/skill-assessments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined">trending_up</span>
            <span className="text-sm font-medium">Skill Analysis</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2">
            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <img
                alt="User Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_feNNlSB6JiVHbVL5mPWfVwdANV7RuNI0OZcpXdhBCPYiCK0-gh96EWijF6bSdiOMHFeGQ-JTpNB-35cuwUAPGTnIrNN7iLH5P2nGq_Fpz4C7TsR_K7uy05AfL6tFw019hr8gjReaHVbXI3TynxMJt7rhSaOeYtWjyLeNuYDiK_CYQ5dQrZmpANhJXDTX9wSFbFQ9sMIcTPdU6kR0HeBSXTHZj60Tu7RZi2OXxyZvfvYbitn0ROp7jIbfv-TQVxfvO7t7gG9PCo-G"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-900 dark:text-slate-100">Alex Chen</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Senior Developer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default SalaryInsightsLayout
