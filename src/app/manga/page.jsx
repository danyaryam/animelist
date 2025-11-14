import Link from "next/link";
import Image from "next/image";
import { getMangaResponse } from "@/libs/api-libs";

const Page = async () => {
    const manga = await getMangaResponse("manga");

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-color-primary mb-6">
                Daftar Manga
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
                {manga.data?.map((item) => (
                    <Link
                        key={item.mal_id}
                        href={`/manga/${item.mal_id}`}
                        className="group"
                    >
                        <div className="rounded overflow-hidden shadow hover:shadow-lg transition ">
                            <Image
                                src={item.images.webp.image_url}
                                alt={item.title}
                                width={300}
                                height={400}
                                className="w-full h-64 object-cover group-hover:opacity-80 transition"
                            />
                            <div className="p-2">
                                <h3 className="text-sm font-semibold text-color-primary line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-color-primary mt-1">
                                    Score: {item.score ?? "-"}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Page;