"use client"

import { useState } from "react"
import YouTube from "react-youtube"

const VideoPlayer = ({ YouTubeId }) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleVideoPlayer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const option = {
        width: "300",
        height: "250",
    }

    const Player = () => {
        return (
            <div className="fixed bottom-2 right-2">
                <button
                    onClick={handleVideoPlayer}
                    className="text-color-accent float-right bg-color-secondary px-3 mb-1"
                >
                    X
                </button>
                <YouTube
                    videoId={YouTubeId}
                    onReady={(Event) => Event.target.pauseVideo()}
                    opts={option}
                    onError={() => alert("Video is broken.")}
                />
            </div>
        )
    }

    const ButtonOpenPlayer = () => {
        return (
            <button
                onClick={handleVideoPlayer}
                className="rpunded fixed bottom-5 right-5 
                bg-color-secondary text-color-accent p-2 
                hover:bg-color-primary transition-all shadow-xl"
            >
                Tonton Trailer!!
            </button>
        )
    }

    return isOpen ? <Player /> : <ButtonOpenPlayer />
}

export default VideoPlayer