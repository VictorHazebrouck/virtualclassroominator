import { persistentAtom } from "@nanostores/persistent";
import type { SocketData } from "@repo/shared-types/socket";
import { deepMap } from "nanostores";
import { persist_config } from "./persist_config";
import type { SocketDataPersisted } from "./persist_config";

/**
 * We store in local storage part of our own player state, which enables us to
 * have persistent and eventially consistent state across all players without having
 * to rely on any external db.
 */
export const $players_other_persisted = persistentAtom<Record<string, SocketDataPersisted>>(
    "players_other",
    {},
    persist_config,
);

/** We init data form our localstorage */
export const $players_other = deepMap<Record<string, SocketData>>({});

/**
 * And then keep the 2 in sync so that on next connection all works as expected
 */
$players_other.listen((e, a, diff) =>
{
    const [player_id, key] = diff?.split(".") || [];
    if (!player_id) return;

    const is_new_player = player_id && !key;
    const is_new_info = player_id && key == "info";
    const has_player_left = !e[player_id];

    if (has_player_left) return;
    if (is_new_player || is_new_info)
    {
        $players_other_persisted.set({
            ...$players_other_persisted.get(),
            [player_id]: { _id: e[player_id]!._id, info: e[player_id]!.info },
        });
    }
});
