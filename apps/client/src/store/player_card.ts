import type { TPosition, TPlayerInfo } from "@repo/shared-types/common";
import { atom, subscribeKeys } from "nanostores";
import { $players_other_persisted } from "./players_other_persisted";
import { $player_self } from "./player_self";

export const $player_card = atom<{
    _id: string;
    info: TPlayerInfo;
    position: TPosition;
} | null>(null);

export function show_player_card(id: string, position: TPosition)
{
    $player_card.set({
        _id: id,
        info: $players_other_persisted.get()[id]!.info || "unknown_user",
        position: position,
    });
}

export function hide_player_card()
{
    $player_card.set(null);
}

subscribeKeys($player_self, ["spacial"], () =>
{
    hide_player_card();
});
