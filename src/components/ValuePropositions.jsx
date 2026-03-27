const ValuePropositions = ({ skillsData }) => {
  const features = [
    {
      icon: 'map',
      title: 'Career Mapping',
      description: 'Visualize your professional trajectory and identify the critical skills you need to reach the next tier of your career.'
    },
    {
      icon: 'insights',
      title: 'Real-time Insights',
      description: 'Access live data from 50+ global markets to stay ahead of hiring trends, emerging roles, and industry shifts.'
    },
    {
      icon: 'payments',
      title: 'Salary Benchmarking',
      description: 'Compare your compensation against hyper-local and global industry standards across different currencies.'
    }
  ]

  return (
    <div className="px-6 md:px-20 lg:px-40 py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">
          Empowering Your Career Journey
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-normal">
          Our platform provides the high-fidelity tools you need to stay competitive in an evolving international landscape.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="group flex flex-col gap-6 rounded-3xl bg-white dark:bg-background-dark p-8 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValuePropositions
