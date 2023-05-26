import { useRouter } from "next/router"
import Text from "@components/Text"
import Button from "@components/Button"

function pathAsArray(argPath) {
  let path = argPath.split('/')
  path = path.slice(1, path.length)
  return path
}

export default function Breadcumb() {
  const router = useRouter()
  const pathArr = pathAsArray(router.asPath)
  const path = []

  pathArr.forEach((p, index, arr) => {
    path.push(
      <Button
        key={p}
        variant="link"
        onClick={() => {
          const stepsBack = pathArr.length - index - 1
          if (stepsBack && window) {
            window.history.go(-stepsBack)
          }
        }}
      >
        {index < pathArr.length - 1 ?
          <Text variant="neutral" className="hover:underline underline-offset-4">{p}</Text> :
          <Text variant="neutral" className="hover:underline underline-offset-4" asChild><strong>{p}</strong></Text>}
      </Button>
    )
    if (index < pathArr.length - 1) {
      path.push(<span key={arr[index - 1] + index} className="text-neutral-500">{'>'}</span>)
    }
  })

  return <div className="flex flex-row items-center space-x-2">
    {path.map((Path) => Path)}
  </div>
}
