import { persistentAtom } from "@nanostores/persistent";

export type Tab = "chat" | "participants";
export const $current_tab = persistentAtom<Tab | undefined>("nav-state", undefined!);
