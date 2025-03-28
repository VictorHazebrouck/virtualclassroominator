import { persistentAtom } from "@nanostores/persistent";

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
