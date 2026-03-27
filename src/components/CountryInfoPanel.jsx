import { useEffect } from 'react'

const CountryInfoPanel = ({ country, countryData, isOpen, onClose, onViewJobs }) => {
  if (!country || !countryData[country]) return null

  const data = countryData[country]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{data.flag}</span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{data.name}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{data.jobs.toLocaleString()} opportunities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Demand & Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 tracking-wide">Demand Level</p>
              <div className="flex items-center gap-2">
                <div
                  className="size-3 rounded-full"
                  style={{
                    backgroundColor: getDemandColor(data.demand),
                    boxShadow: `0 0 8px ${getDemandColor(data.demand)}`
                  }}
                />
                <p className="text-lg font-bold text-slate-900 dark:text-white">{data.demand}</p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 tracking-wide">Avg Salary</p>
              <p className="text-lg font-bold text-primary">{data.salary}</p>
            </div>
          </div>

          {/* Top Skills */}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-3 tracking-wide">Top Skills in Demand</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary rounded-lg text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Job Count */}
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 p-4 rounded-xl border border-primary/20 dark:border-primary/30">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2 tracking-wide">Active Opportunities</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{data.jobs.toLocaleString()}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">positions available in {data.name}</p>
          </div>

          {/* Market Insights */}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-3 tracking-wide">Market Insights</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-700 dark:text-slate-300">Market Growth</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {data.demand === 'High' ? '+18%' : data.demand === 'Growing' ? '+12%' : '+5%'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-700 dark:text-slate-300">Avg Experience</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">3-5 years</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-700 dark:text-slate-300">Remote Friendly</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">65%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onViewJobs(country)}
              className="px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">work</span>
              View Jobs
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const getDemandColor = (demand) => {
  switch (demand) {
    case 'High':
      return '#13c8ec'
    case 'Growing':
      return '#f59e0b'
    default:
      return '#94a3b8'
  }
}

export default CountryInfoPanel
