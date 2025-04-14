import { persistentAtom } from "@nanostores/persistent";
import type { PlayerDataPersisted } from "./persist_config";
import { persist_config_json } from "./persist_config";
import { $players_other } from "./players_other";

/**
 * We store in local storage the "info"(_id,name,skin) of every other players ever encoutered.
 * We do this to populate data from disconnected players in the chat/participants area.
 */
export const $players_other_persisted = persistentAtom<Record<string, PlayerDataPersisted>>(
    "players_other",
    {},
    persist_config_json,
);

/**
 * Goal here is to on first launch of the app, "reset" the status of other players,
 * and whenever they do connect, then we will replace it with the actual status.
 */
(() =>
{
    const players_persisted = $players_other_persisted.get();
    const players_disconnected: Record<string, PlayerDataPersisted> = {};

    for (const id in players_persisted)
    {
        const player = players_persisted[id]!;
        players_disconnected[id] = { ...player, info: { ...player.info, status: "disconnected" } };
    }

    $players_other_persisted.set(players_disconnected);
})();

/**
 * And then keep the 2 in sync so that on next connection all works as expected
 */
$players_other.listen((new_data, prev_data, diff) =>
{
    const [player_id, key] = diff?.split(".") || [];
    if (!player_id) return;

    const is_new_player = player_id && !key;
    const is_new_info = player_id && key == "info";
    const has_player_left = !new_data[player_id];

    if (has_player_left)
    {
        return $players_other_persisted.set({
            ...$players_other_persisted.get(),
            [player_id]: {
                _id: prev_data[player_id]!._id,
                info: { ...prev_data[player_id]!.info, status: "disconnected" },
            },
        });
    }

    if (is_new_player || is_new_info)
    {
        return $players_other_persisted.set({
            ...$players_other_persisted.get(),
            [player_id]: { _id: new_data[player_id]!._id, info: new_data[player_id]!.info },
        });
    }
});
