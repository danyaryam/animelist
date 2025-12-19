import prisma from '@/libs/prisma'

export const runtime = 'nodejs'

export async function POST(request) {
    try {
        const {
            anime_mal_id,
            user_email,
            comment,
            username,
            anime_title
        } = await request.json()

        // Validasi minimal (opsional tapi direkomendasikan)
        if (!anime_mal_id || !user_email || !comment) {
            return Response.json(
                { isCreated: false, message: 'Invalid payload' },
                { status: 400 }
            )
        }

        await prisma.comment.create({
            data: {
                anime_mal_id,
                user_email,
                comment,
                username,
                anime_title
            }
        })

        return Response.json(
            { isCreated: true },
            { status: 201 }
        )
    } catch (error) {
        console.error('Create comment error:', error)

        return Response.json(
            { isCreated: false, message: error.message },
            { status: 500 }
        )
    }
}
