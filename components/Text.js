import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"

const Text = ({
  size = 'base',
  asChild = false,
  variant = 'default',
  children = '',
  className = '',
  isLoading = false,
}) => {
  const Text = asChild ? Slot : 'span'
  const textSize = {
    'text-xs': size === 'xs', // 11px
    'text-sm': size === 'sm', // 12px
    'text-base': size === 'base', // 14px
    'text-lg': size === 'lg', // 15px
    'text-xl': size === 'xl' // 16px
  }
  const textColor = {
    "text-black dark:text-white": !isLoading && variant === 'default',
    "text-neutral-500 dark:text-gray-500": !isLoading && variant === 'neutral'
  }
  const skeleton = {
    "skeleton skeleton-text select-none hover:cursor-default pointer-events-none text-transparent": isLoading,
  }

  return <Text className={clsx(skeleton, textColor, textSize, className)}>{children}</Text>
}

export default Text
