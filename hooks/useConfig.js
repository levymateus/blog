import { RemoteConfigContext } from "context/RemoteConfig"
import { useContext } from "react"

const useConfig = () => {
  const context = useContext(RemoteConfigContext)
  if (!context) {
    throw new Error('useConfig should be called inside a RemoteConfig context component.')
  }
  const { config } = context
  return { config }
}

export default useConfig
