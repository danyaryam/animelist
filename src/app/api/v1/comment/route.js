import prisma from "@/libs/prisma"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const anime_mal_id = searchParams.get("anime_mal_id")

        // Validasi parameter
        if (!anime_mal_id) {
            return Response.json(
                { success: false, comments: [] },
                { status: 400 }
            )
        }

        const comments = await prisma.comment.findMany({
            where: {
                anime_mal_id: String(anime_mal_id),
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return Response.json({
            success: true,
            comments,
        })
    } catch (error) {
        console.error("GET /api/v1/comment error:", error)

        return Response.json(
            {
                success: false,
                message: "Gagal mengambil komentar",
            },
            { status: 500 }
        )
    }
}
