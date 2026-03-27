import { useSearchParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { runSearch } from '../data/searchData'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const results = useMemo(() => runSearch(query), [query])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-10 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-6 transition-colors">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
      </button>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
        Search results for "<span className="text-primary">{query}</span>"
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        {results.jobs.length + results.countries.length} results found
      </p>

      {results.jobs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Jobs</h2>
          <div className="flex flex-col gap-3">
            {results.jobs.map(job => (
              <div key={job.id}
                onClick={() => navigate('/jobs')}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/50 cursor-pointer transition-colors">
                <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-blue-600 text-[20px]">work</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{job.title}</p>
                  <p className="text-xs text-slate-500">{job.company} · {job.location}</p>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {job.skills.slice(0, 2).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.countries.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Countries</h2>
          <div className="flex flex-col gap-3">
            {results.countries.map(country => (
              <div key={country.id}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/50 cursor-pointer transition-colors">
                <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px]">public</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{country.name}</p>
                  <p className="text-xs text-slate-500">{country.skills.slice(0, 3).join(', ')} · {country.demand} demand</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.jobs.length === 0 && results.countries.length === 0 && (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-slate-300">search_off</span>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-300 mt-4">No results found</p>
          <p className="text-sm text-slate-500 mt-1">Try different keywords</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
