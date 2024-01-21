import clsx from "clsx"

const Button = ({ variant = 'primary', children, ...props }) => {
  return <button
    type="button"
    className={clsx("flex rounded", {
      'bg-black dark:bg-neutral-800 text-white p-2': variant === 'primary',
      'text-black dark:text-white p-2': variant === 'secondary',
      'bg-transparent p-0': variant === 'link'
    })}
    {...props}
  >{children}</button>
}

export default Button
