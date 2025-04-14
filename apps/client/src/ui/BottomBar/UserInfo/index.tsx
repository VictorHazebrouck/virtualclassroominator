import { useStore } from "@nanostores/react";
import { useState } from "react";
import { BiCameraOff } from "react-icons/bi";
import { $player_self } from "~/store/player_self";
import { use_get_personal_video } from "~/stream/hooks";
import { Video, VideoLayout } from "~/ui/-components/Video";
import ChangeUserInfoModal from "./ChangeUserInfoModal";
import Modal from "~/ui/-components/Modal";
import { tm } from "~/utils/tm";
import TextWithStatusTag from "~/ui/-components/TextWithStatus";

export default function UserInfo()
{
    const [is_userinfo_modal_visible, set_is_userinfo_modal_visible] = useState(false);
    const [is_video_enlarged_visible, set_is_video_enlarged_visible] = useState(false);

    const player_self_data = useStore($player_self, { keys: ["info", "stream"] });
    const webcam_track = use_get_personal_video();

    return (
        <div className="relative flex h-9 rounded-sm bg-gray-800">
            <div
                className={tm(
                    "flex h-9 w-20 items-center justify-center overflow-hidden rounded-l-sm border-r-2 border-r-gray-900",
                    webcam_track && "cursor-pointer",
                )}
                onMouseEnter={() => webcam_track && set_is_video_enlarged_visible(true)}
                onMouseLeave={() => set_is_video_enlarged_visible(false)}
            >
                {!webcam_track && <BiCameraOff size={20} className="text-red-600" />}
                {webcam_track && !is_video_enlarged_visible && (
                    <Video className="h-full w-full rounded-none" videotrack={webcam_track} />
                )}
            </div>
            <div
                className="flex cursor-pointer px-4"
                onClick={() => set_is_userinfo_modal_visible(true)}
            >
                <TextWithStatusTag
                    text={player_self_data.info.name}
                    status={player_self_data.info.status}
                />
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
            <VideoLayout>
                <Video videotrack={videotrack} />
            </VideoLayout>
        </Modal>
    );
}
