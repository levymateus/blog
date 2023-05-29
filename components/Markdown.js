import { useEffect, useRef } from 'react'
import { marked } from 'marked'
import HLJS from 'highlight.js'
import clsx from 'clsx'

const renderer = {
  heading(text, level) {
    let size = level === 1 ? 'text-3xl' : ''
    size = level === 2 || level === 3 ? 'text-2xl' : size
    size = level === 4 || level === 5 || level === 6 ? 'text-xl' : size
    return `
      <h${level} class="${size} font-bold mt-10">${text}</h$>
    `
  },
  paragraph(text) {
    return `<p class="text-base font-normal mt-7">${text}</p>`
  },
  list(items) {
    return `
      <ul class="list-decimal font-normal text-base flex space-y-3 flex-col mt-7">
        ${items}
      </ul>
    `
  },
  link(link, _, text) {
    return `
      <a href=${link} class="text-blue-600">${text}</a>
    `
  },
  code(codeArg, language) {
    let code = codeArg
    let filename = ''
    const match = code.match(/\/+[ ]*filename:(.*)(\/n)*/i)
    if (match && match.length >= 1) {
      filename = match[1]
      code = code.replace(match[0], '')
    }
    return `
      <div class="p-0 my-4 text-white dark:text-white flex flex-col bg-neutral-900 rounded border border-neutral-700">
        <div class="p-0 m-0 border-b text-base text-neutral-400 border-neutral-700 bg-neutral-800 rounded-t-sm px-4 py-2 ${filename ? 'display' : 'hidden'}">${filename}</div>
        <pre class="flex bg-neutral-900 py-3 px-4 rounded">
          <code class="language-${language} bg-neutral-900">${HLJS.highlight(code, { language: language }).value}</code>
        </pre>
      </div>
    `
  }
}

marked.use({ renderer })

function Markdown({ children, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const html = marked.parse(children)
    if (ref.current) {
      ref.current.innerHTML = html
    }
  }, [ref, children])

  return <div ref={ref} className={clsx("markdown", className)}></div>
}

export default Markdown
