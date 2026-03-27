const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/5 dark:to-blue-500/5 px-6 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-600 dark:text-slate-400">Last updated: March 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl prose dark:prose-invert">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Global Skills Explorer ("we", "us", "our") operates the Global Skills Explorer website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Information Collection and Use</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                <li>Personal Data: Name, email address, phone number, cookies and usage data</li>
                <li>Usage Data: Browser type, IP address, pages visited, time and date of visit</li>
                <li>Location Data: Country and region information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Use of Data</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Global Skills Explorer uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information</li>
                <li>To monitor the usage of our Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Security of Data</h2>
              <p className="text-slate-600 dark:text-slate-400">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Changes to This Privacy Policy</h2>
              <p className="text-slate-600 dark:text-slate-400">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Contact Us</h2>
              <p className="text-slate-600 dark:text-slate-400">
                If you have any questions about this Privacy Policy, please contact us at privacy@globalskillsexplorer.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
