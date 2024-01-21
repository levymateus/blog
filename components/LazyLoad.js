import useEventListener from "@hooks/useEventListener"
import debounce from "@utils/debounce"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"

const LazyLoad = ({ render, loading: Loading }) => {
  const router = useRouter()
  const [canLoad, setCanLoad] = useState(false)
  const ref = useRef()

  const handleScroll = useCallback(
    debounce(() => {
      const el = ref.current
      if (!el) return
      const bounds = el.getBoundingClientRect()
      const lessThanInnerHeight = bounds.top <= window.innerHeight
      if (lessThanInnerHeight) setCanLoad(true)
    }, 500),
  [setCanLoad, ref])

  useEffect(() => {
    const handleRouteChangeComplete = () => handleScroll()
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete)
  }, [router])

  useEffect(handleScroll, [ref, setCanLoad])
  useEventListener('scroll', handleScroll)

  return <span ref={ref}>
    {canLoad ? render() : <Loading />}
  </span>
}

export default LazyLoad
