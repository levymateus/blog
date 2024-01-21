import clsx from "clsx"
import Image from "next/image"

const Avatar = ({ className, src, alt, ...props }) => {
  return <Image
    className={clsx(className, "rounded-full h-32 object-cover")}
    width={128}
    height={128}
    src={src}
    alt={alt}
    {...props}
  />
}

export default Avatar
