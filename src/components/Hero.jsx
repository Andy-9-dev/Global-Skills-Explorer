import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Hero = () => {
  const [showModal, setShowModal] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <>
      <div className="px-6 md:px-20 lg:px-40 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-4">
              <h1 className="text-slate-900 dark:text-white text-5xl md:text-6xl font-black leading-[1.1] tracking-tight animate-fade-in">
                Master the <span className="text-primary">Global</span> Job Market
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-[540px]">
                Navigate your career with real-time data, precision skill mapping, and global salary benchmarking. Join the future of work today.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/auth/login"
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-slate-900 text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-300"
              >
                Start Exploring
              </Link>
              <button 
                onClick={() => setShowModal(true)}
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-primary/20 bg-transparent text-slate-900 dark:text-white text-base font-bold hover:bg-primary/5 hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative aspect-square md:max-w-[500px]">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse"></div>
            <div 
              className="relative w-full h-full bg-cover bg-center rounded-2xl shadow-2xl border border-primary/10 hover:scale-105 transition-transform duration-500 animate-float"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCA-9cjuFgbtvhmUl_erA2ZmwAWEr8Hdf4Od16IB7oHFLxv3P8R_N8bPptVSO7NBPTw8uYTeLq2tK-mx2Iq-4sh2uMOHCtI-kiOYiWDafGy_PrZRGa727RNbkJBdfnKwozNWqpSyrQA-B-aCjblaHczasXVzXeD8p3WU0SVzHrd2o1YstaXAlBlRi6aZqUBreATHXXaFcxfGXhk6GQsjLOOLrXKy4DFCRWVHB-mo-3hV_NWQpiLSNdUeumRsvMLnfmc1FgSbynef2xT")'
              }}
            ></div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-background-dark p-6 rounded-2xl shadow-xl border border-primary/10 flex items-center gap-4 hover:scale-110 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="bg-primary/10 p-3 rounded-full">
                <span className="material-symbols-outlined text-primary">trending_up</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Market Growth</p>
                <p className="text-xl font-bold">+24% Global Reach</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">close</span>
            </button>
            <div className="aspect-video bg-slate-900 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Global Skills Explorer Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
