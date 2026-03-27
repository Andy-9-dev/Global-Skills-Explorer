import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const CompanyProfilePage = () => {
  const { companySlug } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('culture')
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock company data - API-ready structure
  const companyData = {
    'techflow-systems': {
      name: 'TechFlow Systems',
      slug: 'techflow-systems',
      description: 'Innovating the future of distributed cloud infrastructure and automated dev-ops solutions. Empowering teams to ship faster and scale effortlessly.',
      location: 'San Francisco, CA (HQ)',
      size: '850 Employees',
      remotePolicy: 'Remote Friendly',
      hiringNow: true,
      icon: 'cloud_done',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      cultureImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLeyylbf-1U04VhRKcpY6cFkQ15KnCejUChM7pucZkzx5evLtwg2OoWynl6MRBb8Z51dOAur1V0k7Yowpj3XKmwH3zUVaDfDguUQrnpGI3Fv7O2kBW98LlfKN9mrMQMgMr4wRWo9gUI9AqOPPrwtVyq4OzRasCfIqo8JDPRhQ-_76op76qanlfMykPwBWIGHw3u1_1lTFG2pvaah7nFke-kLhRM1w4fatxE59pCf1K4xneq14Ec0DYCsKLW4NVAk_DKGa9ESaZ8I8',
      locationImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlV4mLghjdSkDlnuqoN0tLaSrmTvlsjJy0X1iywUez-nOvupuX4xJmHnIl7K4ZenY79aHb9cHIGYPHLCv_j4v4oaonZy1qT6FVYhX3t1J_JZrrPSGrmSNSsV6knov1RTBioqetAoT1xpcGAVEmxRqdlBLPNcX9O_4_DMkG0gYhcbAvj3qfoyL_vJIGqi41lqHU9A6hY6ILPkweHkY0hapVYHXH5G9sXua28-eWfrqgAKX-183pQ2dA9JqTEUqc7WQUzrZHzgFQd8MJ',
      address: '450 Mission St, Suite 200\nSan Francisco, CA 94105',
      values: [
        'Radical transparency across all levels.',
        'Continuous learning budget ($5k/year).',
        'Owner mentality with equity for all.'
      ],
      growthStats: [
        { label: 'Yearly Growth', value: '42%' },
        { label: 'Retention', value: '94%' },
        { label: 'Avg Tenure', value: '3.2y' },
        { label: 'Nationalities', value: '15+' }
      ],
      salaryBenchmarks: [
        { role: 'Software Engineer (L4)', range: '$140k - $190k', percentage: 85 },
        { role: 'Product Manager', range: '$130k - $175k', percentage: 78 },
        { role: 'UX Designer', range: '$110k - $160k', percentage: 70 },
        { role: 'DevOps Engineer', range: '$145k - $205k', percentage: 90 }
      ],
      openRoles: [
        {
          id: 1,
          title: 'Senior Distributed Systems Engineer',
          department: 'Cloud Infrastructure',
          location: 'Remote / SF',
          isNew: true,
          skills: ['Rust', 'Kubernetes', 'gRPC']
        },
        {
          id: 2,
          title: 'Product Designer (UX/UI)',
          department: 'Product Team',
          location: 'London / Remote',
          isNew: false,
          skills: ['Figma', 'Systems Thinking', 'Prototyping']
        },
        {
          id: 3,
          title: 'Developer Advocate',
          department: 'Growth',
          location: 'Remote (EMEA)',
          isNew: false,
          skills: ['Technical Writing', 'Public Speaking']
        }
      ]
    }
  }

  const company = companyData[companySlug]

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Company Not Found</h1>
          <button
            onClick={() => navigate('/jobs')}
            className="text-primary hover:underline font-semibold"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">
              TechFlow Systems
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-9">
            <button
              onClick={() => scrollToSection('culture')}
              className={`text-sm font-medium leading-normal transition-colors ${
                activeTab === 'culture'
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Culture
            </button>
            <button
              onClick={() => scrollToSection('jobs')}
              className={`text-sm font-medium leading-normal transition-colors ${
                activeTab === 'jobs'
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Jobs
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className={`text-sm font-medium leading-normal transition-colors ${
                activeTab === 'benefits'
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className={`text-sm font-medium leading-normal transition-colors ${
                activeTab === 'reviews'
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-xl">bookmark</span>
            </button>
          </div>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBTbc7OGe_ebfpczWN945sartVsGvvz79lTkICkFncqLOW2B3tJBN76dTPgzTlyOZ-Y02E9GQkugv4wqV8uTZ9Y50hHqk2DztuXqlNb0eXGHvhQlUy2_oDgFk4pmaZwv-rNoWiGxlLlE2IRxbd5zmwRiXlHBzarbEl0fBGAoAX9Z58osZmKAsFnz0PV1FJhZ0XHVqeZQwkm2SHsDKVy1eEqi61Mf5uMTaNlY6I2xIbmYZnWl-OqlS29nw2zDoH5eTFzMChNXvqicsI")'}} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8 @container">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col @[640px]:flex-row gap-6 items-start">
              <div className={`${company.iconBg} rounded-xl size-32 flex items-center justify-center shrink-0 border border-primary/20`}>
                <span className={`material-symbols-outlined text-6xl ${company.iconColor}`}>{company.icon}</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
                  {company.hiringNow && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Hiring Now
                    </span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                  {company.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    {company.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">groups</span>
                    {company.size}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">public</span>
                    {company.remotePolicy}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full @[640px]:w-auto">
                <button className="w-full @[640px]:min-w-[140px] h-11 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Apply Now
                </button>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`w-full @[640px]:min-w-[140px] h-11 font-bold rounded-lg transition-all ${
                    isFollowing
                      ? 'bg-primary/10 text-primary'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Culture Section */}
            <div id="culture" className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">diversity_3</span>
                  Company Culture
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group relative aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      src={company.cultureImage}
                      alt="Company culture"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <p className="text-white font-medium">Collaborative Environment</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary">Values we live by</h4>
                    <ul className="space-y-3">
                      {company.values.map((value, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="material-symbols-outlined text-primary">done_all</span>
                          <span className="text-sm">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Jobs Section */}
            <div id="jobs" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">work</span>
                  Open Positions
                </h3>
                <button
                  onClick={() => navigate('/jobs')}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  View all {company.openRoles.length} jobs
                </button>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {company.openRoles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => navigate('/jobs')}
                    className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                          {role.title}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                          {role.department} • {role.location}
                        </p>
                      </div>
                      {role.isNew && (
                        <span className="text-xs font-bold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div id="benefits" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">card_giftcard</span>
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'health_and_safety', title: 'Health Insurance', desc: 'Comprehensive medical, dental, vision' },
                  { icon: 'trending_up', title: 'Equity Package', desc: 'Stock options for all employees' },
                  { icon: 'school', title: 'Learning Budget', desc: '$5,000/year for courses & conferences' },
                  { icon: 'home', title: 'Remote Friendly', desc: 'Work from anywhere, flexible hours' },
                  { icon: 'family_restroom', title: 'Parental Leave', desc: '16 weeks paid leave' },
                  { icon: 'fitness_center', title: 'Wellness', desc: 'Gym membership & mental health support' }
                ].map((benefit, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl mt-1">{benefit.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{benefit.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">rate_review</span>
                Employee Reviews
              </h3>
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 block mb-4">
                  comment
                </span>
                <p className="text-slate-500 dark:text-slate-400">Reviews coming soon</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Salary Benchmarks */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Salary Benchmarks
              </h3>
              <div className="space-y-6">
                {company.salaryBenchmarks.map((benchmark, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{benchmark.role}</span>
                      <span className="text-slate-500">{benchmark.range}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-500"
                        style={{ width: `${benchmark.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest text-center">
                Base salary + equity packages
              </p>
            </div>

            {/* Growth Stats */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">trending_up</span>
                Growth Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {company.growthStats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100">Office Location</h3>
              <div className="rounded-lg overflow-hidden h-48 relative mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={company.locationImage}
                  alt="Office location"
                />
                <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-primary rounded-full ring-4 ring-white/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-900 font-bold">location_on</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{company.address}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 px-10 mt-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined font-bold">rocket_launch</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">TechFlow Systems</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Building the bridge between hardware and human experience through intelligent software engineering.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Social</h4>
            <div className="flex gap-4">
              <a className="size-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">share_reviews</span>
              </a>
              <a className="size-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">language</span>
              </a>
              <a className="size-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">alternate_email</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          © 2024 TechFlow Systems Inc. All rights reserved. Built with precision in San Francisco.
        </div>
      </footer>
    </div>
  )
}

export default CompanyProfilePage
