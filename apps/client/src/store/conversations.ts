import { persistentAtom } from "@nanostores/persistent";
import type { Message } from "@repo/shared-types/socket";
import { computed } from "nanostores";
import { v7 as uuidv7 } from "uuid";
import Socket from "~/socket/SocketIO";
import { persist_config } from "./persist_config";
import { $player_self } from "./player_self";
import { $players_other } from "./players_other";
import { $players_other_persisted } from "./players_other_persisted";

export type Conversation = {
    receiver_id: string;
    messages: Message[];
};

export const $conversations_persisted = persistentAtom<Conversation[]>(
    "conversations",
    [],
    persist_config,
);

export const $conversations_preview = computed(
    [$conversations_persisted, $players_other_persisted],
    (conversations, players_other) =>
    {
        return conversations.map((c) =>
        {
            const pop_participant = players_other[c.receiver_id];
            return {
                last_message: c.messages[c.messages.length - 1],
                all_messages: c.messages,
                participant: pop_participant,
            };
        });
    },
);

export function new_message_from_self(receiver_id: string, message: string)
{
    if (!$players_other.get()[receiver_id])
        return alert("Player not connected.\nCannot send message.");

    const conversations_list = $conversations_persisted.get();
    const conversation = conversations_list.find((e) => e.receiver_id == receiver_id);

    const new_message = {
        _id: uuidv7(),
        message: message,
        sender: $player_self.get()._id,
    };

    if (!conversation)
    {
        $conversations_persisted.set([
            ...conversations_list,
            {
                receiver_id: receiver_id,
                messages: [new_message],
            },
        ]);
    }
    else
    {
        $conversations_persisted.set([
            ...conversations_list.filter((e) => e !== conversation),
            {
                ...conversation,
                messages: [...conversation.messages, new_message],
            },
        ]);
    }

    Socket.emit("client:chat:send-message-to-player", {
        to_player_id: receiver_id,
        message: new_message,
    });
}

export function new_message_from_other_player(sender_id: string, new_message: Message)
{
    if (!$players_other_persisted.get()[sender_id])
        return alert("Error receving message.\nCannot match sender_id.");

    const conversations_list = $conversations_persisted.get();
    const conversation = conversations_list.find((e) => e.receiver_id == sender_id);

    if (!conversation)
    {
        $conversations_persisted.set([
            ...conversations_list,
            {
                receiver_id: sender_id,
                messages: [new_message],
            },
        ]);
    }
    else
    {
        $conversations_persisted.set([
            ...conversations_list.filter((e) => e !== conversation),
            {
                ...conversation,
                messages: [...conversation.messages, new_message],
            },
        ]);
    }
}
