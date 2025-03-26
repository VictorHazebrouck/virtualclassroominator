export async function request_screenshare_track()
{
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
    });
    const screen_track = stream.getVideoTracks()[0]!;
    return screen_track;
}

export async function request_webcam_track()
{
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video_track = stream.getVideoTracks()[0]!;
    return video_track;
}

export async function request_microphone_track()
{
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audio_track = stream.getAudioTracks()[0]!;
    return audio_track;
}
