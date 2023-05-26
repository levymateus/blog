import Link from "next/link"
import { useRouter } from "next/router"

import clsx from "clsx"
import Text from "@components/Text"

const NavLink = ({
  href,
  children = '',
  size = 'xl',
  ...props
}) => {
  const { asPath, route } = useRouter()
  return <Link href={href} {...props} passHref>
    <Text
      className={clsx("px-4 py-2", {
        'font-bold text-blue-600 dark:text-teal-500': route === href || asPath === href
      })}
      size={size}
    >{children}</Text>
  </Link>
}

export default NavLink
