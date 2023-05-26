import Heading from "@components/Heading"
import PostMeta from "@components/PostMeta"
import Markdown from "@components/Markdown"
import Breadcumb from "@components/Breadcumb"
import useTimeout from "@hooks/useTimeout"
import usePost from "@hooks/usePost"
import LoadingState from "context/LoadingState"
import client from "@utils/client"

function Post({ post }) {
  const [, { visualize }] = usePost(post.slug)
  useTimeout(() => visualize(), 3)
  return <LoadingState>
    {() => <div className="flex flex-col mt-12">
      <Breadcumb />
      <Heading size="xl" className="mt-12">{post.title}</Heading>
      <PostMeta
        slug={post.slug}
        date={new Date(post._createdAt)}
      />
      <Markdown className="mt-10 fade-in">{post.content}</Markdown>
    </div>}
  </LoadingState>
}

export async function getStaticPaths() {
  const posts = await client.fetch(`*[_type == "post"]{
    "slug": slug.current
  }`)
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug: slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const post = await client.fetch(`*[_type == "post" && slug.current == "${context.params.slug}"][0]{
    "slug": slug.current,
    title,
    content,
    _createdAt
  }`)
  return { props: { post: post } }
}

export default Post
