import { withErrorBoundary } from "react-error-boundary"
import ErrorFallback from "@components/Error"
import Heading from "@components/Heading"
import Text from "@components/Text"
import Post from "@components/Post"
import useList from "@hooks/useList"
import { useReducer, useState } from "react"
import clsx from "clsx"
import InputSeach from "@components/InputSearch"
import useIsMounted from "@hooks/useIsMounted"
import client from "@utils/client"

const Blog = ({ blog, posts: postsProp }) => {
  const [posts, { set }] = useList(postsProp)
  const isMounted = useIsMounted()
  const [searchIsActive, setSearchIsActive] = useState(false)
  const [search, setSeach] = useReducer((_, value) => value.trim(), '')

  return (
    <div className="mt-10">
      <div className="flex flex-col">
        <section id="blog-search" className="flex flex-col w-full">
          <Heading size="xl" className={clsx({ "hidden": searchIsActive })}>Blog</Heading>
          <Text size="md" className={clsx("mt-2 fade-in", { "hidden": searchIsActive })}>
            {blog}
          </Text>
          <InputSeach
            value={search}
            setValue={setSeach}
            setActive={setSearchIsActive}
            onCancel={() => set(postsProp)}
            onChange={(evt) => {
              if (isMounted()) {
                set(postsProp.filter(({ title }) => title.toLowerCase().includes(evt.target.value.toLowerCase())))
              }
              setSeach(evt.target.value)
            }}
          />
          <Text
            size="sm"
            variant="neutral"
            className={clsx(" fade-in", { "hidden": !search || !posts.length })}
            asChild
          >
            <span className="italic mx-1">Results for: {search} ({posts.length})</span>
          </Text>
        </section>
        <section id="blog-all-posts" className="flex flex-col mt-14 fade-in">
          <Heading size="xl" className={clsx("fade-in mb-8", { "hidden": search })}>
            All Posts
          </Heading>
          <Text className={clsx({ "hidden": posts.length })}>
            <span>{`No posts found${search && ` for: "${search}"`}.`}</span>
          </Text>
          <div className={clsx("space-y-7", { "hidden": !posts.length })}>
            {posts.map(({ slug, title, description, _createdAt }) => <Post
              key={slug}
              slug={slug}
              title={title}
              shortText={description}
              date={new Date(_createdAt)}
            />)}
          </div>
        </section>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { blog } = await client.fetch(`*[_type == "site"][0]{blog}`)
  const posts = await client.fetch(`*[_type == "post"]{
    "slug": slug.current,
    title,
    description,
    _createdAt,
  }`)
  return {
    props: {
      blog: blog,
      posts: posts,
    }
  }
}

export default withErrorBoundary(Blog, { FallbackComponent: ErrorFallback })
