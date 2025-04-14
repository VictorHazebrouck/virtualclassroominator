import {
    TPlayerData,
    TPlayerSpacial,
    TPlayerInfo,
    TPlayerStream,
    TBMessage,
    TMessage,
} from "./socket.common";
import { Type as t } from "@sinclair/typebox";

export interface ClientToServerEvents
{
    "client:connect": (data: TPlayerData) => void;

    "client:chat:send-message-global": (data: TMessage) => void;
    "client:chat:send-message-to-player": (data: TBClientChatSendMessageToPlayer) => void;

    "client:game:player:movement": (data: TPlayerSpacial) => void;
    "client:game:player:info": (data: TPlayerInfo) => void;
    "client:game:player:stream": (data: TPlayerStream) => void;
}

export const TBClientChatSendMessageToPlayer = t.Object({
    to_player_id: t.String(),
    message: TBMessage,
});
type TBClientChatSendMessageToPlayer = typeof TBClientChatSendMessageToPlayer.static;
