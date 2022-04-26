import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ReactGA from 'react-ga'

export default function useGoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    ReactGA.initialize('UA-101192380-5', {
      debug: !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
    })
  }, [])

  useEffect(() => {
    const currentPath = location.pathname + location.search

    ReactGA.set({
      page: currentPath
    })
    ReactGA.pageview(currentPath)
  })
}
