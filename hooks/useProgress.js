import { useEffect } from "react"
import { useRouter } from "next/router"

import useLockedBody from "@hooks/useLockedBody"

const useProgress = () => {
  const router = useRouter()
  const [, setLocked] = useLockedBody(false)

  useEffect(() => {
    const handleStart = (nProgress) => () => {
      setLocked(true)
      nProgress.start()
    }

    const handleStop = (nProgress) => () => {
      setLocked(false)
      nProgress.done()
    }

    const asyncLoadProgress = async () => {
      const nProgress = (await import('nprogress')).default
      router.events.on('routeChangeStart', handleStart(nProgress))
      router.events.on('routeChangeComplete', handleStop(nProgress))
      router.events.on('routeChangeError', handleStop(nProgress))
    }

    asyncLoadProgress()

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router, setLocked])
}

export default useProgress
