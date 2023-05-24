import { createContext, useEffect, useState } from "react"
import { feat } from "@lib/database"
import defaultConfig from "consts/defaultConfig"
import useIsMounted from "@hooks/useIsMounted"
import withLoading from "@utils/withLoading"

export const RemoteConfigContext = createContext({ config: defaultConfig })

const RemoteConfig = ({ children, isLoading, setIsLoading }) => {
  const isMounted = useIsMounted()
  const [config, setConfig] = useState(defaultConfig)

  useEffect(() => {
    (async function () {
      const feats = {
        contact: (await feat("contact")).is.enabled()
      }
      if (isMounted()) {
        setConfig(prevState => ({
          ...prevState,
          ...feats,
        }))
        setIsLoading(false)
      }
    })()

    return () => {
      setConfig(defaultConfig)
      setIsLoading(true)
    }
  }, [])

  if (isLoading) {
    return <></>
  }

  return <RemoteConfigContext.Provider value={{ config }}>
    {children}
  </RemoteConfigContext.Provider>
}

export default withLoading(RemoteConfig)
