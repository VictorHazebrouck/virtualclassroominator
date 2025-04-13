export type TracksActive = {
    microphone_track: boolean;
    webcam_track_1: boolean;
    screenshare_track_2: boolean;
};

export async function request_screenshare_track()
{
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            frameRate: { ideal: 20 },
        },
        audio: false,
    });
    const screen_track = stream.getVideoTracks()[0]!;

    return screen_track;
}

export async function request_webcam_track()
{
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: { exact: 240 },
            frameRate: { exact: 20 },
        },
        audio: false,
    });
    const video_track = stream.getVideoTracks()[0]!;
    return video_track;
}

export async function request_microphone_track()
{
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
        },
        video: false,
    });
    const audio_track = stream.getAudioTracks()[0]!;
    return audio_track;
}
