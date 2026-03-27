const SalaryInsightsWidget = ({ salaryData }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Salary Insights (Annual USD)</h2>
        <button className="p-1 text-slate-400 hover:text-slate-600 hover:scale-110 transition-all duration-300">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm h-full min-h-[300px] flex flex-col justify-end">
        <div className="flex items-end justify-between gap-4 h-full">
          {salaryData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
              <div
                className={`w-full rounded-t-lg relative transition-all duration-300 ${
                  index === 0
                    ? 'bg-primary/20 group-hover:bg-primary/30'
                    : index === 1
                    ? 'bg-primary/40 group-hover:bg-primary/50'
                    : index === 2
                    ? 'bg-primary group-hover:bg-primary/90'
                    : index === 3
                    ? 'bg-primary/30 group-hover:bg-primary/40'
                    : 'bg-primary/10 group-hover:bg-primary/20'
                }`}
                style={{ height: data.height }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {data.salary}
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{data.region}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-primary"></div>
              <span className="text-[10px] text-slate-500 font-medium">Avg Salary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-primary/20"></div>
              <span className="text-[10px] text-slate-500 font-medium">Growth %</span>
            </div>
          </div>
          <span className="text-xs text-slate-400">Based on last 12 months data</span>
        </div>
      </div>
    </div>
  )
}

export default SalaryInsightsWidget
