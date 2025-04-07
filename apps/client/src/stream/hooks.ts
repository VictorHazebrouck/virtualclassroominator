import { useEffect, useState } from "react";
import { ConversationManager } from ".";

const ParticipantSelf = ConversationManager.participant_self;

export function use_get_personal_video()
{
    const [video_track, set_video_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        return ParticipantSelf.on_webcam_share((on, track) =>
        {
            if (on === true) set_video_track(track!);
            else set_video_track(null);
        });
    }, []);

    return video_track;
}

export function use_get_personal_audio()
{
    const [audio_track, set_audio_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        return ParticipantSelf.on_microphone_share((on, track) =>
        {
            if (on === true) set_audio_track(track!);
            else set_audio_track(null);
        });
    }, []);

    return audio_track;
}

export function use_get_personal_screenshare()
{
    const [screenshare_track, set_screenshare_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        return ParticipantSelf.on_screenshare_share((on, track) =>
        {
            if (on === true) set_screenshare_track(track!);
            else set_screenshare_track(null);
        });
    }, []);

    return screenshare_track;
}

export function use_set_personal_screenshare()
{
    return async (on: boolean) =>
    {
        await ParticipantSelf.toggle_screenshare(on);
    };
}

export function use_set_personal_webcam()
{
    return async (on: boolean) =>
    {
        await ParticipantSelf.toggle_webcam(on);
    };
}
export function use_set_personal_microphone()
{
    return async (on: boolean) =>
    {
        await ParticipantSelf.toggle_microphone(on);
    };
}
