import Views from "@components/Views"
import Likes from "@components/Likes"
import Link from "next/link"
import Text from "@components/Text"
import clsx from "clsx"
import LoadingState from "context/LoadingState"

const PostCard = ({ slug, description, color = 'teal' }) => {
  return <LoadingState>
    {({ isLoading }) => <Link href={`/blog/${slug}`} className={clsx("flex grow rounded p-0.5", {
      "bg-rw-teal": color === 'teal',
      "bg-rw-indigo": color === 'indigo',
      "bg-rw-purple": color === 'purple'
    })} passHref>
      <div className="flex grow flex-col rounded bg-white dark:bg-black p-6">
        <Text size="xl" className="capitalize" isLoading={isLoading}>{description}</Text>
        <div className="flex grow flex-row mt-6 sm:mt-24 space-x-3 text-black dark:text-white text-clip" onClick={(evt) => evt.preventDefault()}>
          <Views slug={slug} size="sm" />
          <Likes slug={slug} size="sm" defaultValue={1} />
        </div>
      </div>
    </Link>}
  </LoadingState>
}

export default PostCard
