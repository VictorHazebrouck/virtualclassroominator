import { persistentAtom } from "@nanostores/persistent";
import type { Direction, PlayerStatus, Postion, SocketData } from "@repo/shared-types/socket";
import { listenKeys, map } from "nanostores";
import { v4 as uuidv4 } from "uuid";
import type { SocketDataPersisted } from "./persist_config";
import { persist_config } from "./persist_config";

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
            skin: "default",
        },
    },
    persist_config,
);

/** We init data form our localstorage */
export const $player_self = map<SocketData>({
    _id: $player_self_persisted.get()._id,
    info: $player_self_persisted.get().info,
    chat: {
        is_webcam_active: false,
        is_mike_active: false,
        is_screensharing: false,
        is_talking: false,
    },
    spacial: {
        direction: "down",
        postition: {
            x: 0,
            y: 0,
        },
        is_moving: false,
    },
});

/**
 * And then keep the 2 in sync so that on next connection all works as expected
 */
listenKeys($player_self, ["info"], (new_info_state) =>
{
    $player_self_persisted.set({
        _id: new_info_state._id,
        info: new_info_state.info,
    });
});

export function player_self_move(new_dir: Direction, position: Postion)
{
    $player_self.setKey("spacial", {
        direction: new_dir,
        postition: position,
        is_moving: true,
    });
}

export function player_self_stop(position: Postion)
{
    $player_self.setKey("spacial", {
        direction: $player_self.get().spacial.direction,
        postition: position,
        is_moving: false,
    });
}

export function player_self_change_name(new_name: string)
{
    const curr_info = $player_self.get().info;
    $player_self.setKey("info", { ...curr_info, name: new_name });
}

export function player_self_change_skin(new_skin: string)
{
    const curr_info = $player_self.get().info;
    $player_self.setKey("info", { ...curr_info, name: new_skin });
}

export function player_self_change_status(new_status: PlayerStatus)
{
    const curr_info = $player_self.get().info;
    $player_self.setKey("info", { ...curr_info, name: new_status });
}
