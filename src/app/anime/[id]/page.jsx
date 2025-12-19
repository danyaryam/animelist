export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { getAnimeResponse, getStreamingResponse } from "@/libs/api-libs"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CollectionButton from "@/components/AnimeList/collectionButton"
import { authUserSession } from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import CommentInput from "@/components/AnimeList/commentInput"
import CommentBox from "@/components/AnimeList/commentBox"
import Link from "next/link"
import StreamingList from "@/components/streaming/page"

const Page = async ({ params: { id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const streaming = await getStreamingResponse(`anime/${id}/streaming`)
    const user = await authUserSession()

    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id }
    })

    return (
        <>
            <div className="pt-4 px-4 flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-color-primary">
                    {anime.data.title} ({anime.data.year})
                </h3>
                {!collection && user && (
                    <CollectionButton
                        anime_mal_id={id}
                        user_email={user?.email}
                        anime_image={anime.data.images.webp.image_url}
                        anime_title={anime.data.title}
                    />
                )}
            </div>
            
            <div className="pt-4 px-4 flex gap-3 text-color-primary overflow-x-auto">
                {[
                    { label: "Peringkat", value: anime.data.rank },
                    { label: "Score", value: anime.data.score },
                    { label: "Episode", value: anime.data.episodes },
                    { label: "Rilis", value: anime.data.aired.string },
                    { label: "Members", value: anime.data.members },
                    { label: "Rating", value: anime.data.rating },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="min-w-32 flex flex-col justify-center items-center rounded-lg border border-color-primary p-3 bg-[#0f0f0f4d]"
                    >
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-lg font-semibold">{item.value}</p>
                    </div>
                ))}
            </div>
            <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-4 text-color-primary">
                <Image
                    src={anime.data.images.webp.image_url}
                    alt={anime.data.title}
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg w-full sm:w-72 object-cover"
                />
                <div className="flex flex-col gap-4">
                    <p className="text-justify">{anime.data.synopsis}</p>
                </div>
            </div>
            <div className="px-4 mt-8">
                <h3 className="text-xl font-semibold text-color-primary mb-4">
                    🎬 Streaming / Link Episode
                </h3>
                <StreamingList episodes={streaming?.data} />
            </div>
            <div className="p-4 mt-8">
                <h3 className="text-2xl text-color-primary mb-2 font-semibold">
                    Komentar Kalian
                </h3>
                <CommentBox anime_mal_id={id} />
                {user && (
                    <CommentInput
                        anime_mal_id={id}
                        user_email={user?.email}
                        username={user?.name}
                        anime_title={anime.data.title}
                    />
                )}
            </div>
            <div className="px-4 pb-10">
                <VideoPlayer YouTubeId={anime.data.trailer.youtube_id} />
            </div>
        </>
    )
}

export default Page
