import Peer, { type MediaConnection } from "peerjs";
import type ParticipantSelf from "../ParticipantSelf";
import { ParticipantsOther } from "../ParticipantOther";
import type { TracksActive } from "../utils";

const URL_PEERJS = import.meta.env.VITE_PEER_BACKEND_URL;
const PATH_PEERJS = import.meta.env.VITE_PEER_SERVER_PATH;
const IS_SECURE_PEERJS = import.meta.env.VITE_PEER_SERVER_IS_SECURE == "true";
const PORT_PEERJS = import.meta.env.VITE_PEER_SERVER_PORT;

export class P2P
{
    peer: Peer;
    participant_self: ParticipantSelf;
    participants_other: ParticipantsOther;

    private incoming_calls = new Map<string, MediaConnection>();
    private outgoing_calls = new Map<string, MediaConnection>();

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
            this.call_all_participants();
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
            this.incoming_calls.set(call.peer, call);

            const on_receive_stream = (stream: MediaStream) =>
            {
                console.log("receiving call from peer...");
                this.participants_other
                    .add_or_set_participant_by_id(call.peer)
                    .set_tracks_from_stream(stream, call.metadata as TracksActive);
            };

            call.once("stream", on_receive_stream);
            call.once("close", () => this.incoming_calls.delete(call.peer));

            if (!this.outgoing_calls.has(call.peer))
            {
                this.call_user_by_id(call.peer);
            }
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

        const call = this.peer.call(user_id, my_stream, {
            metadata: {
                microphone_track: Boolean(microphone_track),
                webcam_track_1: Boolean(webcam_track),
                screenshare_track_2: Boolean(screenshare_track),
            } as TracksActive,
        });

        call.on("stream", () => console.info("receiving answer from call"));

        this.outgoing_calls.set(user_id, call);
    }

    call_all_participants()
    {
        this.close_all_outgoing_call();
        const other_ids = this.participants_other.get_participants_ids();
        other_ids.forEach((id) => this.call_user_by_id(id));
    }

    close_all_outgoing_call()
    {
        const calls = [...this.outgoing_calls.values()];
        calls.forEach((call) => call.close());
        this.outgoing_calls.clear();
    }
}
