import { Participant } from "./Participant";
import type { TracksActive } from "./utils";

export class ParticipantOther extends Participant
{
    toggle_webcam = this._toggle_webcam;
    toggle_microphone = this._toggle_microphone;
    toggle_screenshare = this._toggle_screenshare;

    set_tracks_from_stream(stream: MediaStream, tracks_active: TracksActive)
    {
        const [audiotrack] = stream?.getAudioTracks() || [];

        if (audiotrack) this.toggle_microphone(audiotrack);
        else this.toggle_microphone(null);

        const [videotrack1, videotrack2] = stream?.getVideoTracks() || [];

        if (tracks_active?.webcam_track_1 && tracks_active?.screenshare_track_2)
        {
            if (videotrack1) this.toggle_webcam(videotrack1);
            if (videotrack2) this.toggle_screenshare(videotrack2);
        }
        else if (tracks_active?.webcam_track_1 && !tracks_active?.screenshare_track_2)
        {
            if (videotrack1) this.toggle_webcam(videotrack1);
            this.toggle_screenshare(null);
        }
        else if (tracks_active?.screenshare_track_2 && !tracks_active?.webcam_track_1)
        {
            if (videotrack1) this.toggle_screenshare(videotrack1);
            this.toggle_webcam(null);
        }
    }
}

export class ParticipantsOther
{
    participants_map = new Map<string, ParticipantOther>();

    get_participants_ids()
    {
        return [...this.participants_map.keys()];
    }

    add_or_set_participant_by_id(user_id: string)
    {
        let participant = this.participants_map.get(user_id);

        if (!participant)
        {
            participant = new ParticipantOther(user_id);
            this.participants_map.set(user_id, participant);
        }

        return participant;
    }

    remove_participant_by_id(user_id: string)
    {
        const participant = this.participants_map.get(user_id);
        if (!participant) return;

        participant.cleanup();
        this.participants_map.delete(user_id);
    }

    get_participant_by_id(user_id: string)
    {
        return this.participants_map.get(user_id);
    }
}
