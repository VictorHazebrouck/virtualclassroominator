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

export default function ParticipantsList({
    on_select_video,
}: {
    on_select_video: (user_id: string, type: "screenshare" | "video") => void;
})
{
    const nearby_players = useStore($nearby_players);
    const personal_screenshare_track = use_get_personal_screenshare();

    return (
        <div className="flex max-h-full w-66 min-w-66 flex-col gap-2 overflow-y-scroll p-2">
            {personal_screenshare_track && (
                <VideoScreenShare video_track={personal_screenshare_track} label="my screenshare" />
            )}

            {nearby_players.map((e) => (
                <PlayerCam key={e._id} playerData={e} on_select_video={on_select_video} />
            ))}
        </div>
    );
}

function PlayerCam({
    playerData,
    on_select_video,
}: {
    playerData: SocketData;
    on_select_video: (user_id: string, type: "screenshare" | "video") => void;
})
{
    const { name } = playerData.info;
    const { is_webcam_active, is_mike_active, is_screensharing } = playerData.chat;
    const video_track = use_get_user_video_by_id(playerData._id);
    const audio_track = use_get_user_audio_by_id(playerData._id);
    const screenshare_track = use_get_user_screenshare_by_id(playerData._id);

    function handle_video_click(type: "screenshare" | "video")
    {
        if (type == "screenshare" && is_screensharing)
        {
            on_select_video(playerData._id, "screenshare");
        }
        else if (type == "video" && is_webcam_active)
        {
            on_select_video(playerData._id, "video");
        }
    }

    return (
        <>
            {is_mike_active && <Audio audiotrack={audio_track} />}

            <VideoLayout on_click={() => handle_video_click("video")}>
                <VideoLayoutLabel>
                    {!is_mike_active && <BiMicrophoneOff size={16} className="text-red-600" />}
                    <h6 className="-mt-[3px] text-white">{name}</h6>
                </VideoLayoutLabel>

                {!is_webcam_active && (
                    <div className="flex h-full items-center justify-center">
                        <BiCameraOff size={32} className="text-red-600" />
                    </div>
                )}

                {is_webcam_active && <Video videotrack={video_track} />}
            </VideoLayout>

            {is_screensharing && (
                <VideoScreenShare
                    on_click={() => handle_video_click("screenshare")}
                    video_track={screenshare_track}
                    label={`${name}'s screenshare`}
                />
            )}
        </>
    );
}
