import { Html, Head, Main, NextScript } from "next/document"
import Body from "@components/Body"

export default function Document() {
  return (
    <Html id="root" lang="en" className="scroll-smooth">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.svg" />
      </Head>
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  )
}
