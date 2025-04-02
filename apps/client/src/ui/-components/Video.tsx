import { useEffect, useRef } from "react";
import { tm } from "~/utils/tm";

export type VideoProps = {
    videotrack?: MediaStreamTrack | null;
    audiotrack?: MediaStreamTrack | null;
    className?: string;
};

/**
 * Base Video components with proper aspect ratio as well as a base size.
 * Covers, crops, and centers the video element.
 */
export default function Video({ videotrack, audiotrack, className }: VideoProps)
{
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() =>
    {
        const stream = new MediaStream();

        if (videotrack)
        {
            stream.addTrack(videotrack);
            videoRef.current!.srcObject = stream;
        }

        if (audiotrack)
        {
            stream.addTrack(audiotrack);
            audioRef.current!.srcObject = stream;
        }
    }, [videotrack, audiotrack]);

    return (
        <div
            className={tm(
                "h-32 flex items-center justify-center overflow-hidden aspect-video rounded-lg",
                className,
            )}
        >
            {videotrack && (
                <video
                    className="w-full h-full object-cover"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                />
            )}
            {audiotrack && <audio ref={audioRef} autoPlay />}
        </div>
    );
}
