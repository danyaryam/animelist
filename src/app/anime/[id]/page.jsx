export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "@/components/Utilities/VideoPlayer";
import CollectionButton from "@/components/AnimeList/collectionButton";
import CommentBox from "@/components/AnimeList/commentBox";
import CommentInput from "@/components/AnimeList/commentInput";
import StreamingList from "@/components/streaming/page";

import { getAnimeResponse, getStreamingResponse } from "@/libs/api-libs";
import { authUserSession } from "@/libs/auth-libs";

const Page = async ({ params }) => {
    try {
        const id = String(params.id);

        const anime = await getAnimeResponse(`anime/${id}`);
        const streaming = await getStreamingResponse(`anime/${id}/streaming`);
        const user = await authUserSession();

        let collection = null;

        if (user?.email) {
            const prisma = (await import("@/libs/prisma")).default;
            collection = await prisma.collection.findFirst({
                where: {
                    user_email: user.email,
                    anime_mal_id: id,
                },
            });
        }

        return (
            <>
                <div className="pt-4 px-4 flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-color-primary">
                        {anime.data.title} ({anime.data.year})
                    </h3>

                    {!collection && user && (
                        <CollectionButton
                            anime_mal_id={id}
                            user_email={user.email}
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
                    ].map((item, i) => (
                        <div key={i} className="min-w-32 text-center border p-3 rounded">
                            <h3>{item.label}</h3>
                            <p className="font-semibold">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-4 px-4 flex gap-4 flex-wrap text-color-primary">
                    <Image
                        src={anime.data.images.webp.image_url}
                        alt={anime.data.title}
                        width={300}
                        height={300}
                        className="rounded-lg"
                    />
                    <p className="text-justify">{anime.data.synopsis}</p>
                </div>

                <div className="px-4 mt-8">
                    <StreamingList episodes={streaming?.data} />
                </div>

                <div className="p-4 mt-8">
                    <h3 className="text-xl font-semibold text-color-primary">
                        Komentar Kalian
                    </h3>

                    <CommentBox anime_mal_id={id} />

                    {user && (
                        <CommentInput
                            anime_mal_id={id}
                            user_email={user.email}
                            username={user.name}
                            anime_title={anime.data.title}
                        />
                    )}
                </div>

                <div className="px-4 pb-10">
                    <VideoPlayer YouTubeId={anime.data.trailer?.youtube_id} />
                </div>
            </>
        );
    } catch (error) {
        console.error("Anime detail page error:", error);

        return (
            <div className="p-10 text-center text-red-500">
                Gagal memuat data anime.
            </div>
        );
    }
};

export default Page;
