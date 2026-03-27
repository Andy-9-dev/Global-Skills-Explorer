const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/5 dark:to-blue-500/5 px-6 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Cookie Policy</h1>
          <p className="text-slate-600 dark:text-slate-400">Last updated: March 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-20 lg:px-40 py-16">
        <div className="max-w-4xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. What Are Cookies?</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Cookies are small pieces of data stored on your device (computer, mobile phone, or tablet) when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. How We Use Cookies</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Global Skills Explorer uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Track your activity to show relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Session Cookies</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  These cookies are temporary and are deleted when you close your browser. They help us maintain your session while you're using our website.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Persistent Cookies</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  These cookies remain on your device for a set period of time. They help us remember your preferences and settings.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Third-Party Cookies</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  These are set by third-party services we use, such as analytics providers and advertising networks.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Your Cookie Choices</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise this right by setting your browser preferences. Most browsers allow you to refuse cookies or alert you when cookies are being sent.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Please note that if you choose to reject cookies, you may not be able to use all the features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. How to Control Cookies</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              You can control and/or delete cookies as you wish. For more information, visit allaboutcookies.org. You can delete all cookies that are already on your computer and set most browsers to prevent them from being placed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Changes to This Cookie Policy</h2>
            <p className="text-slate-600 dark:text-slate-400">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400">
              If you have any questions about this Cookie Policy, please contact us at cookies@globalskillsexplorer.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicyPage
