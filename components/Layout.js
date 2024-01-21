import { useState } from "react"
import Animation from "@components/Animation"
import useEventListener from "@hooks/useEventListener"
import dynamic from "next/dynamic"
import clsx from "clsx"
import useStore from "@hooks/useStore"
import LazyLoad from "@components/LazyLoad"

const AppBar = dynamic(() => import("../components/AppBar"), { ssr: false })
const SideBar = dynamic(() => import("../components/Sidebar"), { ssr: false })
const Footer = dynamic(() => import("../components/Footer", { ssr: false }))

const Layout = ({ children }) => {
  const { sidebarIsOpen, appBarIsOpen, setAppBarIsOpen } = useStore()
  const [animation, setAnimation] = useState()

  const handleToggleMenu = (isOpen) => setAnimation(isOpen ? "bounce-right" : "bounce-left")

  useEventListener("resize", () => setAnimation())
  useEventListener("load", () => setAppBarIsOpen(true))

  return <div className={clsx("container flex flex-col overflow-x-hidden sm:overflow-clip px-4 mb-14 mt-[80px] mx-auto sm:max-w-screen-md")}>

    <Animation
      asChild
      name={animation}
      duration={1}
      from={animation === 'bounce-right' ? "0px" : "156px"}
      to={animation === 'bounce-right' ? "156px" : "0px"}
    >

      <div className="relative">
        <main className={clsx("sm:w-full overflow-clip")}>
          {children}
        </main>

        <LazyLoad render={() => <Footer />} loading={() => <p>loading...</p>} />
      </div>

    </Animation>

    {appBarIsOpen && <>
      <AppBar onToggleMenu={handleToggleMenu} />

      <div className="fixed top-[104px] left-0 right-0 px-4 bg-white dark:bg-black z-10">
        {sidebarIsOpen && <SideBar onSelectItem={() => setAnimation("bounce-left")} />}
      </div>
    </>}

  </div>
}

export default Layout
