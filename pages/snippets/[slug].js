import { withErrorBoundary } from "react-error-boundary"
import ErrorFallback from "@components/Error"
import Heading from "@components/Heading"
import Markdown from "@components/Markdown"
import Text from "@components/Text"
import client from "@utils/client"

const Snippet = ({ title, description, content }) => {
  return <div className="mt-12">
    <div className="flex flex-col">
      <Heading size="xl">{title}</Heading>
      <Text size="md" className="mt-2 mb-4 fade-in">{description}</Text>
    </div>
    <Markdown className="mt-10 fade-in">{content}</Markdown>
  </div>
}

export const getStaticPaths = async () => {
  const snippets = await client.fetch(`*[_type == "snippet"]{
    "slug": slug.current
  }`)
  return {
    paths: snippets.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const snippet = await client.fetch(`*[_type == "snippet" && slug.current == "${context.params.slug}"][0]{title, description, content}`)
  return { props: snippet }
}

export default withErrorBoundary(Snippet, { FallbackComponent: ErrorFallback })
