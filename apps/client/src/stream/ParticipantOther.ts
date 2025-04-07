import { Participant } from "./Participant";

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

    add_or_set_participant_by_id(user_id: string, stream?: MediaStream)
    {
        let participant = this.participants_map.get(user_id);

        if (!participant)
        {
            participant = new ParticipantOther(user_id);
            this.participants_map.set(user_id, participant);
        }

        this.set_participant_stream(participant, stream);
    }

    set_participant_stream(participant: ParticipantOther, stream?: MediaStream)
    {
        const [audiotrack] = stream?.getAudioTracks() || [];

        if (audiotrack) participant.toggle_microphone(audiotrack);
        else participant.toggle_microphone(null);

        const [videotrack1, videotrack2] = stream?.getVideoTracks() || [];

        if (videotrack1) participant.toggle_webcam(videotrack1);
        else participant.toggle_webcam(null);

        if (videotrack2) participant.toggle_screenshare(videotrack2);
        else participant.toggle_screenshare(null);
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
    }
}
