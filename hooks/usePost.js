import { useCallback, useEffect, useState } from "react"
import useSessionStorage from "@hooks/useSessionStorage"
import { blog, user } from "@lib/database"
import { msToHours } from "@utils/time"
import useIsMounted from "@hooks/useIsMounted"
import useIsLoading from "./useIsLoading"

const usePost = (slug) => {
  const [liked, setLiked] = useState(false)
  const [visited, setVisited] = useSessionStorage(slug, null)
  const { isLoading, setIsLoading } = useIsLoading()
  const [views, setViews] = useState(1)
  const isMounted = useIsMounted()

  const like = useCallback(() => {
    (async function() {
      setLiked(true)
      await user().set.post(slug).like()
    })()
  }, [setLiked, slug])

  const dislike = useCallback(() => {
    (async function() {
      setLiked(false)
      await user().set.post(slug).dislike()
    })()
  }, [setLiked, slug])

  const visualize = useCallback(() => {
    async function visualizePost() {
      let lastVisitInHours = 8766
      if (visited) {
        const lastVisit = new Date(visited).getTime()
        lastVisitInHours = msToHours(Date.now() - lastVisit)
      }
      if (isMounted() && lastVisitInHours >= 24) {
        if ((await blog.post(slug).get.views.increment()).notFound()) {
          await blog.post(slug).add()
        }
        setVisited(new Date().toISOString())
      }
    }
    visualizePost()
  }, [isMounted, visited, setVisited, slug])

  useEffect(() => {
    async function fetchPost() {
      if (isMounted()) {
        setViews(await blog.post(slug).get.views.data())
        setLiked(await user().get.post(slug).isLiked())
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [slug, isMounted, setLiked, setIsLoading])

  return [{ liked, views, isLoading }, { like, dislike, visualize }]
}

export default usePost
