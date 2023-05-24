import Button from "@components/Button"
import Heading from "@components/Heading"
import If from "@components/If"
import InputText, { Input } from "@components/Input"
import Stepper from "@components/Stepper"
import Text from "@components/Text"
import TextArea from "@components/TextArea"
import useSessionStorage from "@hooks/useSessionStorage"
import useStore from "@hooks/useStore"
import * as mail from "@lib/mail"
import withLoading from "@utils/withLoading"
import clsx from "clsx"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, X } from "react-feather"

const Card = ({ isLoading, setIsLoading }) => {
  const emailInputRef = useRef()
  const [mailSent, setMailSent] = useSessionStorage('mail-sent', '')
  const [values, setValues] = useState({ text: '', email: '' })
  const router = useRouter()
  const hash = router.asPath.split('#')[1]
  const setAppBarIsOpen = useStore(({ setAppBarIsOpen }) => setAppBarIsOpen)

  const handleInputChange = (evt) => {
    setValues(prevValues => ({
      ...prevValues,
      [evt.target.name]: evt.target.value
    }))
  }

  useEffect(() => {
    if (hash === 'contact' && emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [hash, setAppBarIsOpen])

  return <div className="flex flex-col rounded bg-cyan-100 bg-rw-rw px-3 py-5">

    <Heading>Contact-me</Heading>
    <If stmt={!isLoading && !mailSent}><Text className="mt-2">Send-me a message</Text></If>
    <If stmt={isLoading}><Text className="mt-2">Sending you message...</Text></If>
    <If stmt={!!mailSent}><Text className="mt-2 dark:text-green-400">Message sent successfully! Thank you for the contact.</Text></If>

    <If stmt={!isLoading && !mailSent}>
      <Stepper
        maxSteps={2}
        onComplete={() => {
          (async function () {
            setIsLoading(true)
            const isMailSent = await mail.send(values.email, values.text, values.email)
            setIsLoading(false)
            if (isMailSent) {
              setMailSent('The mail was sent');
            } else {
              const mailtoWindow = window.open(`mailto:levymateusmacedo@gmail.com?subject=New message from ${values.email}&body=${values.text}`)
              if (!mailtoWindow) {
                alert('You should allow to this site open popups!')
              }
            }
          })()
        }}
      >
        {({ step, next }) => <form
          onSubmit={(evt) => {
            evt.preventDefault()
            if (evt.target.checkValidity()) {
              next()
            } else {
              evt.target.reportValidity()
            }
          }}
        >
          <div action="post" className="mt-8">
            <Stepper.Step num={1}>
              <InputText>
                <Input.Input
                  ref={emailInputRef}
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  blurHotkey="Escape"
                  value={values['email']}
                  required
                  placeholder="you-email@email.com"
                />
                <Input.Icon
                  className={clsx("hover:cursor-pointer", {
                    "visible": values['email'],
                    "invisible": !values['email']
                  })}
                  onClick={() => setValues(prevValues => ({
                    ...prevValues,
                    email: ''
                  }))}
                  icon={X}
                />
              </InputText>
            </Stepper.Step>
            <Stepper.Step num={2}>
              <TextArea
                autoFocus
                name="text"
                type="message"
                onChange={handleInputChange}
                required
                rows={3}
                placeholder="text"
              />
            </Stepper.Step>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="secondary"
              type="submit"
            >
              <div className="flex items-center">
                <Text className="pr-1">{step === 1 ? 'Send message' : 'Submit'}</Text>
                <ArrowRight width={14} height={14} />
              </div>
            </Button>
          </div>
        </form>}
      </Stepper>
    </If>

  </div>
}

export default withLoading(Card, { initialState: false })
