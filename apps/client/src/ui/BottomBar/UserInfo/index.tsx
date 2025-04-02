import { useStore } from "@nanostores/react";
import { useState } from "react";
import { BiCameraOff } from "react-icons/bi";
import { $player_self } from "~/store/player_self";
import { use_get_personal_video } from "~/stream/hooks";
import Video from "~/ui/-components/Video";
import ChangeUserInfoModal from "./ChangeUserInfoModal";
import Modal from "~/ui/-components/Modal";
import { tm } from "~/utils/tm";
import { COLOR_MAP } from "~/constants";

export default function UserInfo()
{
    const [is_userinfo_modal_visible, set_is_userinfo_modal_visible] = useState(false);
    const [is_video_enlarged_visible, set_is_video_enlarged_visible] = useState(false);

    const player_self_data = useStore($player_self, { keys: ["info", "chat"] });
    const webcam_track = use_get_personal_video();

    return (
        <div className="relative flex h-9 rounded-sm bg-gray-800">
            <div
                className={tm(
                    "h-9 w-20 border-r-2 border-r-gray-900 items-center justify-center flex overflow-hidden rounded-l-sm",
                    webcam_track && "cursor-pointer",
                )}
                onMouseEnter={() => webcam_track && set_is_video_enlarged_visible(true)}
                onMouseLeave={() => set_is_video_enlarged_visible(false)}
            >
                {!webcam_track && <BiCameraOff size={20} className="text-red-600" />}
                {webcam_track && !is_video_enlarged_visible && (
                    <Video className="h-full w-full" videotrack={webcam_track} />
                )}
            </div>
            <div
                className="pl-4 pr-1 flex cursor-pointer py-1 gap-1"
                onClick={() => set_is_userinfo_modal_visible(true)}
            >
                <p className="text-white text-sm">{player_self_data.info.name}</p>
                <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: COLOR_MAP[player_self_data.info.status] }}
                ></div>
            </div>
            <ChangeUserInfoModal
                visible={is_userinfo_modal_visible}
                onClose={() => set_is_userinfo_modal_visible(false)}
            />
            <PersonalWebcamModal visible={is_video_enlarged_visible} videotrack={webcam_track} />
        </div>
    );
}

function PersonalWebcamModal({
    visible,
    videotrack,
}: {
    visible: boolean;
    videotrack?: MediaStreamTrack | null;
})
{
    return (
        <Modal visible={visible} className="bottom-12 p-0">
            <Video videotrack={videotrack} />
        </Modal>
    );
}
