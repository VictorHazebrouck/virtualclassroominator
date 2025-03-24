import { persistentAtom } from "@nanostores/persistent";
import type { SocketData } from "@repo/shared-types/socket";
import { deepMap } from "nanostores";
import type { SocketDataPersisted } from "./persist_config";
import { persist_config } from "./persist_config";

/**
 * We store in local storage the "info"(_id,name,skin) of every other players ever encoutered.
 * We do this to populate data from disconnected players in the chat/participants area.
 */
export const $players_other_persisted = persistentAtom<Record<string, SocketDataPersisted>>(
    "players_other",
    {},
    persist_config,
);

/**
 * Goal here is to on first launch of the app, "reset" the status of other players,
 * and whenever they do connect, then we will replace it with the actual status.
 */
function set_players_other_persisted_to_disconnected()
{
    const players_persisted = $players_other_persisted.get();
    const players_disconnected: Record<string, SocketDataPersisted> = {};

    for (const id in players_persisted)
    {
        const player = players_persisted[id]!;
        players_disconnected[id] = { ...player, info: { ...player.info, status: "disconnected" } };
    }

    $players_other_persisted.set(players_disconnected);
}
set_players_other_persisted_to_disconnected();

/** Here we store currently connected players data */
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

    if (has_player_left)
    {
        $players_other_persisted.set({
            ...$players_other_persisted.get(),
            [player_id]: {
                _id: e[player_id]!._id,
                info: { ...e[player_id]!.info, status: "disconnected" },
            },
        });
    }

    if (is_new_player || is_new_info)
    {
        $players_other_persisted.set({
            ...$players_other_persisted.get(),
            [player_id]: { _id: e[player_id]!._id, info: e[player_id]!.info },
        });
    }
});

export function create_player_other(player_data: SocketData)
{
    $players_other.setKey(player_data._id, player_data);
}

export function remove_player_other(player_id: string)
{
    $players_other.setKey(player_id, undefined!);
}

export function set_player_other_info(player_id: string, info: SocketData["info"])
{
    $players_other.setKey(`${player_id}.info`, info);
}

export function set_player_other_spacial(player_id: string, spacial: SocketData["spacial"])
{
    $players_other.setKey(`${player_id}.spacial`, spacial);
}
