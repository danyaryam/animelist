import prisma from "@/libs/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const anime_mal_id = searchParams.get("anime_mal_id")

        if (!anime_mal_id) {
            return Response.json({ comments: [] })
        }

        const comments = await prisma.comment.findMany({
            where: { anime_mal_id: String(anime_mal_id) },
            orderBy: { createdAt: "desc" },
        })

        return Response.json({ comments })
    } catch (error) {
        console.error("GET /api/v1/comment:", error)
        return Response.json({ comments: [] }, { status: 500 })
    }
}
