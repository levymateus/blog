import { useState, useEffect, useCallback } from "react"

const useTheme = () => {
  const [theme, setTheme] = useState()

  const setLocalStorageTheme = useCallback((value) => {
    if (window && window.localStorage) {
      window.localStorage.setItem('theme', value)
    }
  }, [])

  const setAsDark = useCallback(() => {
    setTheme('dark')
    setLocalStorageTheme('dark')
    document.getElementById('root')?.classList.add('dark')
  }, [setTheme, setLocalStorageTheme])

  const setAsLight = useCallback(() => {
    setTheme('light')
    setLocalStorageTheme('light')
    document.getElementById('root')?.classList.remove('dark')
  }, [setLocalStorageTheme])

  useEffect(() => {
    if (window && window.localStorage) {
      const stored =  window.localStorage.getItem('theme')
      if (stored && stored === 'dark') {
        setTheme('dark')
        document.getElementById('root')?.classList.add('dark')
      } else if (stored && stored === 'light') {
        setTheme('light')
        document.getElementById('root')?.classList.remove('dark')
      } else {
        window.localStorage.setItem('theme', 'light')
        setTheme('light')
        document.getElementById('root')?.classList.remove('dark')
      }
    }
  }, [])

  return [theme, setAsDark, setAsLight]
}

export default useTheme
