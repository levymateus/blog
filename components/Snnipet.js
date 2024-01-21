import Text from "@components/Text"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

const Snnipet = ({ slug, title, description, src, alt, className, ...props }) => {
  return <Link
    href={`/snippets/${slug}`}
    className={clsx("border border-neutral-900 dark:border-neutral-700 rounded p-6 hover:cursor-pointer", className)}
    passHref
    {...props}
    >
    <Image
      className="rounded-full"
      width={32}
      height={32}
      alt={alt}
      src={src}
    />
    <div className="flex flex-col space-y-2">
      <Text className="mt-3 font-bold text-black dark:text-white capitalize" size="xl">
        {title}
      </Text>
      <Text className="font-bold text-gray-500 dark:text-gray-500" size="xs">
        {description}
      </Text>
    </div>
  </Link>
}

export default Snnipet
