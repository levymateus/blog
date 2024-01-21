import { Slot } from "@radix-ui/react-slot"

const Animation = ({ duration, from, to, name, children, asChild, ...props }) => {
  const Element = asChild ? Slot : 'div'
  return <Element
    className={name}
    style={{
      '--duration': `${duration || 1.0}s`,
      '--from': from,
      '--to': to,
    }}
    {...props}
  >{children}</Element>
}

export default Animation
