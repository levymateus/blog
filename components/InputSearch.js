import InputText, { Input } from "@components/Input"
import { useState, useRef } from "react"
import { Search, X } from "react-feather"
import { useRouter } from "next/router"

let timeoutId = null

export default function InputSeach({ value, setActive, onCancel, setValue, onChange }) {
  const [inputValue, setInputValue] = useState('')
  const inputSearchRef = useRef()
  const router = useRouter()

  function handleChange(evt) {

    setInputValue(evt.target.value)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (!evt.target.value) {
      onCancel()
      setValue('')
    }

    if (evt.target.value) {
      timeoutId = setTimeout(() => onChange(evt), 500)
    }
  }

  function handleFocus() {
    router.push(`/blog#blog-search`)
    setActive(true)
  }

  function handleBlur(evt) {
    if (document.activeElement.id === 'blog-input-search') {
      clearSearch()
    } else if (!evt.target.value) {
      setActive(false)
      window.scroll({ top: 0 })
    }
  }

  function clearSearch() {
    setValue('')
    setInputValue('')
    onCancel()
    setActive(false)

    inputSearchRef.current?.blur()

    window.scroll({ top: 0 })
    window.focus()
  }

  return <InputText className="mt-3">
    <Input.Input
      ref={inputSearchRef}
      type="text"
      id="blog-input-search"
      value={inputValue}
      placeholder='Search'
      blurHotkey="Escape"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
    {!value ?
      <Input.Icon
        className="hover:cursor-pointer"
        icon={Search}
      />  :
      <Input.Icon
        className="hover:cursor-pointer"
        onClick={clearSearch}
        icon={X}
      />}
  </InputText>
}
