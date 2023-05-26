import { useState } from "react"
import AppBar from "@components/AppBar"
import Footer from "@components/Footer"
import Sidebar from "@components/Sidebar"
import Animation from "@components/Animation"
import useEventListener from "@hooks/useEventListener"
import clsx from "clsx"

function Layout({ children }) {
  const [animation, setAnimation] = useState()

  function handleToggleMenu(isOpen) {
    setAnimation(isOpen ? "bounce-right" : "bounce-left")
  }

  useEventListener("resize", () => setAnimation())

  return <div className={clsx("container flex flex-col overflow-x-hidden sm:overflow-clip px-4 mb-14 mt-[80px] mx-auto sm:max-w-screen-md")}>

    <AppBar onToggleMenu={handleToggleMenu} />

    <div className="fixed top-[104px] left-0 right-0 px-4 bg-white dark:bg-black z-10">
      <Sidebar onSelectItem={() => setAnimation("bounce-left")} />
    </div>

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

        <footer className="mt-8">
          <Footer />
        </footer>
      </div>

    </Animation>

  </div>
}

export default Layout
