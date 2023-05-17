import { createContext, useState } from "react"

export const RemoteConfigContext = createContext({ config: {
  contact: false
}})

const RemoteConfig = ({ children }) => {
  const [config] = useState({ contact: false })
  return <RemoteConfigContext.Provider value={{ config }}>
    {children}
  </RemoteConfigContext.Provider>
}

export default RemoteConfig
