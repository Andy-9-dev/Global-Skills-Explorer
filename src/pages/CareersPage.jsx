import { useNavigate } from 'react-router-dom'

const CareersPage = () => {
  const navigate = useNavigate()

  const positions = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our team to build the future of global talent insights.'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Lead product strategy for our career intelligence platform.'
    },
    {
      id: 3,
      title: 'Data Scientist',
      department: 'Data',
      location: 'Remote',
      type: 'Full-time',
      description: 'Analyze global job market trends and build predictive models.'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Design beautiful interfaces for our analytics platform.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/5 dark:to-blue-500/5 px-6 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Join Our Team</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Help us build the future of global talent intelligence. We're looking for talented individuals who are passionate about making a difference.
          </p>
        </div>
      </div>

      {/* Positions */}
      <div className="px-6 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Open Positions</h2>
          
          <div className="space-y-4">
            {positions.map(position => (
              <div key={position.id} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{position.department}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 rounded-full text-xs font-semibold">
                    {position.type}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{position.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {position.location}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/5 dark:to-blue-500/5 px-6 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Don't see a position that fits?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We're always looking for talented individuals. Send us your resume and let's talk!
          </p>
          <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors">
            Send Your Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default CareersPage
