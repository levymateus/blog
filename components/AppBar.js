import useScroll from "@hooks/useScroll"
import NavLink from "@components/NavLink"
import If from "@components/If"
import clsx from "clsx"
import { useState } from "react"
import useConfig from "@hooks/useConfig"
import dynamic from "next/dynamic"
import debounce from "@utils/debounce"

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false })
const HamburgerMenu = dynamic(() => import("./HamburgerMenu"), { ssr: false })

function AppBar({ onToggleMenu }) {
  const [appBarState, setAppBarState] = useState('')
  const { config } = useConfig()

  useScroll('on-scroll-down', debounce(() => setAppBarState('bounce-top'), 500))

  useScroll('on-scroll-up', debounce(() => setAppBarState('bounce-bottom'), 500))

  useScroll('on-scroll-top', debounce(() => setAppBarState('bounce-bottom'), 500))

  return <>
    <div className={clsx("fixed top-0 left-0 right-0 px-4 mx-auto sm:max-w-screen-md bg-white dark:bg-black z-10", appBarState)}>
      <div className="flex flex-row items-center pt-8 pb-2 place-content-between relative">
        <div className="visible sm:hidden">
          <HamburgerMenu onToggleMenu={onToggleMenu} />
        </div>
        <div className="hidden sm:flex flex-row">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/snippets">Snippets</NavLink>
          <If stmt={config.contact}>
            <NavLink href="/#contact">Contact</NavLink>
          </If>
          <NavLink href="/about">About</NavLink>
        </div>
        <ThemeToggle />
      </div>
    </div>
  </>
}

export default AppBar
