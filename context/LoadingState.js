import { createContext, useCallback, useState } from "react"

export const LoadingStateContext = createContext({ isLoading: true, setIsLoading: () => {} })

const LoadingState = ({ initialState = true, children }) => {
  const [isLoading, setIsLoading] = useState(initialState)
  return <LoadingStateContext.Provider value={{ isLoading, setIsLoading }}>
    {children({ isLoading, setIsLoading })}
  </LoadingStateContext.Provider>
}

export default LoadingState
