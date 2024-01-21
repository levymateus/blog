import usePost from "@hooks/usePost"
import clsx from "clsx"
import { Eye } from "react-feather"

const Views = ({ slug, size = 'base' }) => {
  const [{ views, isLoading }] = usePost(slug)
  return <div className={clsx("flex items-center p-1", {
    "skeleton select-none hover:cursor-default pointer-events-none text-transparent rounded": isLoading
  })}>
    <Eye width={14} height={14} />
    <span className={`text-${size} ml-1 hover:cursor-default`}>{views}</span>
  </div>
}

export default Views
