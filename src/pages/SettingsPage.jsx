import { useState } from 'react'

const SettingsPage = () => {
  const [publicCareerMap, setPublicCareerMap] = useState(true)
  const [certificationVerification, setCertificationVerification] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState({
    jobAlerts: true,
    skillAssessments: true,
    weeklySummaries: false
  })
  const [pushNotifications, setPushNotifications] = useState({
    courseUpdates: true,
    mentorMessages: false
  })

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-8 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">explore</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Global Skills Explorer</h2>
          </div>
          <div className="hidden md:flex flex-col min-w-64">
            <div className="flex w-full items-stretch rounded-lg h-10 bg-slate-100 dark:bg-slate-800">
              <div className="text-slate-500 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-slate-500 text-slate-900 dark:text-slate-100" 
                placeholder="Search skills, jobs, or mentors..." 
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKQznhmAk4bTm-X8lWvv4XL4xDAUQ4rBm8AfAM8ulWH6wpckhPaTKsAQUGq1Xio08KQon5oPWaUWHySB2nfonmfHD2C7EEghLxee8zIDIqVC_fSWZk8TjFi5JJwBhxmi__1kxGsbeXat-liInpekai71TvKZLDoM5vl_m6s-VpdBDba52R-VYknccO6aSuKVP9PzLpSTGwTN-dKpMwq2mjG-BYrYfxdtg-GZ20GU6yAaxw4lyvH28SQVDtjrOd2v3BQP1fVU_i6mdS")'}}
          />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col p-4 sticky top-[65px] h-[calc(100vh-65px)]">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex gap-3 items-center px-2">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-primary/20" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQpwcHfi_Bqeb_h3lzueKTRGf-BrqQqXYleOr1zHLEfRPwaciLziZtWP43Mh5QFgDWpHXOWHmy7YmLNdVtja8SzgmYZEJQk9LK7k7tpWUIKlvLeKYaXMMzT7KkmHPo0A7UV0IxZpAZdb8Yw6Ptj7SIcK5iqki1X5BsaOWMG2QUKfa-NOPH99X-YcO3JfT9DQso-FT6xA4Tj11ipycYfsJQyJgXMsGlsDfQWS_TC_xZhX5EqxGgOSP9X8PROQ9Q2oOeq1Mp9kEodrxa")'}}
              />
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-slate-900 dark:text-white text-sm font-bold truncate">Alex Morgan</h1>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider">Pro Professional</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              <a 
                href="/dashboard" 
                className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a 
                href="/career-path" 
                className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">map</span>
                <span className="text-sm font-medium">Career Map</span>
              </a>
              <a 
                href="/certifications" 
                className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">verified</span>
                <span className="text-sm font-medium">Certifications</span>
              </a>
              <a 
                href="/skill-assessments" 
                className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">school</span>
                <span className="text-sm font-medium">Learning Hub</span>
              </a>
              <a 
                href="/settings" 
                className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20"
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-bold">Settings</span>
              </a>
            </nav>

            <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4">
              <a 
                href="/auth/login" 
                className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-medium">Logout</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl mx-auto px-6 py-8 w-full">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences, privacy, and integrations.</p>
          </div>

          {/* Subscription Banner */}
          <div className="mb-10 bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-primary rounded-full flex items-center justify-center text-white">
                <span className="material-symbols-outlined">star</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Pro Professional Plan</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Your subscription renews on Oct 12, 2024</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                Manage Billing
              </button>
              <button className="px-4 py-2 text-sm font-bold bg-primary text-slate-900 rounded-lg hover:opacity-90 transition-opacity">
                Upgrade Plan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 pb-20">
            {/* Account Preferences */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Account Preferences
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Email Address</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">alex.career@explorer.com</p>
                    </div>
                  </div>
                  <button className="text-primary text-sm font-bold hover:underline">Edit</button>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Password</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">••••••••••••</p>
                    </div>
                  </div>
                  <button className="text-primary text-sm font-bold hover:underline">Change</button>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined">language</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Language</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">English (United States)</p>
                    </div>
                  </div>
                  <button className="text-primary text-sm font-bold hover:underline">Change</button>
                </div>
              </div>
            </section>

            {/* Privacy & Visibility */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">visibility</span>
                Privacy & Visibility
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="max-w-md">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Public Career Map</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Allow recruiters and other users to view your career path and progress.</p>
                  </div>
                  <button
                    onClick={() => setPublicCareerMap(!publicCareerMap)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      publicCareerMap ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`${
                        publicCareerMap ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="max-w-md">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Certification Verification</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enable external verification for your earned certificates via a public URL.</p>
                  </div>
                  <button
                    onClick={() => setCertificationVerification(!certificationVerification)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      certificationVerification ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`${
                        certificationVerification ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                Notification Settings
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Email Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailNotifications.jobAlerts}
                          onChange={(e) => setEmailNotifications({...emailNotifications, jobAlerts: e.target.checked})}
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">New job alerts & opportunities</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailNotifications.skillAssessments}
                          onChange={(e) => setEmailNotifications({...emailNotifications, skillAssessments: e.target.checked})}
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Skill assessment reminders</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailNotifications.weeklySummaries}
                          onChange={(e) => setEmailNotifications({...emailNotifications, weeklySummaries: e.target.checked})}
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Weekly progress summaries</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Push Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pushNotifications.courseUpdates}
                          onChange={(e) => setPushNotifications({...pushNotifications, courseUpdates: e.target.checked})}
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Course & learning updates</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pushNotifications.mentorMessages}
                          onChange={(e) => setPushNotifications({...pushNotifications, mentorMessages: e.target.checked})}
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Mentor messages</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Connected Accounts */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">link</span>
                Connected Accounts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-[#0077b5]/10 flex items-center justify-center rounded text-[#0077b5]">
                      <span className="material-symbols-outlined">work</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</span>
                  </div>
                  <button className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                    Disconnect
                  </button>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-[#333]/10 dark:bg-white/10 flex items-center justify-center rounded text-slate-900 dark:text-white">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">GitHub</span>
                  </div>
                  <button className="text-xs bg-primary text-slate-900 px-3 py-1.5 rounded font-bold hover:opacity-90">
                    Connect
                  </button>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-[#ff6600]/10 flex items-center justify-center rounded text-[#ff6600]">
                      <span className="material-symbols-outlined">badge</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Credly</span>
                  </div>
                  <button className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                    Disconnect
                  </button>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-10">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-600 dark:text-red-500/80 mb-4">
                  Deleting your account is permanent and cannot be undone. All your progress, certifications, and career map will be lost.
                </p>
                <button className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SettingsPage
