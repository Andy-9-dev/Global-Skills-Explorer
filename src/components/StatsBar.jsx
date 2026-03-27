const StatsBar = ({ stats }) => {
  const statsData = [
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: 'group'
    },
    {
      label: 'Global Partners',
      value: stats.globalPartners,
      icon: 'business'
    },
    {
      label: 'Skill Data Points',
      value: stats.skillDataPoints,
      icon: 'analytics'
    }
  ]

  return (
    <div className="px-6 md:px-20 lg:px-40 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <div 
            key={index}
            className="flex flex-col gap-2 rounded-2xl p-8 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-primary/30 hover:scale-105 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest">
                {stat.label}
              </p>
              <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                {stat.icon}
              </span>
            </div>
            <p className="text-slate-900 dark:text-white text-4xl font-black group-hover:text-primary transition-colors duration-300">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsBar
