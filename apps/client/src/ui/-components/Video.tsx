import { useEffect, useRef } from "react";
import { tm } from "~/utils/tm";

export interface VideoProps
{
    videotrack?: MediaStreamTrack | null;
    className?: string;
}
/**
 * Base Video components with proper aspect ratio as well as a base size.
 * Covers, crops, and centers the video element.
 */
export function Video({ videotrack, className }: VideoProps)
{
    const video_ref = useRef<HTMLVideoElement>(null);

    useEffect(() =>
    {
        const stream = new MediaStream();

        if (videotrack)
        {
            stream.addTrack(videotrack);
            video_ref.current!.srcObject = stream;
        }
    }, [videotrack]);

    return (
        <video
            className={tm("h-full w-full object-cover", className)}
            ref={video_ref}
            autoPlay
            playsInline
            muted
        />
    );
}

export interface AudioProps
{
    audiotrack?: MediaStreamTrack | null;
}
export function Audio({ audiotrack }: AudioProps)
{
    const audio_ref = useRef<HTMLAudioElement>(null);

    useEffect(() =>
    {
        const stream = new MediaStream();

        if (audiotrack)
        {
            stream.addTrack(audiotrack);
            audio_ref.current!.srcObject = stream;
        }
    }, [audiotrack]);

    return <audio ref={audio_ref} autoPlay />;
}

export interface VideoLayoutProps
{
    className?: string;
    children?: React.ReactNode;
}
export function VideoLayout({ className, children }: VideoLayoutProps)
{
    return (
        <div
            className={tm(
                "relative flex aspect-video w-62 flex-none items-center justify-center overflow-hidden rounded-lg bg-gray-800",
                className,
            )}
        >
            {children}
        </div>
    );
}

export interface VideoLayoutLabelProps
{
    className?: string;
    children?: React.ReactNode;
}
export function VideoLayoutLabel({ className, children }: VideoLayoutLabelProps)
{
    return (
        <div
            className={tm(
                "absolute top-1 left-1 flex items-center justify-center gap-2 rounded-md bg-black/80 px-3",
                className,
            )}
        >
            {children}
        </div>
    );
}

export interface VideoScreenShareProps
{
    label: string;
    video_track?: MediaStreamTrack | null;
}
export function VideoScreenShare({ label, video_track }: VideoScreenShareProps)
{
    return (
        <VideoLayout>
            <VideoLayoutLabel>
                <h6 className="-mt-[3px] text-white">{label}</h6>
            </VideoLayoutLabel>
            <Video videotrack={video_track} />
        </VideoLayout>
    );
}
