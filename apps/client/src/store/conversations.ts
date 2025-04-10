import { computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { persist_config } from "./persist_config";
import { $players_other_persisted } from "./players_other_persisted";
import { v4 as uuidv4 } from "uuid";
import { $player_self } from "./player_self";

export type Message = {
    _id: string;
    sender: string;
    message: string;
};

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
                last_message: c.messages[0],
                all_messages: c.messages,
                participant: pop_participant,
            };
        });
    },
);

export function new_message_from_self(receiver_id: string, message: string)
{
    const conversations_list = $conversations_persisted.get();
    const conversation = conversations_list.find((e) => e.receiver_id == receiver_id);

    const new_message = {
        _id: uuidv4(),
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
}
