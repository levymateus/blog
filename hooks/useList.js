import { useState, useCallback } from "react"

const useList = (initialState = []) => {
  const [list, set] = useState(initialState)

  const forEach = useCallback((callback) => {
    const newState = [...list]
    newState.forEach(callback)
    set(newState)
    return newState
  }, [list])

  const filter = useCallback((callback) => set(initialState.filter(callback)), [initialState])

  return [list, { forEach, filter, set }]
}

export default useList
