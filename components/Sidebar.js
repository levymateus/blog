import { useEffect, useRef, useState } from "react"
import Animation from "@components/Animation"
import NavLink from "@components/NavLink"
import useStore from "@hooks/useStore"
import useList from "@hooks/useList"
import max from "@utils/max"
import clsx from "clsx"
import useEventListener from "@hooks/useEventListener"
import useConfig from "@hooks/useConfig"

const items = [
  { href: '/', name: 'Home', duration: 0.4 },
  { href: '/about', name: 'About', duration: 0.6 },
  { href: '/#contact', name: 'Contact', duration: 0.8 },
  { href: '/snippets', name: 'Snippets', duration: 1.0 },
  { href: '/blog', name: 'Blog', duration: 1.2 }
]

const Sidebar = ({ onSelectItem }) => {
  const ref = useRef()
  const [list, { forEach, filter }] = useList(items)

  // TODO: set sidebar open on keyboard 'alt' key pressed.
  const [isOpen, setOpen] = useStore(({ sidebarIsOpen, setSidebarOpen }) => [sidebarIsOpen, setSidebarOpen])
  const [isVisible, setVisible] = useState(false)
  const { config } = useConfig()
  const animation = isOpen ? "bounce-right" : "bounce-left"

  const rearrange = (pivot) => {
    let step = 0.4
    forEach((_, index, array) => {
      if (pivot !== index) {
        step += 0.2
        array[index].duration = step
      } else {
        array[pivot].duration = 0.4
      }
    })
  }

  useEffect(() => {
    if (isOpen) setVisible(true)
    if (!config?.contact) {
      filter(({ name }) => name.toLowerCase() !== 'contact')
    }
  }, [config?.contact, filter, isOpen])

  useEventListener('scroll', () => {
    if (isOpen) {
      setOpen(false)
      rearrange(0)
      onSelectItem()
    }
  })

  return <aside ref={ref} className={clsx("absolute sm:hidden h-screen", { 'visible': isVisible, 'hidden': !isVisible })}>
    <ul className="flex flex-col space-y-8">
      {list.map(({ name, href, duration }, index) => (
        <Animation
          asChild
          key={name}
          name={animation}
          duration={duration}
          onAnimationEnd={() => {
            if (!isOpen && duration >= max(list, ({ duration }) => duration)) setVisible(false)
          }}
        >
          <li>
            <NavLink
              href={href}
              onClick={() => {
                setOpen(false)
                rearrange(index)
                onSelectItem()
              }}
            >
              {name}
            </NavLink>
          </li>
        </Animation>))}
    </ul>
  </aside>
}

export default Sidebar
