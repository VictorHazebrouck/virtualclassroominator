import { v4 as uuidv4 } from "uuid";
import type { SocketDataPersisted } from "./persist_config";
import { persist_config } from "./persist_config";
import { persistentAtom } from "@nanostores/persistent";
import { listenKeys } from "nanostores";
import { $player_self } from "./player_self";

/**
 * We store in local storage part of our own player state, which enables us to
 * have persistent and eventially consistent state across all players without having
 * to rely on any external db.
 */
export const $player_self_persisted = persistentAtom<SocketDataPersisted>(
    "player_self",
    {
        _id: uuidv4(),
        info: {
            status: "on",
            name: "This is myself",
            skin: "alex",
        },
    },
    persist_config,
);

export function sync_persisted_self_data(player_store: typeof $player_self)
{
    /**
     * And then keep the 2 in sync so that on next connection all works as expected
     */
    listenKeys(player_store, ["info"], (new_info_state) =>
    {
        $player_self_persisted.set({
            _id: new_info_state._id,
            info: new_info_state.info,
        });
    });
}
