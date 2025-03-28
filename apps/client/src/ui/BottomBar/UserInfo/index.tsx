import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $player_self } from "~/store/player_self";
import ChangeUserInfoModal from "./ChangeUserInfoModal";
import Video from "~/ui/-components/Video";
import { ConversationManager } from "~/stream/main";
import { use_get_personal_audio, use_get_personal_video } from "~/stream/hooks";
import { BiCameraOff } from "react-icons/bi";

export default function UserInfo()
{
    const [is_visible, set_is_visible] = useState(false);
    const player_self_data = useStore($player_self);
    const webcam_track = use_get_personal_video();

    return (
        <div className="relative flex h-3/4 overflow-hidden rounded-sm bg-gray-800">
            <div className="h-full w-28 border-r-2 border-r-gray-900 items-center justify-center flex object-cover object-center">
                {!webcam_track && <BiCameraOff size={20} className="text-red-600" />}
                {webcam_track && <Video videotrack={webcam_track} />}
            </div>
            <div className="px-4 ">
                <p className="text-white" onClick={() => set_is_visible(true)}>
                    {player_self_data.info.name}
                </p>
            </div>
            <ChangeUserInfoModal visible={is_visible} onClose={() => set_is_visible(false)} />
        </div>
    );
}
