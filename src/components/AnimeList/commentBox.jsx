"use client"

import { useEffect, useState } from "react"

const CommentBox = ({ anime_mal_id }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchComments() {
            const res = await fetch(`/api/v1/comment?anime_mal_id=${anime_mal_id}`)
            const data = await res.json()
            setComments(data.comments || [])
            setLoading(false)
        }

        fetchComments()
    }, [anime_mal_id])

    if (loading) {
        return <p className="text-color-primary">Memuat komentar...</p>
    }

    if (comments.length === 0) {
        return <p className="text-color-primary">Belum ada komentar.</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="text-color-dark bg-color-primary p-4 rounded"
                >
                    <p className="font-semibold">{comment.username}</p>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    )
}

export default CommentBox
