import { withErrorBoundary } from "react-error-boundary"
import ErrorFallback from "@components/Error"
import Heading from "@components/Heading"
import client from "@utils/client"
import dynamic from "next/dynamic"

const MD = dynamic(() => import("../components/Markdown"), { ssr: true, loading: () => <p>loading...</p> })

function About({ content }) {
  return (
    <div className="mt-10">
      <Heading size="xl">About Me</Heading>
      <MD className="mt-10 fade-in">{content}</MD>
    </div>
  );
}

export async function getStaticProps() {
  const about = await client.fetch(`*[_type == "bio"][0]{about}`)
  return {
    props: { content: about.about }
  };
}

export default withErrorBoundary(About, { FallbackComponent: ErrorFallback })
