import { useEffect, useRef } from "react";

export type VideoProps = {
    videotrack?: MediaStreamTrack | null;
    audiotrack?: MediaStreamTrack | null;
    className?: string;
};

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
        <div className={className}>
            {videotrack && <video ref={videoRef} autoPlay playsInline muted />}
            {audiotrack && <audio ref={audioRef} autoPlay />}
        </div>
    );
}
