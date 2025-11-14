import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Mangalist = ({ api }) => {
    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4 ">
            {api.data?.map((manga, index) => {
                return (
                    <Link href={`/manga/${manga.mal_id}`} className="cursor-pointer text-color-primary 
                    hover:text-color-accent transition-all"
                        key={index}
                    >
                        <Image
                            src={manga.images.webp.image_url}
                            alt="..."
                            width={350}
                            height={350}
                            className="w-full max-h-64 object-cover"
                        />
                        <h3 className="font-bold md:text-xl text-md p-4">{manga.title}</h3>
                    </Link>
                )
            })}
        </div>
    )
}

export default Mangalist