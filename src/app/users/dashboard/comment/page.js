export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { authUserSession } from "@/libs/auth-libs";
import Link from "next/link";
import Header from "@/components/dashboard/header";

const Page = async () => {
    try {
        const user = await authUserSession();

        if (!user?.email) {
            return (
                <section className="mt-4 px-4 w-full">
                    <Header title="My Comment" />
                    <p className="text-color-primary">
                        Silakan login untuk melihat komentar Anda.
                    </p>
                </section>
            );
        }

        // 🔥 IMPORT PRISMA DI SINI
        const prisma = (await import("@/libs/prisma")).default;

        const comments = await prisma.comment.findMany({
            where: {
                user_email: user.email,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return (
            <section className="mt-4 px-4 w-full">
                <Header title="My Comment" />

                {comments.length === 0 && (
                    <p className="text-color-primary">
                        Anda belum menulis komentar.
                    </p>
                )}

                <div className="grid grid-cols-1 py-4 gap-4">
                    {comments.map((comment) => (
                        <Link
                            key={comment.id}
                            href={`/anime/${comment.anime_mal_id}`}
                            className="bg-color-primary text-color-dark p-4 rounded"
                        >
                            <p className="text-sm font-semibold">
                                {comment.anime_title}
                            </p>
                            <p className="italic">{comment.comment}</p>
                        </Link>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error("My Comment page error:", error);

        return (
            <section className="p-10 text-center text-red-500">
                Gagal memuat komentar.
            </section>
        );
    }
};

export default Page;
