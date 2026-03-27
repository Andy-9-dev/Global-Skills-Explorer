import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <div className="px-6 md:px-20 lg:px-40 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 p-12 md:p-20 text-center flex flex-col items-center gap-8 hover:scale-[1.02] transition-transform duration-500">
        <div 
          className="absolute inset-0 opacity-20 animate-pulse" 
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #13c8ec 0%, transparent 70%)' }}
        ></div>
        
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl">
          <h2 className="text-white text-4xl md:text-5xl font-black leading-tight">
            Ready to explore your global potential?
          </h2>
          <p className="text-slate-400 text-lg md:text-xl">
            Join thousands of forward-thinking professionals mapping their future with data-driven precision.
          </p>
        </div>
        
        <div className="relative z-10">
          <Link 
            to="/auth/login"
            className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-2xl h-16 px-10 bg-primary text-slate-900 text-lg font-bold shadow-xl shadow-primary/30 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 active:scale-95 transition-all duration-300"
          >
            <span>Get Started Now</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CTA
