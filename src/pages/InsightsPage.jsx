import { useNavigate } from 'react-router-dom'

const insightCards = [
  {
    id: 'salary',
    title: 'Salary Insights',
    description: 'Explore salary ranges by role, region, and experience level. Benchmark your compensation against global market data.',
    icon: 'payments',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600',
    href: '/insights/salary',
    stats: [
      { label: 'Avg. Senior Dev Salary', value: '$125k' },
      { label: 'YoY Growth', value: '+8.4%' }
    ],
    cta: 'View Salary Insights'
  },
  {
    id: 'market',
    title: 'Market Trends',
    description: 'Track hiring trends, in-demand roles, and emerging technologies shaping the global tech job market.',
    icon: 'trending_up',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
    href: '/skill-assessments',
    stats: [
      { label: 'Fastest Growing Role', value: 'ML Engineer' },
      { label: 'Job Postings Up', value: '+34%' }
    ],
    cta: 'Explore Market Trends'
  },
  {
    id: 'skills',
    title: 'Skill Demand',
    description: 'See which skills are most in demand globally. Identify gaps and prioritize learning to stay competitive.',
    icon: 'psychology',
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600',
    href: '/skill-assessments',
    stats: [
      { label: 'Top Skill', value: 'React' },
      { label: 'Demand Surge', value: 'DevOps +41%' }
    ],
    cta: 'View Skill Demand'
  },
  {
    id: 'career',
    title: 'Career Progression',
    description: 'Understand typical career paths, promotion timelines, and what it takes to reach the next level in your field.',
    icon: 'alt_route',
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600',
    href: '/career-path',
    stats: [
      { label: 'Avg. Time to Senior', value: '3.2 yrs' },
      { label: 'Paths Mapped', value: '150+' }
    ],
    cta: 'Explore Career Paths'
  }
]

const highlights = [
  { icon: 'public', label: 'Countries Tracked', value: '150+', color: 'text-blue-600' },
  { icon: 'work', label: 'Job Postings Analyzed', value: '2.4M', color: 'text-emerald-600' },
  { icon: 'school', label: 'Skills Indexed', value: '3,800+', color: 'text-purple-600' },
  { icon: 'trending_up', label: 'Market Updates', value: 'Weekly', color: 'text-orange-600' }
]

const InsightsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-primary">Insights</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Insights Hub</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Data-driven intelligence to guide your career and hiring decisions
        </p>
      </div>

      {/* Highlight Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {highlights.map(h => (
          <div key={h.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="size-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <span className={`material-symbols-outlined ${h.color}`}>{h.icon}</span>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">{h.value}</p>
              <p className="text-[11px] text-slate-500 font-medium">{h.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insightCards.map(card => (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1">
              {/* Card Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`size-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined text-[28px] ${card.iconColor}`}>{card.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{card.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{card.description}</p>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {card.stats.map(stat => (
                  <div key={stat.label} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{stat.label}</p>
                    <p className="text-base font-black text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <button
                onClick={() => navigate(card.href)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all duration-200 group"
              >
                {card.cta}
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Banner */}
      <div className="mt-8 bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold mb-1">Get personalized insights</h3>
          <p className="text-sm text-white/80">Sign in to unlock tailored salary benchmarks and skill gap analysis for your profile.</p>
        </div>
        <button
          onClick={() => navigate('/auth/login')}
          className="shrink-0 px-6 py-2.5 bg-white text-primary font-bold rounded-lg hover:bg-white/90 transition-colors text-sm"
        >
          Sign In to Personalize
        </button>
      </div>
    </div>
  )
}

export default InsightsPage
