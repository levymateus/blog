import { Moon, Sun, Menu, X } from "react-feather"
import useScroll from "@hooks/useScroll"
import NavLink from "@components/NavLink"
import Toggle from "@components/Toggle"
import Button from "@components/Button"
import useTheme from "@hooks/useTheme"
import useStore from "@hooks/useStore"
import If from "@components/If"
import clsx from "clsx"
import { useState } from "react"
import useConfig from "@hooks/useConfig"

function HamburgerMenu({ onToggleMenu }) {
  const [sidebarIsOpen, setSidebarOpen] = useStore(({ sidebarIsOpen, setSidebarOpen }) => [sidebarIsOpen, setSidebarOpen])

  function handleClick(value) {
    setSidebarOpen(value)
    onToggleMenu(value)
  }

  if (sidebarIsOpen) {
    return <Button
      variant="secondary"
      onClick={() => handleClick(false)}
    >
      <X />
    </Button>
  }

  return <Button
    variant="secondary"
    onClick={() => handleClick(true)}
  >
    <Menu />
  </Button>
}

function ThemeToggle() {
  const [theme, setAsDark, setAsLight] = useTheme()
  return <If stmt={theme}>
    <Toggle defaultValue={theme === 'light'}>
      <Toggle.On>
        {(off) => <Button onClick={() => { setAsDark(); off() }}>
          <Moon />
        </Button>}
      </Toggle.On>
      <Toggle.Off>
        {(on) => <Button onClick={() => { setAsLight(); on() }}>
          <Sun />
        </Button>}
      </Toggle.Off>
    </Toggle>
  </If>
}

function AppBar({ onToggleMenu }) {
  const [appBarState, setAppBarState] = useState('')
  const { config } = useConfig()

  useScroll('on-scroll-down', () => {
    setAppBarState('bounce-top')
  })

  useScroll('on-scroll-up', () => {
    setAppBarState('bounce-bottom')
  })

  useScroll('on-scroll-top', () => {
    setAppBarState('bounce-bottom')
  })

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
