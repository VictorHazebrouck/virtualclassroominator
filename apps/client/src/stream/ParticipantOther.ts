import { Participant } from "./Participant";
import type { TracksActive } from "./utils";

export class ParticipantOther extends Participant
{
    toggle_webcam = this._toggle_webcam;
    toggle_microphone = this._toggle_microphone;
    toggle_screenshare = this._toggle_screenshare;
}

export class ParticipantsOther
{
    participants_map = new Map<string, ParticipantOther>();

    get_participants_ids()
    {
        return [...this.participants_map.keys()];
    }

    add_or_set_participant_by_id(
        user_id: string,
        stream?: MediaStream,
        tracks_active?: TracksActive,
    )
    {
        let participant = this.participants_map.get(user_id);

        if (!participant)
        {
            participant = new ParticipantOther(user_id);
            this.participants_map.set(user_id, participant);
        }

        this.set_participant_stream(participant, stream, tracks_active);
    }

    set_participant_stream(
        participant: ParticipantOther,
        stream?: MediaStream,
        tracks_active?: TracksActive,
    )
    {
        const [audiotrack] = stream?.getAudioTracks() || [];

        if (audiotrack) participant.toggle_microphone(audiotrack);
        else participant.toggle_microphone(null);

        const [videotrack1, videotrack2] = stream?.getVideoTracks() || [];

        if (tracks_active?.webcam_track_1 && tracks_active?.screenshare_track_2)
        {
            if (videotrack1) participant.toggle_webcam(videotrack1);
            if (videotrack2) participant.toggle_screenshare(videotrack2);
        }
        else if (tracks_active?.webcam_track_1 && !tracks_active?.screenshare_track_2)
        {
            if (videotrack1) participant.toggle_webcam(videotrack1);
            participant.toggle_screenshare(null);
        }
        else if (tracks_active?.screenshare_track_2 && !tracks_active?.webcam_track_1)
        {
            if (videotrack1) participant.toggle_screenshare(videotrack1);
            participant.toggle_webcam(null);
        }
    }

    handle_new_participants(new_user_ids: string[])
    {
        this.participants_map.forEach((participant, id) =>
        {
            if (!new_user_ids.includes(id))
            {
                participant.cleanup();
                this.participants_map.delete(id);
            }
        });

        new_user_ids.forEach((id) => this.add_or_set_participant_by_id(id));
        console.log(this.participants_map);
    }

    remove_all_participants()
    {
        this.participants_map.forEach((p) => p.cleanup());
        this.participants_map.clear();
    }
}
