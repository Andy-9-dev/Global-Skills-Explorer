import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import AuthLayout from './components/AuthLayout'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CareerPathPage from './pages/CareerPathPage'
import SkillAssessmentsPage from './pages/SkillAssessmentsPage'
import CertificationsPage from './pages/CertificationsPage'
import ShareProfilePage from './pages/ShareProfilePage'
import JobsPage from './pages/JobsPage'
import JobDiscoveryPage from './pages/JobDiscoveryPage'
import CompanyProfilePage from './pages/CompanyProfilePage'
import SalaryInsightsPage from './pages/SalaryInsightsPage'
import InsightsPage from './pages/InsightsPage'
import SettingsPage from './pages/SettingsPage'
import CareersPage from './pages/CareersPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiePolicyPage from './pages/CookiePolicyPage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      
      {/* About Page - Public */}
      <Route path="/about" element={<AboutPage />} />
      
      {/* Auth Routes - Public Access */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Dashboard Routes - Protected */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
      </Route>

      {/* Career Path Route - Protected */}
      <Route path="/career-path" element={<DashboardLayout />}>
        <Route index element={
          <ProtectedRoute>
            <CareerPathPage />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/skill-assessments" element={<DashboardLayout />}>
        <Route index element={
          <ProtectedRoute>
            <SkillAssessmentsPage />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/certifications" element={<DashboardLayout />}>
        <Route index element={
          <ProtectedRoute>
            <CertificationsPage />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/certifications/:id" element={<DashboardLayout />}>
        <Route index element={
          <ProtectedRoute>
            <div className="p-8 text-center"><h1 className="text-2xl font-bold">Certification Detail</h1><p className="text-slate-500 mt-2">Certification learning path coming soon</p></div>
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/share-profile" element={<ShareProfilePage />} />

      <Route path="/jobs" element={<JobsPage />} />

      <Route path="/job-discovery" element={<JobDiscoveryPage />} />

      <Route path="/company/:companySlug" element={<CompanyProfilePage />} />

      <Route path="/insights" element={<DashboardLayout />}>
        <Route index element={
          <ProtectedRoute>
            <InsightsPage />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/insights/salary" element={<DashboardLayout />}>
        <Route index element={
          <ProtectedRoute>
            <SalaryInsightsPage />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/job-search" element={<Navigate to="/jobs" replace />} />

      <Route path="/settings" element={<SettingsPage />} />

      <Route path="/careers" element={<CareersPage />} />

      <Route path="/privacy" element={<PrivacyPage />} />

      <Route path="/terms" element={<TermsPage />} />

      <Route path="/cookie-policy" element={<CookiePolicyPage />} />

      <Route path="/search" element={<SearchPage />} />

      {/* Redirect /explorer to /dashboard */}
      <Route path="/explorer" element={<Navigate to="/dashboard" replace />} />
    </Routes>
    </ErrorBoundary>
  )
}

export default App
