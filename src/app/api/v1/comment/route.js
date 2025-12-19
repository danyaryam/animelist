import prisma from "@/libs/prisma"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const anime_mal_id = searchParams.get("anime_mal_id")

    if (!anime_mal_id) {
        return Response.json({ comments: [] }, { status: 400 })
    }

    const comments = await prisma.comment.findMany({
        where: { anime_mal_id },
        orderBy: { createdAt: "desc" },
    })

    return Response.json({ comments })
}
