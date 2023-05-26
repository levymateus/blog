import { createContext, useCallback, useContext, useReducer } from "react"

const StepperContext = createContext({ step: 1 })

function reducer(prevState, { maxSteps }) {
  const { step } = prevState
  if (step + 1 <= maxSteps) {
    return {
      ...prevState,
      step: step + 1,
    }
  }
  return { ...prevState }
}

function Stepper({ initialStep = 1, maxSteps = 1, onComplete = new Function, children }) {
  const initialState = { step: initialStep }
  const [{ step }, dispath] = useReducer(reducer, initialState, (arg) => arg)

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

function Step({ num = 1, children }) {
  const { step, next } = useContext(StepperContext)

  const render = typeof children === 'function' ? children({ step, next }) : children

  return step === num ? <>{render}</> : null
}

StepperContext.displayName = 'Stepper.Step'

Stepper.Step = Step

export default Stepper
