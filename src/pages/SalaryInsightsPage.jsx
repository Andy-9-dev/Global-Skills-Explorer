import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { fetchSalaryTrends, fetchTopPayingCompanies, fetchCostOfLivingData, calculateSalaryEstimate } from '../services/salaryApi'
import { SkeletonChart, SkeletonList } from '../components/SkeletonLoader'
import SalaryInsightsLayout from '../components/SalaryInsightsLayout'

const SalaryInsightsPage = () => {
  const [activeTab, setActiveTab] = useState('trends')
  const [selectedRole, setSelectedRole] = useState('Backend Engineer')
  const [experience, setExperience] = useState(5)
  const [skills, setSkills] = useState(['React', 'Node.js', 'AWS'])

  // Fetch salary data
  const { data: salaryTrends, loading: trendsLoading } = useFetch(() => fetchSalaryTrends())
  const { data: topCompanies, loading: companiesLoading } = useFetch(() => fetchTopPayingCompanies())
  const { data: costOfLiving, loading: costLoading } = useFetch(() => fetchCostOfLivingData())

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove))
  }

  const salaryEstimate = calculateSalaryEstimate(selectedRole, experience, skills)

  return (
    <SalaryInsightsLayout>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Salary Insights</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100" 
              placeholder="Search hubs or roles..." 
              type="text"
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Title */}
        <section>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-slate-100">Global Salary Intelligence</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Detailed compensation mapping for the global tech ecosystem.</p>
        </section>

        {/* Tabs Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-800 flex gap-8 overflow-x-auto">
          {[
            { id: 'trends', label: 'Market Trends' },
            { id: 'living', label: 'Cost of Living' },
            { id: 'calculator', label: 'Salary Calculator' },
            { id: 'companies', label: 'Top Companies' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-slate-900 dark:text-slate-100 font-bold'
                  : 'border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Salary Trends Chart Card */}
          {(activeTab === 'trends' || activeTab === 'living') && (
            <>
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                {trendsLoading ? (
                  <SkeletonChart />
                ) : salaryTrends ? (
                  <>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{salaryTrends.role}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{salaryTrends.location}</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
                        <span className="material-symbols-outlined text-xs">trending_up</span>
                        {salaryTrends.trend}
                      </div>
                    </div>
                    <div className="h-64 relative mb-4">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#13c8ec" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#13c8ec" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0 85 C 20 80, 40 40, 60 55 S 80 15, 100 20 V 100 H 0 Z" fill="url(#chartGradient)" />
                        <path d="M0 85 C 20 80, 40 40, 60 55 S 80 15, 100 20" fill="none" stroke="#13c8ec" strokeLinecap="round" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="flex justify-between px-2">
                      {salaryTrends.data.map((item) => (
                        <span key={item.year} className="text-xs font-bold text-slate-400">{item.year}</span>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>

              {/* Cost of Living Hubs */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-base font-semibold mb-4 text-slate-900 dark:text-slate-100">Cost of Living Hubs</h3>
                {costLoading ? (
                  <SkeletonList count={4} />
                ) : costOfLiving ? (
                  <>
                    <div className="space-y-4">
                      {costOfLiving.map((hub) => (
                        <div key={hub.city} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{hub.city}</span>
                          </div>
                          <span className={`text-xs font-bold ${hub.color}`}>{hub.level}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-2 border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg text-sm font-bold transition-colors">
                      Compare Details
                    </button>
                  </>
                ) : null}
              </div>
            </>
          )}

          {/* Salary Calculator */}
          {activeTab === 'calculator' && (
            <div className="lg:col-span-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Personalized Calculator</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Role</label>
                      <select 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 p-2"
                      >
                        <option>Backend Engineer</option>
                        <option>Frontend Engineer</option>
                        <option>Data Scientist</option>
                        <option>DevOps Specialist</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Experience (Years)</label>
                      <input 
                        type="number" 
                        value={experience}
                        onChange={(e) => setExperience(parseInt(e.target.value))}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Primary Skills</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="material-symbols-outlined text-xs cursor-pointer hover:text-primary">close</button>
                        </span>
                      ))}
                      <button className="px-3 py-1 border border-dashed border-primary text-primary rounded-full text-xs font-bold hover:bg-primary/10 dark:hover:bg-primary/20">+ Add Skill</button>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-primary/10 lg:border-t-0 lg:border-l lg:pl-8 text-center lg:text-left flex flex-col justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Estimated Market Value</p>
                  <p className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight">{salaryEstimate.formatted}</p>
                  <button className="px-8 py-3 bg-primary text-slate-900 font-bold rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-shadow w-full lg:w-auto">
                    Get Detailed Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top Paying Companies */}
          {activeTab === 'companies' && (
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined text-primary">verified</span>
                Top Paying Companies for Your Profile
              </h3>
              {companiesLoading ? (
                <SkeletonList count={4} />
              ) : topCompanies ? (
                <div className="space-y-6">
                  {topCompanies.map((company) => (
                    <div key={company.id} className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img className="size-full object-cover" alt={company.name} src={company.logo} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{company.name}</h4>
                          <span className="text-sm font-black text-slate-900 dark:text-slate-100">{company.salary}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{company.skills}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              <button className="w-full mt-6 text-center text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                View More Companies
              </button>
            </div>
          )}
        </div>

        {/* Global Tech Hub Distribution Map */}
        {activeTab === 'trends' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Global Tech Hub Distribution</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Salary to Cost-of-Living ratio by region.</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                </button>
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-sm">download</span>
                </button>
              </div>
            </div>
            <div className="h-80 bg-slate-100 dark:bg-slate-800 relative group">
              <img 
                className="size-full object-cover opacity-50 dark:opacity-30" 
                alt="World map with data visualization overlays" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ygOlyHOiGi-ZXNNDUBWbIHitbF7gATJjCPH7T7TXpEFg4Np7sZB04pbClJS657NMs5ZpJpDPwh8hbv6ojc9Bnvkl1cupDCROnyWTWbPVKB5mZvrIqjz_UKuM_ACXHV25VATpFM-5-JmqzfIfnRU_wDrPgN5ZMaTMCSi70G7oP1zfcHZd_IjXu7NoNpY26FDlgos4oOujfbvyzt5huxTUKi46Cna-V6kf67dxlJepNXIlebVVtjlG0JoDjk8cv1wQDVaZCCGjTYtr"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-2xl border border-primary/20 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="size-3 bg-primary rounded-full"></span>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Spotlight: Berlin</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                    Top-tier salary vs moderate cost of living makes Berlin one of the most attractive hubs for 2024.
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Efficiency Score</span>
                    <span className="text-sm font-black text-emerald-500">8.9/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SalaryInsightsLayout>
  )
}

export default SalaryInsightsPage
