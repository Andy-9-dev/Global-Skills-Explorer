import { Link } from 'react-router-dom'

const AuthHeader = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 bg-white dark:bg-slate-900">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="size-8 text-primary transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_330)">
              <path 
                clipRule="evenodd" 
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" 
                fill="currentColor" 
                fillRule="evenodd"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_330">
                <rect fill="white" height="48" width="48" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] group-hover:text-primary transition-colors">
          Global Skills Explorer
        </h2>
      </Link>
      <div className="flex gap-4 items-center">
        <Link 
          to="/"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-all duration-300 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
        <div className="hidden md:flex gap-4 items-center border-l border-slate-200 dark:border-slate-700 pl-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">Need help?</span>
          <a 
            className="text-sm font-medium text-primary hover:underline transition-all" 
            href="#"
          >
            Contact Support
          </a>
        </div>
      </div>
    </header>
  )
}

export default AuthHeader
