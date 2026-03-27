import { useEffect, useState } from 'react'

export const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  }[type]

  const icon = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  }[type]

  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${bgColor} animate-in fade-in slide-in-from-bottom-4 duration-300 z-50`}>
      <span className="material-symbols-outlined text-lg">{icon}</span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
        className="ml-2 hover:opacity-80 transition-opacity"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  )
}

export default Toast
