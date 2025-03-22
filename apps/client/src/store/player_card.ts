import type { Postion, SocketData } from "@repo/shared-types/socket";
import { atom } from "nanostores";
import { $players_other_persisted } from "./players_other";

export const $player_card = atom<{
    _id: string;
    info: SocketData["info"];
    position: Postion;
} | null>(null);

export function show_player_card(id: string, position: Postion)
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
