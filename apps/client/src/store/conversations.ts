import { computed } from "nanostores";
import { $players_other_persisted } from "./players_other";
import { persistentAtom } from "@nanostores/persistent";
import { persist_config } from "./persist_config";

type Message = {
    sender: string;
    message: string;
};

type Conversation = {
    _id: string;
    participants: string[];
    messages: Message[];
};

const test_data = [
    {
        _id: "cndhjsbcd",
        participants: ["azerty"],
        messages: [{ sender: "azerty", message: "hello world !" }],
    },
];

const $conversations_persisted = persistentAtom<Conversation[]>(
    "conversations",
    test_data,
    persist_config,
);

export const $conversations_preview = computed(
    [$conversations_persisted, $players_other_persisted],
    (conversations, players_other) =>
    {
        return conversations.map((c) =>
        {
            const pop_participants = c.participants.map((id) => players_other[id]);
            return { _id: c._id, last_message: c.messages[0], participants: pop_participants };
        });
    },
);
