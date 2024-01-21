import Heading from "@components/Heading"
import Text from "@components/Text"
import Avatar from "@components/Avatar"
import If from "@components/If"
import useConfig from "@hooks/useConfig"
import client from "@utils/client"
import { blurDataURL } from "@utils/blurDataURL"
import dynamic from "next/dynamic"
import '../envs'

const FeaturedPosts = dynamic(() => import("../components/FeaturedPosts"))
const Contact = dynamic(() => import("../components/Contact"))

const HomePage = ({ bio, posts }) => {
  const { config } = useConfig()
  return <>
    <section className="flex pt-10 flex-col sm:flex-row">
      <Avatar
        src={bio.imageUrl}
        alt={bio.imageCaption}
        blurDataURL={bio.blurDataURL}
        placeholder="blur"
        loading="lazy"
        className="order-1 sm:order-2"
      />
      <div className="flex-1 mt-8 sm:mt-0 flex-col order-2 sm:order-1">
        <Heading size="xl" asChild>
          <h1>{bio.name}</h1>
        </Heading>
        <Heading className="mt-2" size="md" asChild>
          <h2>{bio.role}</h2>
        </Heading>
        <Text className="mt-6" size="md" asChild>
          <p>{bio.bio}</p>
        </Text>
      </div>
    </section>
    <If stmt={posts.length}>
      <FeaturedPosts posts={posts} />
    </If>
    <If stmt={config?.contact}>
      <Contact />
    </If>
  </>
};

export const getStaticProps = async () => {
  const bio = await client.fetch(`*[_type == "bio"][0]{
    name,
    role,
    bio,
    "imageUrl": image.asset->url,
    "imageCaption": image.caption
  }`)
  bio.blurDataURL = await blurDataURL(bio.imageUrl, "image/jpeg")
  const site = await client.fetch(`*[_type == "site"][0]`)
  const posts = await client.fetch(`*[_type == "post"][0...3]{ slug, title } | order(releaseDate desc) | order(_createdAt asc)`)
  return {
    props: {
      bio: bio,
      site: site,
      posts: posts,
    }
  }
}

export default HomePage
