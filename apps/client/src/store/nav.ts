import { persistentAtom } from "@nanostores/persistent";
import { atom, computed } from "nanostores";
import { $conversations_persisted, type Conversation } from "./conversations";

export type Tab = "chat" | "participants" | "";
export const $current_tab = persistentAtom<Tab | "">("nav-state", "");

export function close_tab_panel()
{
    $current_tab.set("");
}

export function open_tab_panel(tab_name: Tab)
{
    $current_tab.set(tab_name);
}

const $current_conversation_user_id = atom<string | null>(null);

export const $current_conversation = computed(
    [$conversations_persisted, $current_conversation_user_id],
    (conversations, user_id) =>
    {
        if (!user_id) return null;

        const conversation = conversations.find((e) => e.receiver_id == user_id);
        if (conversation) return conversation;

        const temp_conversation = {
            receiver_id: user_id,
            messages: [],
        };

        return temp_conversation;
    },
);

export function open_conversation(user_id: string)
{
    $current_conversation_user_id.set(user_id);
    open_tab_panel("chat");
}

export function close_conversation()
{
    $current_conversation_user_id.set(null);
}
