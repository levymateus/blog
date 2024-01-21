import Heading from "@components/Heading"
import Text from "@components/Text"
import Views from "@components/Views"
import Likes from "@components/Likes"
import Link from "next/link"
import DateText from "@components/DateText"
import LoadingState from "context/LoadingState"
import clsx from "clsx"

const Post = ({
  title = '',
  shortText = '',
  date = new Date(),
  slug = ''
}) => {
  return <LoadingState>
    {({ isLoading }) => <div className="flex flex-col space-y-3">
      <Link href={`blog/${slug}`} className={clsx("w-fit", {
        "select-none hover:cursor-default pointer-events-none text-transparent": isLoading,
      })} passHref>
        <div className="flex flex-col space-y-3">
          <Heading isLoading={isLoading}>{title}</Heading>
          <Text isLoading={isLoading}>
            {shortText}
          </Text>
        </div>
      </Link>
      <div className="flex flex-row">
        <DateText isLoading={isLoading} date={date} />
        <div className="flex flex-row text-gray-700 dark:text-gray-500 space-x-2 ml-10 hover:cursor-default">
          <Views slug={slug} size="sm" />
          <Likes slug={slug} size="sm" />
        </div>
      </div>
    </div>}
  </LoadingState>
}

export default Post
