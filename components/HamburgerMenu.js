import { Menu, X } from "react-feather"
import Button from "@components/Button"
import useStore from "@hooks/useStore"

const HamburgerMenu = ({ onToggleMenu }) => {
  const [sidebarIsOpen, setSidebarOpen] = useStore(({ sidebarIsOpen, setSidebarOpen }) => [sidebarIsOpen, setSidebarOpen])

  const handleClick = (toggle) => {
    setSidebarOpen(toggle)
    onToggleMenu(toggle)
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

export default HamburgerMenu
