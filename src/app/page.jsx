import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/header"
import Mangalist from "@/components/MangaList"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs"
// import Link from "next/link"

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  recommendedAnime = reproduce(recommendedAnime, 4)
  const manga = await getAnimeResponse("manga", "limit=8")

  return (
    <>
      <section>
        <Header title="Paling Populer" linkTitle="Lihat Semua" linkHref="/populer" />
        <AnimeList api={topAnime} />
      </section>
      <section>
        <Header title="Manga" linkTitle="Lihat Semua" linkHref="/manga" />
        <Mangalist api={manga} />
      </section>
    </>
  )
}

export default Page
