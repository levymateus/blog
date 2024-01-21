import Link from "next/link"
import { ArrowRight } from "react-feather"
import PostCard from "@components/PostCard"
import Heading from "@components/Heading"
import If from "@components/If"

const FeaturedPosts = ({ posts }) => {
  return <section className="pt-14" >
    <Heading size="xl" asChild>
      <h3>Featured Posts</h3>
    </Heading>
    <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-7 mt-6 fade-in">
      <PostCard
        slug={posts[0]?.slug.current}
        description={posts[0]?.title} color="teal"
      />
      <If stmt={posts.length >= 2}>
        <PostCard
          slug={posts[1]?.slug.current}
          description={posts[1]?.title}
          color="indigo"
        />
      </If>
      <If stmt={posts.length >= 3}>
        <PostCard
          slug={posts[2]?.slug.current}
          description={posts[2]?.title}
          color="purple"
        />
      </If>
    </div>
    <Link className="text-neutral-500" href="/blog" passHref>
      <div className="flex items-center space-y-1 pt-6 pb-6 text-black hover:text-blue-600 dark:hover:text-white text-md dark:text-neutral-500">Read all posts <ArrowRight width={14} height={14} /></div>
    </Link>
  </section>
}

export default FeaturedPosts
