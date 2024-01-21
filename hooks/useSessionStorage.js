import { useCallback, useEffect, useState, useMemo } from "react"

const useSessionStorage = (key, initialValue) => {
  const initialState = useMemo(() => initialValue,[initialValue])
  const [storedValue, setStoredValue] = useState(initialState)

  const setValue = useCallback((value) => {
    try {
      if (typeof window !== "undefined") {
        setStoredValue((prevState) => {
          const currState = value instanceof Function ? value(prevState) : value;
          window.sessionStorage.setItem(key, JSON.stringify(currState));
          return currState
        })
      }
    } catch (error) {
      console.error('useSessionStorage ' + error);
    }
  }, [key]);

  useEffect(() => {
    setStoredValue(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        const item = window.sessionStorage?.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error('useSessionStorage ' + error);
        return initialValue;
      }
    })
  }, [initialValue, key])

  return [storedValue, setValue];
}

export default useSessionStorage
