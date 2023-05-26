import { createContext, useContext, useReducer } from "react"

const ToggleContext = createContext({ value: false })

function Toggle({ defaultValue = false, toggle, children }) {
  const [value, dispatch] = useReducer(toggle || ((prevState) => !prevState), defaultValue, (arg) => arg)
  return <ToggleContext.Provider value={{ value, dispatch }}>
    {children}
  </ToggleContext.Provider>
}

Toggle.displayName = 'Toogle'

function On({ children }) {
  const { value, dispatch } = useContext(ToggleContext)
  return value ? children(dispatch) : null
}

On.displayName = 'Toggle.On'

function Off({ children }) {
  const { value, dispatch } = useContext(ToggleContext)
  return !value ? children(dispatch) : null
}

Off.displayName = 'Toggle.Off'

Toggle.On = On
Toggle.Off = Off

export default Toggle
