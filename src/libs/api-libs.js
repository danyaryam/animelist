export const getAnimeResponse = async(resource, query) => {
    const respon = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
    const anime = await respon.json()
    return anime
}

export const getNestedAnimeResponse = async(resource, objectProperty) => {
    const respon = await getAnimeResponse(resource)
    return respon.data.flatMap(item => item[objectProperty])
}

export const getMangaResponse = async(resource, query) => {
    const respon = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
    const manga = await respon.json()
    return manga
}

export const reproduce = (data, gap) => {
    const first = ~~(Math.random() * (data.length - gap) + 1)
    const last = first + gap

    const respon = {
        data: data.slice(first, last)
    }

    return respon
}