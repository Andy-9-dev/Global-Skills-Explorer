import { useState, useEffect } from 'react'

/**
 * Custom hook for fetching data with loading, error, and success states
 * Provides skeleton loader support and automatic fallback handling
 */
export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cached, setCached] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await fetchFn()
        
        if (isMounted) {
          setData(result?.data || null)
          setError(result?.error || null)
          setCached(result?.cached || false)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Unknown error')
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { data, loading, error, cached }
}

/**
 * Hook for multiple parallel fetches
 */
export const useMultipleFetch = (fetchFunctions, dependencies = []) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    let isMounted = true

    const fetchAll = async () => {
      try {
        setLoading(true)
        setErrors({})

        const results = await Promise.all(
          Object.entries(fetchFunctions).map(async ([key, fn]) => {
            try {
              const result = await fn()
              return [key, result?.data || null, result?.error || null]
            } catch (err) {
              return [key, null, err?.message || 'Unknown error']
            }
          })
        )

        if (isMounted) {
          const newData = {}
          const newErrors = {}

          results.forEach(([key, value, error]) => {
            newData[key] = value
            if (error) newErrors[key] = error
          })

          setData(newData)
          setErrors(newErrors)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setErrors({ general: err.message })
          setLoading(false)
        }
      }
    }

    fetchAll()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { data, loading, errors }
}

export default useFetch
