import * as ClientToServerEvents from "./socket.events.client";
import * as ServerToClientEvents from "./socket.events.server";
import * as InterServerEvents from "./socket.events.interserver";
import * as Common from "./socket.common";

export { ClientToServerEvents, ServerToClientEvents, Common, InterServerEvents };

// export interface ClientToServerEvents
// {
//     "client:connect": (data: TPlayerData) => void;

//     "client:chat:send-message-global": (data: { message: TMessage }) => void;
//     "client:chat:send-message-to-player": (data: {
//         to_player_id: string;
//         message: TMessage;
//     }) => void;

//     "client:game:player:movement": (data: TPlayerSpacial) => void;
//     "client:game:player:info": (data: TPlayerInfo) => void;
//     "client:game:player:stream": (data: TPlayerStream) => void;
// }
