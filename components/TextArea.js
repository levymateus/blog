import clsx from "clsx"
import { useRef } from "react"

const TextArea = ({ ...props }) => {
  const ref = useRef()
  return <>
    <textarea
      ref={ref}
      className={clsx("flex relative rounded border box-border w-full px-4 py-3 text-gray-400 placeholder:dark:text-neutral-600 bg-white dark:bg-neutral-900 border-gray-400 dark:border-neutral-800 focus:outline-none focus:border-teal-500 focus:dark:border-teal-500")}
      {...props}
    />
    <span className="text-xs font-bold text-black dark:text-white px-1">{ref.current?.validationMessage}</span>
  </>
}

export default TextArea
