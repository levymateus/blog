import { LoadingStateContext } from "context/LoadingState"
import { useContext } from "react"

const useIsLoading = () => {
  const context = useContext(LoadingStateContext)
  if (!context) {
    throw new Error('useIsLoading should be called inside a LoadingState context component.')
  }
  const { isLoading, setIsLoading } = context
  return { isLoading, setIsLoading }
}

export default useIsLoading
