import { useEffect, useState } from "react";
import { ConversationManager } from ".";

const ParticipantSelf = ConversationManager.participant_self;
const ParticipantsOther = ConversationManager.p2p_client.participants;

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

export function use_get_user_screenshare_by_id(user_id: string)
{
    const [screenshare_track, set_screenshare_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        const participant = ParticipantsOther.get(user_id);
        if (!participant) return;

        set_screenshare_track(participant.screenshare_track || null);

        return participant.on_screenshare_share((on, track) =>
        {
            if (on === true) set_screenshare_track(track!);
            else set_screenshare_track(null);
        });
    }, []);

    return screenshare_track;
}

export function use_get_user_audio_by_id(user_id: string)
{
    const [audio_track, set_audio_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        const participant = ParticipantsOther.get(user_id);
        if (!participant) return;

        set_audio_track(participant.microphone_track || null);

        return participant.on_microphone_share((on, track) =>
        {
            if (on === true) set_audio_track(track!);
            else set_audio_track(null);
        });
    }, []);

    return audio_track;
}

export function use_get_user_video_by_id(user_id: string)
{
    const [video_track, set_video_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        const participant = ParticipantsOther.get(user_id);
        if (!participant) return;

        set_video_track(participant.webcam_track || null);

        return participant.on_webcam_share((on, track) =>
        {
            console.log("reactivation video sharing...", participant);

            if (on === true) set_video_track(track!);
            else set_video_track(null);
        });
    }, []);

    return video_track;
}
