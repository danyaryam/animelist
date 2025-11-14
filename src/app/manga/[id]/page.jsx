import { getMangaResponse } from "@/libs/api-libs";
import Image from "next/image";
import CollectionButton from "@/components/AnimeList/collectionButton";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import CommentInput from "@/components/AnimeList/commentInput";
import CommentBox from "@/components/AnimeList/commentBox";

const Page = async ({ params: { id } }) => {
    const manga = await getMangaResponse(`manga/${id}`);
    const user = await authUserSession();

    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id }
    });

    return (
        <>
            <div className="pt-4 px-4">
                <h3 className="text-2xl text-color-primary">
                    {manga?.data?.title} - {manga?.data?.published?.prop?.from?.year}
                </h3>
                {!collection && user && (
                    <CollectionButton
                        anime_mal_id={id}
                        user_email={user?.email}
                        anime_image={manga.data.images.webp.image_url}
                        anime_title={manga.data.title}
                    />
                )}
            </div>
            <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>Peringkat</h3>
                    <p>{manga.data.rank}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>Score</h3>
                    <p>{manga.data.score}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>Chapters</h3>
                    <p>{manga.data.chapters ?? "-"}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>Volumes</h3>
                    <p>{manga.data.volumes ?? "-"}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>Published</h3>
                    <p>{manga.data.published.string}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
                    <h3>Members</h3>
                    <p>{manga.data.members}</p>
                </div>
            </div>
            <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2 text-color-primary">
                <Image
                    src={manga.data.images.webp.image_url}
                    alt={manga.data.title}
                    width={250}
                    height={250}
                    className="w-full rounded object-cover"
                />
                <p className="text-justify">
                    {manga.data.synopsis}
                </p>
            </div>
            <div className="p-4">
                <h3 className="text-2xl text-color-primary mb-2">
                    Komentar kalian...
                </h3>
                <CommentBox anime_mal_id={id} />
                {user && (
                    <CommentInput
                        anime_mal_id={id}
                        user_email={user?.email}
                        username={user?.name}
                        anime_title={manga.data.title}
                    />
                )}
            </div>
        </>
    );
};

export default Page;