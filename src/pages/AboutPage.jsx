const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 lg:px-40 py-4 bg-white dark:bg-background-dark sticky top-0 z-50">
        <a href="/" className="flex items-center gap-4">
          <div className="text-primary size-8">
            <span className="material-symbols-outlined text-4xl">language</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Global Skills Explorer</h2>
        </a>
        <a href="/" className="text-primary font-bold hover:scale-105 transition-transform">← Back</a>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-20 lg:px-40 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              About Global Skills Explorer
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              We're on a mission to empower professionals worldwide with data-driven career intelligence. Our platform combines real-time market data, skill mapping, and salary benchmarking to help you navigate your career with confidence.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To democratize career intelligence and make professional growth accessible to everyone, regardless of location or background. We believe that informed decisions lead to better careers.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                A world where every professional has access to the insights they need to make strategic career decisions. We're building the global standard for career intelligence.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary/10 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Data-Driven</h3>
                <p className="text-slate-600 dark:text-slate-400">Every insight is backed by real market data and trends.</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Transparent</h3>
                <p className="text-slate-600 dark:text-slate-400">We believe in honest, clear communication about career opportunities.</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Inclusive</h3>
                <p className="text-slate-600 dark:text-slate-400">Career growth should be accessible to professionals everywhere.</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-4xl font-black text-primary mb-2">2.4M+</p>
              <p className="text-slate-600 dark:text-slate-400">Active Users</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-4xl font-black text-primary mb-2">850+</p>
              <p className="text-slate-600 dark:text-slate-400">Global Partners</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-4xl font-black text-primary mb-2">150M+</p>
              <p className="text-slate-600 dark:text-slate-400">Data Points</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/20 to-blue-600/20 p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to explore your potential?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Join thousands of professionals using Global Skills Explorer to advance their careers.</p>
            <a 
              href="/auth/login"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-slate-900 font-bold rounded-lg hover:scale-105 transition-transform"
            >
              Get Started
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AboutPage
