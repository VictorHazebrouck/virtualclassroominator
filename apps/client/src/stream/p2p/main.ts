import Peer from "peerjs";
import type ParticipantSelf from "../ParticipantSelf";
import { ParticipantOther } from "../ParticipantOther";

const URL_PEERJS = import.meta.env.VITE_PEERJS_BACKEND_URL;
const PATH_PEERJS = import.meta.env.VITE_PEER_SERVER_PATH;
const IS_SECURE_PEERJS = import.meta.env.VITE_PEER_SERVER_IS_SECURE == "true" ? true : false;
const PORT_PEERJS = import.meta.env.VITE_PEER_SERVER_PORT;

export class P2P
{
    peer: Peer;
    participant_self: ParticipantSelf;
    participants = new Map<string, ParticipantOther>();

    constructor(user_id: string, participant_self: ParticipantSelf)
    {
        this.participant_self = participant_self;
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
        const on_track_change = () =>
        {
            const other_participants_ids = [...this.participants.keys()];
            this.call_many_by_ids(other_participants_ids);
        };

        this.participant_self.on_webcam_share(on_track_change);
        this.participant_self.on_microphone_share(on_track_change);
        this.participant_self.on_screenshare_share(on_track_change);
    }

    init_call_reception_from_other_players()
    {
        this.peer.on("call", (call) =>
        {
            call.answer(this.participant_self.stream);

            const participant = this.get_or_create_participant_by_id(call.peer);

            const on_receive_stream = (stream: MediaStream) =>
            {
                this.set_participant_stream(stream, participant);
            };

            call.on("stream", on_receive_stream);
            call.once("close", () => call.off("stream", on_receive_stream));
        });
    }

    get_or_create_participant_by_id(user_id: string)
    {
        let new_participant = this.participants.get(user_id);
        if (!new_participant)
        {
            new_participant = new ParticipantOther(user_id);
            this.participants.set(user_id, new_participant);
        }

        return new_participant;
    }

    call_user_by_id(user_id: string)
    {
        const call = this.peer.call(user_id, this.participant_self.stream);

        const participant = this.get_or_create_participant_by_id(user_id);

        const on_receive_stream = (stream: MediaStream) =>
        {
            console.log("someone answered the call");
            this.set_participant_stream(stream, participant);
        };

        call.on("stream", on_receive_stream);
        call.once("close", () => call.off("stream", on_receive_stream));
    }

    call_many_by_ids(user_ids: string[])
    {
        this.close_all_connections();

        this.participants.forEach((p, key) =>
        {
            // if (!user_ids.includes(key))
            // {
            //     console.log("player leave");

            //     const participant = this.participants.get(key);
            //     participant?.cleanup();
            //     this.participants.delete(key);
            // }

            p.cleanup();
        });

        this.participants.clear();

        user_ids.forEach((id) => this.call_user_by_id(id));
    }

    close_all_connections()
    {
        const connections = this.peer.connections;
        Object.values(connections).forEach((conns: any[]) => conns.forEach((conn) => conn.close()));
    }

    set_participant_stream(stream: MediaStream | undefined, participant: ParticipantOther)
    {
        console.log("receiving stream....", participant);
        if (!stream) return;

        const [audiotrack] = stream.getAudioTracks();

        if (audiotrack) participant.toggle_microphone(true, audiotrack);
        else participant.toggle_microphone(false);

        const [videotrack1, videotrack2] = stream.getVideoTracks();

        if (videotrack1) participant.toggle_webcam(true, videotrack1);
        else participant.toggle_webcam(false);

        if (videotrack2) participant.toggle_screenshare(true, videotrack2);
        else participant.toggle_screenshare(false);
    }
}

//     close_all_connections()
//     {}

//     call_player_by_id(player_id: string)
//     {
//         const call = this.peer.call(player_id, stream);

//         call.on("stream", (userStream) =>
//         {
//             eventBus.publish("peer_receive_media_stream", {
//                 userIdCaller: call.peer,
//                 stream: userStream,
//             });
//         });
//     }
// }

// class PeerJS extends Peer
// {
//     resetConnections()
//     {
//         Object.keys(this.connections).forEach((peerId) =>
//         {
//             //@ts-ignore
//             this.connections[peerId].forEach((conn) =>
//             {
//                 conn.close();
//             });
//         });
//     }

//     /**
//      * @param {MediaStream} stream
//      * @param {string[]} userIds
//      */
//     connectToManyByIds(stream, userIds)
//     {
//         for (let userId of userIds)
//         {
//             const call = this.call(userId, stream);

//             call.on("stream", (userStream) =>
//             {
//                 eventBus.publish("peer_receive_media_stream", {
//                     userIdCaller: call.peer,
//                     stream: userStream,
//                 });
//             });
//         }
//     }

//     init()
//     {
//         this.on("open", () =>
//         {
//             eventBus.publish("peer_successfull_initialization", undefined);
//         });

//         // succesfull access towebcam and audio
//         eventBus.once("personal_media_stream_initialized", (stream) =>
//         {
//             this.myStream = stream;

//             this.myStream.addEventListener("addtrack", (data) =>
//             {
//                 //@ts-ignore
//                 const currentUserIds = data.detail.map((e) => e.userId);

//                 this.resetConnections();
//                 this.connectToManyByIds(stream, currentUserIds);
//             });

//             this.myStream.addEventListener("removetrack", (data) =>
//             {
//                 //@ts-ignore
//                 const currentUserIds = data.detail.map((e) => e.userId);

//                 this.resetConnections();
//                 this.connectToManyByIds(stream, currentUserIds);
//             });
//         });

//         // when a new user tries to call us, handle it
//         this.on("call", (call) =>
//         {
//             call.answer(this.myStream);

//             console.log("accepting call request...");

//             call.on("stream", (stream) =>
//             {
//                 eventBus.publish("peer_receive_media_stream", {
//                     userIdCaller: call.peer,
//                     stream: stream,
//                 });
//             });

//             call.on("close", () =>
//             {
//                 console.log("call closed");
//             });
//         });
//     }
// }

// export default PeerJS;
