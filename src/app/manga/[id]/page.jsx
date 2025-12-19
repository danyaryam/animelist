export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import Image from "next/image";
import CollectionButton from "@/components/AnimeList/collectionButton";
import CommentInput from "@/components/AnimeList/commentInput";
import CommentBox from "@/components/AnimeList/commentBox";

import { getMangaResponse } from "@/libs/api-libs";
import { authUserSession } from "@/libs/auth-libs";

const Page = async ({ params }) => {
    try {
        const id = String(params.id);

        const manga = await getMangaResponse(`manga/${id}`);
        const user = await authUserSession();

        if (!manga?.data) {
            throw new Error("Manga data not found");
        }

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
                <div className="pt-4 px-4">
                    <h3 className="text-2xl text-color-primary">
                        {manga.data.title}
                        {manga.data.published?.prop?.from?.year
                            ? ` - ${manga.data.published.prop.from.year}`
                            : ""}
                    </h3>

                    {!collection && user && (
                        <CollectionButton
                            anime_mal_id={id}
                            user_email={user.email}
                            anime_image={manga.data.images?.webp?.image_url}
                            anime_title={manga.data.title}
                        />
                    )}
                </div>

                <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
                    {[
                        { label: "Peringkat", value: manga.data.rank },
                        { label: "Score", value: manga.data.score },
                        { label: "Chapters", value: manga.data.chapters ?? "-" },
                        { label: "Volumes", value: manga.data.volumes ?? "-" },
                        { label: "Published", value: manga.data.published?.string ?? "-" },
                        { label: "Members", value: manga.data.members },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2"
                        >
                            <h3>{item.label}</h3>
                            <p>{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-4 px-4 flex gap-2 flex-wrap text-color-primary">
                    <Image
                        src={manga.data.images?.webp?.image_url}
                        alt={manga.data.title}
                        width={250}
                        height={250}
                        className="w-full rounded object-cover"
                    />
                    <p className="text-justify">{manga.data.synopsis}</p>
                </div>

                <div className="p-4">
                    <h3 className="text-2xl text-color-primary mb-2">
                        Komentar kalian...
                    </h3>

                    <CommentBox anime_mal_id={id} />

                    {user && (
                        <CommentInput
                            anime_mal_id={id}
                            user_email={user.email}
                            username={user.name}
                            anime_title={manga.data.title}
                        />
                    )}
                </div>
            </>
        );
    } catch (error) {
        console.error("Manga detail page error:", error);

        return (
            <div className="p-10 text-center text-red-500">
                Gagal memuat data manga.
            </div>
        );
    }
};

export default Page;
