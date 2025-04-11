import { persistentAtom } from "@nanostores/persistent";
import { atom, computed, subscribeKeys } from "nanostores";
import { $conversations_persisted } from "./conversations";
import { $players_other } from "./players_other";
import { $player_self } from "./player_self";
import { $players_other_persisted } from "./players_other_persisted";

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
    [$conversations_persisted, $current_conversation_user_id, $players_other_persisted],
    (conversations, user_id, players_other) =>
    {
        const pop_user = players_other[user_id!];
        if (!user_id || !pop_user) return null;

        const conversation = conversations.find((e) => e.receiver_id == user_id);
        if (conversation)
        {
            const pop_conversation = { ...conversation, receiver: pop_user };
            return pop_conversation;
        }

        const temp_conversation = {
            receiver_id: user_id,
            receiver: pop_user,
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

export const $camera_focused_player_id = atom<string | null>(null);

export function camera_focus_player_by_id(player_id: string)
{
    const player_exists = $players_other.get()[player_id];
    if (!player_exists) return;

    $camera_focused_player_id.set(player_id);
}

export function camera_focus_self()
{
    $camera_focused_player_id.set(null);
}

subscribeKeys($player_self, ["spacial"], () =>
{
    camera_focus_self();
});
