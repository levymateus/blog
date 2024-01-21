import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"

const Heading = ({ size = 'md', asChild = false, children = '', isLoading = false, className }) => {
  const Heading = asChild ? Slot : 'span'
  return <Heading className={clsx("capitalize", className, {
      'text-2xl': size === 'sm', // 23px
      'text-3xl': size === 'md', // 24px
      'text-4xl': size === 'lg', // 36px
      'text-5xl': size === 'xl', // 40px
      "font-bold text-black dark:text-white": !isLoading,
      "skeleton skeleton-text select-none hover:cursor-default pointer-events-none text-transparent": isLoading,
    })}
  >{children}</Heading>
}

export default Heading
