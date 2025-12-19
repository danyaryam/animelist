import prisma from '@/libs/prisma'

export const runtime = 'nodejs'

export async function POST(request) {
    try {
        const body = await request.json()

        const createCollection = await prisma.collection.create({
            data: body
        })

        return Response.json({ isCreated: true })
    } catch (error) {
        console.error(error)
        return Response.json(
            { isCreated: false, message: error.message },
            { status: 500 }
        )
    }
}