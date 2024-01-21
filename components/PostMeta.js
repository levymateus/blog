import Likes from "@components/Likes"
import Views from "@components/Views"
import DateText from "@components/DateText"
import useIsLoading from "@hooks/useIsLoading"

const PostMeta = ({ slug, date }) => {
  const { isLoading } = useIsLoading()
  return <div className="flex flex-row justify-between mt-3 text-black dark:text-white">
    <div className="flex flex-row space-x-6">
      <Likes slug={slug}  />
      <Views slug={slug}  />
    </div>
    <DateText isLoading={isLoading} date={date} />
  </div>
}

export default PostMeta
