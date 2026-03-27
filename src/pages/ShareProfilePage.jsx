import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useProfile } from '../hooks/useProfile'
import { useToast } from '../context/ToastContext'

const ShareProfilePage = () => {
  const navigate = useNavigate()
  const { profile, user, loading, updateProfile, uploadAvatar } = useProfile()
  const { success, error: showError } = useToast()
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ headline: '', country: '' })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  // Initialize edit data when profile loads
  useEffect(() => {
    if (profile) {
      setEditData({
        headline: profile.headline || '',
        country: profile.country || ''
      })
    }
  }, [profile])

  const handleClose = () => {
    navigate('/certifications')
  }

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/share-profile`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLinkedIn = () => {
    const url = `${window.location.origin}/share-profile`
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  const handleDownloadPDF = () => {
    alert('PDF download feature coming soon')
  }

  const handleEmail = () => {
    const url = `${window.location.origin}/share-profile`
    window.location.href = `mailto:?subject=Check out my profile&body=${encodeURIComponent(url)}`
  }

  const handleMore = () => {
    alert('More sharing options coming soon')
  }

  const handleDownloadQR = () => {
    alert('QR code download coming soon')
  }

  const handleEditPrivacy = () => {
    navigate('/settings')
  }

  const handleCareerMapClick = () => {
    navigate('/career-path')
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const result = await uploadAvatar(file)
    setUploading(false)

    if (!result.success) {
      showError(`Failed to upload avatar: ${result.error}`)
    } else {
      success('Avatar uploaded successfully!')
    }
  }

  const handleSaveProfile = async () => {
    const result = await updateProfile(editData)
    if (result.success) {
      setIsEditing(false)
      success('Profile updated successfully!')
    } else {
      showError(`Failed to update profile: ${result.error}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="size-12 border-4 border-slate-200 dark:border-slate-800 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Please log in to view your profile</p>
          <button
            onClick={() => navigate('/auth/login')}
            className="px-4 py-2 bg-primary text-white rounded-lg font-bold"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 lg:px-12 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="text-primary">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_330)">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_330">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Share Profile</h2>
        </div>
        <button
          onClick={handleClose}
          className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">close</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Preview */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <button
                      onClick={handleAvatarClick}
                      disabled={uploading}
                      className="relative group"
                    >
                      <div
                        className="w-32 h-32 rounded-full border-4 border-primary/20 bg-center bg-cover bg-slate-200 dark:bg-slate-800 flex items-center justify-center"
                        style={profile.avatar_url ? { backgroundImage: `url("${profile.avatar_url}")` } : {}}
                      >
                        {!profile.avatar_url && (
                          <span className="material-symbols-outlined text-4xl text-slate-400">account_circle</span>
                        )}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {uploading ? 'hourglass_empty' : 'camera_alt'}
                        </span>
                      </div>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <div className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full border-2 border-white dark:border-slate-900">
                      <span className="material-symbols-outlined text-xs">verified</span>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <h1 className="text-3xl font-bold">{profile.full_name || 'Your Name'}</h1>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.headline}
                      onChange={(e) => setEditData({ ...editData, headline: e.target.value })}
                      placeholder="Add your headline"
                      className="mt-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400 font-medium text-lg w-full max-w-xs"
                    />
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400 font-medium text-lg mt-1">
                      {profile.headline || 'Add your headline'}
                    </p>
                  )}
                  <p className="text-primary text-sm font-semibold mt-2">Global Skills Explorer Member</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8 w-full">
                    <div className="p-6 rounded-lg bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <p className="text-3xl font-bold text-primary">0</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-3">Certifications</p>
                    </div>
                    <div className="p-6 rounded-lg bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <p className="text-3xl font-bold text-primary">0</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-3">Skills</p>
                    </div>
                    <div className="p-6 rounded-lg bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <p className="text-3xl font-bold text-primary">0</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-3">Project Maps</p>
                    </div>
                  </div>

                  {/* Edit Button */}
                  {isEditing ? (
                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Career Map Preview */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                <h3 className="text-lg font-bold mb-4">Career Map Preview</h3>
                <button
                  onClick={handleCareerMapClick}
                  className="relative w-full aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 hover:opacity-90 transition-opacity group flex items-center justify-center"
                >
                  <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-400 mb-2 block">map</span>
                    <p className="text-slate-500 font-medium">View your career path</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column - Sharing Options */}
            <div className="md:col-span-1 space-y-6">
              {/* Sharing Options Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-6">Sharing Options</h3>

                {/* Profile URL */}
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-sm font-semibold text-slate-500">Profile URL</label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-primary placeholder:text-slate-400 truncate"
                      readOnly
                      type="text"
                      value={`${window.location.origin}/share-profile`}
                    />
                    <button
                      onClick={handleCopyUrl}
                      className="bg-primary text-slate-900 font-bold px-3 py-2 rounded-lg text-xs hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={handleLinkedIn}
                    className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                    <span className="text-xs font-bold">LinkedIn</span>
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                    <span className="text-xs font-bold">PDF</span>
                  </button>
                  <button
                    onClick={handleEmail}
                    className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">mail</span>
                    <span className="text-xs font-bold">Email</span>
                  </button>
                  <button
                    onClick={handleMore}
                    className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">more_horiz</span>
                    <span className="text-xs font-bold">More</span>
                  </button>
                </div>

                {/* QR Code Section */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center">
                  <p className="text-xs font-semibold text-slate-500 mb-4 text-center">Scan to view profile on mobile</p>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-inner border border-slate-200 dark:border-slate-700">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-slate-400">qr_code</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadQR}
                    className="mt-3 text-primary text-xs font-bold hover:underline transition-colors"
                  >
                    Download QR Code
                  </button>
                </div>
              </div>

              {/* Privacy Settings Card */}
              <div className="bg-primary/10 dark:bg-primary/5 rounded-xl border border-primary/20 p-6">
                <div className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-primary p-2 bg-white dark:bg-slate-900 rounded-lg text-sm shrink-0">
                    visibility
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Public Settings</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Your contact information is currently hidden from public view. Only skills and certifications are visible.
                    </p>
                    <button
                      onClick={handleEditPrivacy}
                      className="mt-3 text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Edit privacy settings
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 lg:px-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500">© 2024 Global Skills Explorer. Empowering talent worldwide.</p>
          <div className="flex gap-6">
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ShareProfilePage
