import Peer from "peerjs";
import type ParticipantSelf from "../ParticipantSelf";
import { ParticipantsOther } from "../ParticipantOther";
import type { TracksActive } from "../utils";

const URL_PEERJS = import.meta.env.VITE_PEERJS_BACKEND_URL;
const PATH_PEERJS = import.meta.env.VITE_PEER_SERVER_PATH;
const IS_SECURE_PEERJS = import.meta.env.VITE_PEER_SERVER_IS_SECURE == "true";
const PORT_PEERJS = import.meta.env.VITE_PEER_SERVER_PORT;

export class P2P
{
    peer: Peer;
    participant_self: ParticipantSelf;
    participants_other: ParticipantsOther;

    constructor(participant_self: ParticipantSelf, participants_other: ParticipantsOther)
    {
        this.participant_self = participant_self;
        this.participants_other = participants_other;

        this.peer = new Peer(this.participant_self._id, {
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
            call.answer();

            const on_receive_stream = (stream: MediaStream) =>
            {
                this.participants_other.add_or_set_participant_by_id(
                    call.peer,
                    stream,
                    call.metadata as TracksActive,
                );
            };

            call.once("stream", on_receive_stream);
            call.once("close", () => console.log("call closed"));
        });
    }

    call_user_by_id(user_id: string)
    {
        const my_stream = new MediaStream();

        const microphone_track = this.participant_self.microphone_track;
        const webcam_track = this.participant_self.webcam_track;
        const screenshare_track = this.participant_self.screenshare_track;

        if (microphone_track) my_stream.addTrack(microphone_track);
        if (webcam_track) my_stream.addTrack(webcam_track);
        if (screenshare_track) my_stream.addTrack(screenshare_track);

        this.peer.call(user_id, my_stream, {
            metadata: {
                microphone_track: Boolean(microphone_track),
                webcam_track_1: Boolean(webcam_track),
                screenshare_track_2: Boolean(screenshare_track),
            } as TracksActive,
        });
    }

    call_many_by_ids()
    {
        this.close_all_connections();
        const other_ids = this.participants_other.get_participants_ids();
        other_ids.forEach((id) => this.call_user_by_id(id));
    }

    close_all_connections()
    {
        // const connections = this.peer.connections;
        // console.log(connections);
        // Object.values(connections).forEach((conns: any[]) =>
        //     conns.forEach((conn) =>
        //     {
        //         console.log("closing connection");
        //         conn.close();
        //     }),
        // );
    }
}
