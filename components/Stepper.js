import { createContext, useCallback, useContext, useReducer } from "react"

const StepperContext = createContext({ step: 1 })

const steperReducer = (prevState, { maxSteps }) => {
  const { step } = prevState
  if (step + 1 <= maxSteps) {
    return {
      ...prevState,
      step: step + 1,
    }
  }
  return { ...prevState }
}

const Stepper = ({ initialStep = 1, maxSteps = 1, onComplete = new Function, children }) => {
  const initialState = { step: initialStep }
  const [{ step }, dispath] = useReducer(steperReducer, initialState, (arg) => arg)

  const next = useCallback(() => {
    if (step === maxSteps) onComplete()
    dispath({ maxSteps })
  }, [maxSteps, onComplete, step])

  const render = typeof children === 'function' ? children({ step, next }) : children

  return <StepperContext.Provider value={{ step, next }}>
    {render}
  </StepperContext.Provider>
}

Stepper.displayName = 'Stepper'

const Step = ({ num = 1, children }) => {
  const { step, next } = useContext(StepperContext)
  const render = typeof children === 'function' ? children({ step, next }) : children
  return step === num ? <>{render}</> : null
}

StepperContext.displayName = 'Stepper.Step'

Stepper.Step = Step

export default Stepper
