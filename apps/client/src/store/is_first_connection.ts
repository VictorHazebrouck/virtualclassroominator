import { persistentAtom } from "@nanostores/persistent";

export const $is_first_connection = persistentAtom<"true" | "false">("is_first_connection", "true");

export function set_is_first_connection_false()
{
    $is_first_connection.set("false");
}
