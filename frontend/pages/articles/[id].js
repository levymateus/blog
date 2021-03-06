import { QueryClient } from "react-query"
import Markdown from "../../components/markdown"
import Show from "../../components/show"
import { defaultOptions } from "../_app"
import defaultPaths from "../../consts/paths"
import { useContext } from "react"
import GlobalContext from "../../contexts/global-context"
import useNotFound from "../../hooks/useNotFound"

function Article({ article }) {
  const global = useContext(GlobalContext)

  useNotFound(() => !article)

  return <main className="articles">
    <Show when={Boolean(article)}>
      <Markdown code={global?.code.style} text={article?.attributes.text || ''} />
    </Show>
  </main>
}

export async function getStaticPaths() {
  const queryClient = new QueryClient({ defaultOptions: defaultOptions })
  const { data: articles } = await queryClient.fetchQuery(['/articles'])

  const paths = articles?.map(({ id }) => ({
    params: { id: String(id) },
  })) || defaultPaths

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient({ defaultOptions: defaultOptions })
  const { data: article } = await queryClient.fetchQuery(['/articles', params.id])
  return { props: { article } }
}

export default Article
