import type {
    TPlayerData,
    TPlayerInfo,
    TPlayerSpacial,
    TPlayerStream,
} from "@repo/shared-types/common";
import { deepMap } from "nanostores";

/** Here we store currently connected players data */
export const $players_other = deepMap<Record<string, TPlayerData>>({});

export function create_player_other(player_data: TPlayerData)
{
    $players_other.setKey(player_data._id, player_data);
}

export function remove_player_other(player_id: string)
{
    $players_other.setKey(player_id, undefined!);
}

export function set_player_other_info(player_id: string, info: TPlayerInfo)
{
    $players_other.setKey(`${player_id}.info`, info);
}

export function set_player_other_spacial(player_id: string, spacial: TPlayerSpacial)
{
    $players_other.setKey(`${player_id}.spacial`, spacial);
}

export function set_player_other_chat(player_id: string, chat: TPlayerStream)
{
    $players_other.setKey(`${player_id}.stream`, chat);
}
