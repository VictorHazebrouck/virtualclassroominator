import type { SocketData } from "@repo/shared-types/socket";
import { deepMap } from "nanostores";

/** Here we store currently connected players data */
export const $players_other = deepMap<Record<string, SocketData>>({});

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

export function set_player_other_chat(player_id: string, chat: SocketData["chat"])
{
    $players_other.setKey(`${player_id}.chat`, chat);
}
