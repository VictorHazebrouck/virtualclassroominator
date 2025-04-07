import Peer from "peerjs";
import type ParticipantSelf from "../ParticipantSelf";
import { ParticipantsOther } from "../ParticipantOther";

const URL_PEERJS = import.meta.env.VITE_PEERJS_BACKEND_URL;
const PATH_PEERJS = import.meta.env.VITE_PEER_SERVER_PATH;
const IS_SECURE_PEERJS = import.meta.env.VITE_PEER_SERVER_IS_SECURE == "true";
const PORT_PEERJS = import.meta.env.VITE_PEER_SERVER_PORT;

export class P2P
{
    peer: Peer;
    participant_self: ParticipantSelf;
    participants_other: ParticipantsOther;
    my_stream: MediaStream;

    constructor(
        user_id: string,
        participant_self: ParticipantSelf,
        participants_other: ParticipantsOther,
    )
    {
        this.participant_self = participant_self;
        this.participants_other = participants_other;

        this.my_stream = new MediaStream();

        this.peer = new Peer(user_id, {
            host: URL_PEERJS,
            path: PATH_PEERJS,
            secure: IS_SECURE_PEERJS,
            port: PORT_PEERJS,
        });

        this.init_participant_self_track_change();
        this.init_call_reception_from_other_players();
    }

    init_participant_self_track_change()
    {
        const updateTracks = () =>
        {
            // Clear existing tracks from our stream
            this.my_stream.getTracks().forEach((track) => this.my_stream.removeTrack(track));

            // Add available tracks
            const newTracks = [
                this.participant_self.microphone_track,
                this.participant_self.webcam_track,
                this.participant_self.screenshare_track,
            ].filter((t): t is MediaStreamTrack => !!t);

            newTracks.forEach((track) => this.my_stream.addTrack(track));

            // Reconnect
            this.call_many_by_ids();
        };

        this.participant_self.on_webcam_share(updateTracks);
        this.participant_self.on_microphone_share(updateTracks);
        this.participant_self.on_screenshare_share(updateTracks);
    }

    init_call_reception_from_other_players()
    {
        this.peer.on("call", (call) =>
        {
            call.answer(this.my_stream);

            const on_receive_stream = (stream: MediaStream) =>
            {
                this.participants_other.add_or_set_participant_by_id(call.peer, stream);
            };

            call.on("stream", on_receive_stream);
        });
    }

    call_user_by_id(user_id: string)
    {
        const call = this.peer.call(user_id, this.my_stream);

        const on_receive_stream = (stream: MediaStream) =>
        {
            this.participants_other.add_or_set_participant_by_id(user_id, stream);
        };

        call.on("stream", on_receive_stream);
    }

    call_many_by_ids()
    {
        const other_ids = this.participants_other.get_participants_ids();

        this.close_all_connections(); // Clean slate before calling again

        other_ids.forEach((id) =>
        {
            this.call_user_by_id(id);
        });
    }

    close_all_connections()
    {
        const connections = this.peer.connections;

        Object.values(connections).forEach((conns: any[]) => conns.forEach((conn) => conn.close()));
    }
}
