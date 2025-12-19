import prisma from "@/libs/prisma"

export const dynamic = "force-dynamic"   // 🔥 WAJIB
export const runtime = "nodejs"          // 🔥 WAJIB (Prisma)

export async function POST(request) {
    try {
        const body = await request.json()

        if (!body?.user_email || !body?.anime_mal_id) {
            return Response.json(
                { isCreated: false, message: "Invalid payload" },
                { status: 400 }
            )
        }

        await prisma.collection.create({
            data: {
                anime_mal_id: String(body.anime_mal_id),
                user_email: body.user_email,
                anime_image: body.anime_image,
                anime_title: body.anime_title,
            },
        })

        return Response.json({ isCreated: true })
    } catch (error) {
        console.error("POST /api/v1/collection error:", error)

        return Response.json(
            { isCreated: false, message: "Gagal menyimpan koleksi" },
            { status: 500 }
        )
    }
}
