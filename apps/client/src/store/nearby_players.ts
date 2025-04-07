import { atom, computed } from "nanostores";
import { $players_other } from "./players_other";

export const $nearby_players_ids = atom<string[]>([]);

export const $nearby_players = computed([$nearby_players_ids, $players_other], (ids, players) =>
{
    return ids.map((id) => players[id]).filter((e) => e !== undefined);
});

export function set_nearby_players(player_ids: string[])
{
    const curr_ids = $nearby_players_ids.get();

    if (curr_ids.length !== player_ids.length)
    {
        return $nearby_players_ids.set(player_ids);
    }

    for (const new_player_id of player_ids)
    {
        if (!curr_ids.includes(new_player_id))
        {
            return $nearby_players_ids.set(player_ids);
        }
    }
}
