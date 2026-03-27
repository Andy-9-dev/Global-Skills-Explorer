import { Outlet } from 'react-router-dom'
import AuthHeader from './AuthHeader'

const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="layout-container flex h-full grow flex-col">
        <AuthHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="p-6 text-center text-slate-400 dark:text-slate-500 text-sm">
          © 2024 Global Skills Explorer. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default AuthLayout
