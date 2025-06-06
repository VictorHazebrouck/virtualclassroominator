import { useEffect, useState } from "react";
import { ParticipantSelf_S, ParticipantsOther_S } from ".";

export function use_get_personal_video()
{
    const [video_track, set_video_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        return ParticipantSelf_S.on_webcam_share((track) =>
        {
            set_video_track(track);
        });
    }, []);

    return video_track;
}

export function use_get_personal_audio()
{
    const [audio_track, set_audio_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        return ParticipantSelf_S.on_microphone_share((track) =>
        {
            set_audio_track(track);
        });
    }, []);

    return audio_track;
}

export function use_get_personal_screenshare()
{
    const [screenshare_track, set_screenshare_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        return ParticipantSelf_S.on_screenshare_share((track) =>
        {
            set_screenshare_track(track);
        });
    }, []);

    return screenshare_track;
}

export function use_set_personal_screenshare()
{
    return async (on: boolean) =>
    {
        await ParticipantSelf_S.toggle_screenshare(on);
    };
}

export function use_set_personal_webcam()
{
    return async (on: boolean) =>
    {
        await ParticipantSelf_S.toggle_webcam(on);
    };
}
export function use_set_personal_microphone()
{
    return async (on: boolean) =>
    {
        await ParticipantSelf_S.toggle_microphone(on);
    };
}

export function use_get_user_screenshare_by_id(user_id: string)
{
    const [screenshare_track, set_screenshare_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        const participant = ParticipantsOther_S.get_participant_by_id(user_id);
        if (!participant) return;

        set_screenshare_track(participant.screenshare_track || null);

        return participant.on_screenshare_share((track) =>
        {
            set_screenshare_track(track);
        });
    }, []);

    return screenshare_track;
}

export function use_get_user_audio_by_id(user_id: string)
{
    const [audio_track, set_audio_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        const participant = ParticipantsOther_S.get_participant_by_id(user_id);
        if (!participant) return;

        set_audio_track(participant.microphone_track || null);

        return participant.on_microphone_share((track) =>
        {
            set_audio_track(track);
        });
    }, []);

    return audio_track;
}

export function use_get_user_video_by_id(user_id: string)
{
    const [video_track, set_video_track] = useState<MediaStreamTrack | null>(null);

    useEffect(() =>
    {
        const participant = ParticipantsOther_S.get_participant_by_id(user_id);
        if (!participant) return;

        set_video_track(participant.webcam_track || null);

        return participant.on_webcam_share((track) =>
        {
            set_video_track(track);
        });
    }, []);

    return video_track;
}
