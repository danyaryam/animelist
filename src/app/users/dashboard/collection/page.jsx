export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/dashboard/header";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";

const Page = async () => {
    const user = await authUserSession()
    if (!user?.email) {
        return (
            <section className="mt-4 px-4 w-full">
                <Header title="My Collection" />
                <p className="text-color-primary">
                    Silakan login untuk melihat koleksi Anda.
                </p>
            </section>
        )
    }

    const collection = await prisma.collection.findMany({
        where: {
            user_email: user.email,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <section className="mt-4 px-4 w-full">
            <Header title={"My Collection"} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {collection.map((collect, index) => {
                    return (
                        <Link key={index} href={'/anime/${collect.anime_mal_id}'} className="relative">
                            <Image
                                src={collect.anime_image}
                                alt={collect.anime_image}
                                width={350}
                                height={350}
                                className="w-full"
                            />
                            <div className="absolute flex items-center justify-center bottom-0 bg-color-accent h-16 w-full">
                                <h5 className="text-xl text-center">{collect.anime_title}</h5>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default Page