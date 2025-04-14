import type {
    TPlayerInfoSkin,
    TDirection,
    TPlayerInfoStatus,
    TPosition,
    TPlayerData,
} from "@repo/shared-types/common";
import { map } from "nanostores";
import { $player_self_persisted, sync_persisted_self_data } from "./player_self_persisted";

// We init data form our localstorage
export const $player_self = map<TPlayerData>({
    _id: $player_self_persisted.get()._id,
    info: $player_self_persisted.get().info,
    stream: {
        is_webcam_active: false,
        is_mike_active: false,
        is_screensharing: false,
        is_talking: false,
    },
    spacial: {
        direction: "down",
        postition: {
            x: 1,
            y: 1,
        },
        is_moving: false,
    },
});

// and keep them in sync for next time we connect
sync_persisted_self_data($player_self);

// Movement Stuff

export function player_self_move(new_dir: TDirection, position: TPosition)
{
    $player_self.setKey("spacial", {
        direction: new_dir,
        postition: position,
        is_moving: true,
    });
}

export function player_self_stop(position: TPosition)
{
    $player_self.setKey("spacial", {
        direction: $player_self.get().spacial.direction,
        postition: position,
        is_moving: false,
    });
}

// Info stuff

export function player_self_change_name(new_name: string)
{
    const curr_info = $player_self.get().info;
    $player_self.setKey("info", { ...curr_info, name: new_name });
}

export function player_self_change_skin(new_skin: TPlayerInfoSkin)
{
    const curr_info = $player_self.get().info;
    $player_self.setKey("info", { ...curr_info, skin: new_skin });
}

export function player_self_change_status(new_status: TPlayerInfoStatus)
{
    const curr_info = $player_self.get().info;
    $player_self.setKey("info", { ...curr_info, status: new_status });
}

// Chat stuff

export function player_self_toggle_microphone(on: boolean)
{
    const curr_chat = $player_self.get().stream;
    $player_self.setKey("stream", { ...curr_chat, is_mike_active: on });
}

export function player_self_toggle_webcam(on: boolean)
{
    const curr_chat = $player_self.get().stream;
    $player_self.setKey("stream", { ...curr_chat, is_webcam_active: on });
}

export function player_self_toggle_screenshare(on: boolean)
{
    const curr_chat = $player_self.get().stream;
    $player_self.setKey("stream", { ...curr_chat, is_screensharing: on });
}
