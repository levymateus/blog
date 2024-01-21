import { HiHeart, HiOutlineHeart } from "react-icons/hi"
import usePost from "@hooks/usePost"
import clsx from "clsx"

const Likes = ({ slug }) => {
  const [{ liked, isLoading }, { like, dislike }] = usePost(slug)
  return <div className="flex items-center">
    {liked ?
      <button
        type="button"
        className={clsx("hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded p-1 outline-0", {
          "skeleton select-none hover:cursor-default pointer-events-none": isLoading,
        })}
        onClick={() => dislike()}
      >
        <div className="flex items-center">
          <HiHeart className={clsx("text-red-700", {
            "text-transparent": isLoading
          })} />
        </div>
      </button> :
      <button
        type="button"
        className={clsx("hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded p-1 outline-0", {
          "skeleton select-none hover:cursor-default pointer-events-none": isLoading,
        })}
        onClick={() => like()}
      >
        <div className="flex items-center">
          <HiOutlineHeart className={clsx({
            "text-transparent": isLoading
          })} />
        </div>
      </button>}
  </div>
}

export default Likes
