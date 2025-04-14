import { Type as t } from "@sinclair/typebox";
import {
    TBPlayerStream,
    TPlayerData,
    TMessage,
    TBPlayerSpacial,
    TBPlayerInfo,
} from "./socket.common";

export interface ServerToClientEvents
{
    "server:player-join": (data: TPlayerData) => void;
    "server:player-leave": (data: TServerPlayerLeave) => void;

    "server:chat:send-message-global": (data: TMessage) => void;
    "server:chat:send-message-to-player": (data: TMessage) => void;

    "server:game:send-gamestate": (data: TPlayerData[]) => void;
    "server:game:broadcast-player-movement": (data: TServerGameBroadcastPlayerMovement) => void;

    "server:game:broadcast-player-info": (data: TServerGameBroadcastPlayerInfo) => void;
    "server:game:broadcast-player-stream": (data: TServerGameBroadcastPlayerStream) => void;
}

export const TBServerGameBroadcastPlayerStream = t.Object({
    player_id: t.String(),
    stream: TBPlayerStream,
});
type TServerGameBroadcastPlayerStream = typeof TBServerGameBroadcastPlayerStream.static;

export const TBServerGameBroadcastPlayerInfo = t.Object({
    player_id: t.String(),
    info: TBPlayerInfo,
});
type TServerGameBroadcastPlayerInfo = typeof TBServerGameBroadcastPlayerInfo.static;

export const TBServerGameBroadcastPlayerMovement = t.Object({
    player_id: t.String(),
    spacial: TBPlayerSpacial,
});
type TServerGameBroadcastPlayerMovement = typeof TBServerGameBroadcastPlayerMovement.static;

export const TBServerPlayerLeave = t.Object({
    player_id: t.String(),
});
type TServerPlayerLeave = typeof TBServerPlayerLeave.static;
