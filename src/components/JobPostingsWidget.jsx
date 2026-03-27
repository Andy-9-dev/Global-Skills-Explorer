import { Link } from 'react-router-dom'

const JobPostingsWidget = ({ jobs }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Top Job Postings
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] text-slate-500 font-semibold">
            1,248 New
          </span>
        </h2>
        <Link to="/job-search">
          <button className="text-xs font-semibold text-primary hover:underline transition-all">
            View All
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              {job.logo === 'linkedin' ? (
                <svg className="size-8" fill="#0077b5" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.1 0-1.9.6-2.2 1.3V10.5h-2.3v7.3h2.4v-3.7c0-.9.2-1.7 1.3-1.7 1.1 0 1.1 1 1.1 1.8v3.6h2.4M6.7 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.2 10V10.5H5.5v7.3h2.4z"></path>
                </svg>
              ) : job.logo === 'twitter' ? (
                <svg className="size-8" fill="#ff6600" viewBox="0 0 24 24">
                  <path d="M12.4 20.3c-2.3 0-4.3-.7-6-2.1-1.7-1.4-2.8-3.4-3.1-5.7.3 0 .7.1 1.1.1.8 0 1.5-.2 2.1-.5.7-.3 1.2-.8 1.5-1.4.3-.6.4-1.3.4-2.1 0-.6-.1-1.2-.2-1.7-.5 0-1-.1-1.4-.4-.5-.2-.9-.6-1.1-1.1-.3-.5-.4-1.1-.4-1.7 0-.5.1-1 .3-1.5.8 1 1.8 1.8 2.9 2.4 1.1.6 2.4 1 3.7 1h.5c0-.6.2-1.2.5-1.7.3-.5.7-.9 1.2-1.1.5-.3 1.1-.4 1.7-.4s1.2.1 1.7.4c.5.2.9.6 1.2 1.1.3.5.5 1.1.5 1.7 0 .5-.1 1-.3 1.5.8 0 1.5-.1 2.2-.4.6-.2 1.1-.5 1.6-.9-.3.9-1 1.6-1.8 2.1 1.1 0 2.2-.3 3.1-.8-.7 1.1-1.6 2-2.7 2.6v.7c0 2.3-.6 4.3-1.8 6.1-1.2 1.8-2.8 3.2-4.9 4.1-2.1.9-4.5 1.4-7.2 1.4"></path>
                </svg>
              ) : (
                <span className="material-symbols-outlined text-primary text-3xl">work</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{job.title}</h4>
              <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{job.salary}</p>
              <p className="text-[10px] text-slate-400">{job.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobPostingsWidget
