import { useStore } from "@nanostores/react";
import type { SocketData } from "@repo/shared-types/socket";
import { BiCameraOff, BiMicrophoneOff } from "react-icons/bi";
import { $nearby_players } from "~/store/nearby_players";
import {
    use_get_personal_screenshare,
    use_get_user_audio_by_id,
    use_get_user_screenshare_by_id,
    use_get_user_video_by_id,
} from "~/stream/hooks";
import {
    Video,
    VideoLayout,
    VideoLayoutLabel,
    VideoScreenShare,
    Audio,
} from "~/ui/-components/Video";

export default function ConversationOverlay()
{
    const nearby_players = useStore($nearby_players);
    const personal_screenshare_track = use_get_personal_screenshare();

    return (
        <div className="absolute flex h-fit max-h-full w-fit flex-col gap-2 overflow-y-scroll p-2">
            {personal_screenshare_track && (
                <VideoScreenShare video_track={personal_screenshare_track} label="my screenshare" />
            )}

            {nearby_players.map((e) => (
                <PlayerCam key={e._id} playerData={e} />
            ))}
        </div>
    );
}

function PlayerCam({ playerData }: { playerData: SocketData })
{
    const { name } = playerData.info;
    const { is_webcam_active, is_mike_active, is_screensharing } = playerData.chat;
    const video_track = use_get_user_video_by_id(playerData._id);
    const audio_track = use_get_user_audio_by_id(playerData._id);
    const screenshare_track = use_get_user_screenshare_by_id(playerData._id);

    return (
        <>
            <Audio audiotrack={audio_track} />

            <VideoLayout>
                <VideoLayoutLabel>
                    {!is_mike_active && <BiMicrophoneOff size={16} className="text-red-600" />}
                    <h6 className="-mt-[3px] text-white">{name}</h6>
                </VideoLayoutLabel>

                {!is_webcam_active && (
                    <div className="flex h-full items-center justify-center">
                        <BiCameraOff size={32} className="text-red-600" />
                    </div>
                )}

                {is_webcam_active && (
                    <Video videotrack={video_track} />
                    // <div className="flex h-full w-full items-center justify-center">
                    //     webcam active
                    // </div>
                )}
            </VideoLayout>

            {is_screensharing && (
                <VideoScreenShare video_track={screenshare_track} label={`${name}'s screenshare`} />
            )}
        </>
    );
}
