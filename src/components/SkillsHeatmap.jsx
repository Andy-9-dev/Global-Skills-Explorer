import { useState } from 'react'

const SkillsHeatmap = ({ selectedSkills }) => {
  const [viewMode, setViewMode] = useState('world')

  return (
    <div className="flex flex-col gap-2" id="heatmap">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skills Demand Heatmap</h1>
          <p className="text-sm text-slate-500">
            Visualizing where {selectedSkills.join(' and ')} are most in demand globally
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <button
            onClick={() => setViewMode('world')}
            className={`px-4 py-1.5 rounded-md text-xs font-${viewMode === 'world' ? 'bold' : 'medium'} transition-all duration-300 ${
              viewMode === 'world'
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            World View
          </button>
          <button
            onClick={() => setViewMode('region')}
            className={`px-4 py-1.5 rounded-md text-xs font-${viewMode === 'region' ? 'bold' : 'medium'} transition-all duration-300 ${
              viewMode === 'region'
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Region Detail
          </button>
        </div>
      </div>

      <div className="relative w-full h-[450px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-80 dark:opacity-40"
            alt="High quality satellite world map showing night lights"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWm5V_tX61c5LsH_MbRAJw1WaszsuA3D4CkjN_SVV3MedGYko7zBXowLC3B28UtpX7u2HcbV66C66bhWBZcasXPfNXozfwqiJvyQVTw_7bZRakK8BiKGdgZIRH9SELqhT7IZW9QEznbuDPqvjhP0N03Db7DN0BnaLui8uEnv6XRmVO2HBxQPTM3YBk5zVpVlnHDGqREpMrzFreyOw38UY1akCnhSq4Gy2f9V8HY9ikKUV2AC8KRh0mHwRzSw9PFcHogo62MFYk28JJ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent opacity-20"></div>
          
          {/* Glow effects */}
          <div className="absolute top-24 left-[20%] size-20 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-48 left-[45%] size-32 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-[25%] size-24 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>

          {/* Data points */}
          <div className="absolute top-1/4 left-1/3 group/marker hover:scale-110 transition-transform duration-300">
            <div className="relative flex flex-col items-center">
              <div className="size-4 bg-primary rounded-full animate-ping absolute"></div>
              <div className="size-4 bg-primary rounded-full relative z-10 border-2 border-white shadow-lg"></div>
              <div className="mt-2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-md border border-slate-100 dark:border-slate-700 opacity-0 group-hover/marker:opacity-100 transition-opacity">
                <p className="text-[10px] font-bold whitespace-nowrap">USA: High Demand</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1/2 right-1/4 group/marker hover:scale-110 transition-transform duration-300">
            <div className="relative flex flex-col items-center">
              <div className="size-3 bg-primary/60 rounded-full"></div>
              <div className="mt-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded shadow-sm border border-slate-100 dark:border-slate-700 opacity-0 group-hover/marker:opacity-100 transition-opacity">
                <p className="text-[10px] font-bold whitespace-nowrap">India: Growing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="size-9 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">add</span>
          </button>
          <button className="size-9 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">remove</span>
          </button>
          <button className="size-9 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">my_location</span>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Demand Legend</h4>
          <div className="flex items-center gap-3">
            <div className="h-2 w-32 bg-gradient-to-r from-primary/10 to-primary rounded-full"></div>
            <span className="text-[10px] font-medium text-slate-500 uppercase">High Demand</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsHeatmap
