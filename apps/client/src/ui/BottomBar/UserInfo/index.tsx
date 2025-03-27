import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $player_self } from "~/store/player_self";
import ChangeUserInfoModal from "./ChangeUserInfoModal";
import Video from "~/ui/-components/Video";

export default function UserInfo()
{
    const [is_visible, set_is_visible] = useState(false);
    const player_self_data = useStore($player_self);

    return (
        <div className="relative flex h-3/4 overflow-hidden rounded-sm bg-yellow-500">
            <Video />
            <p onClick={() => set_is_visible(true)}>{player_self_data.info.name}</p>
            <ChangeUserInfoModal visible={is_visible} onClose={() => set_is_visible(false)} />
        </div>
    );
}
