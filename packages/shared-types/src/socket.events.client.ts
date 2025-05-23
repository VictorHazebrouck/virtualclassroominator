import { Type as t } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import type {
    TMessage,
    TPlayerData,
    TPlayerInfo,
    TPlayerSpacial,
    TPlayerStream,
} from "./socket.common";
import { TBMessage } from "./socket.common";

export interface ClientToServerEvents
{
    "client:connect": (data: TPlayerData) => void;

    "client:chat:send-message-global": (data: TMessage) => void;
    "client:chat:send-message-to-player": (data: TClientChatSendMessageToPlayer) => void;

    "client:game:player:movement": (data: TPlayerSpacial) => void;
    "client:game:player:info": (data: TPlayerInfo) => void;
    "client:game:player:stream": (data: TPlayerStream) => void;
}

export const TBClientChatSendMessageToPlayer = t.Object({
    to_player_id: t.String(),
    message: TBMessage,
});
export const TBClientChatSendMessageToPlayerValidator = TypeCompiler.Compile(
    TBClientChatSendMessageToPlayer,
);
type TClientChatSendMessageToPlayer = typeof TBClientChatSendMessageToPlayer.static;
