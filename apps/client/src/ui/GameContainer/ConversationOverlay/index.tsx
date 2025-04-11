import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import { Video, VideoLayout } from "~/ui/-components/Video";
import { tm } from "~/utils/tm";
import { use_get_user_screenshare_by_id, use_get_user_video_by_id } from "~/stream/hooks";
import { BiX } from "react-icons/bi";

export default function ConversationOverlay()
{
    const [selected_video, set_selected_video] = useState<{
        user_id: string;
        type: "screenshare" | "video";
    } | null>(null);
    const video_track = use_get_user_video_by_id(selected_video?.user_id || "");
    const screenshare_track = use_get_user_screenshare_by_id(selected_video?.user_id || "");

    function handle_select_video(user_id: string, type: "screenshare" | "video")
    {
        set_selected_video({ user_id: user_id, type: type });
    }

    function handle_close_video()
    {
        set_selected_video(null);
    }

    return (
        <div
            className={tm(
                "absolute flex h-fit max-h-full w-fit max-w-full items-start",
                selected_video && "h-full w-full",
            )}
        >
            <ParticipantsList on_select_video={handle_select_video} />
            {selected_video && (
                <div className="relative flex h-full w-full items-center justify-center p-2 pl-0">
                    <VideoLayout className="aspect-auto h-full w-full cursor-default">
                        <button
                            className="absolute top-2 right-2 z-50 cursor-pointer"
                            onClick={() => handle_close_video()}
                        >
                            <BiX size={32} className="text-white" />
                        </button>
                        <Video
                            className="object-contain"
                            videotrack={
                                selected_video.type == "video" ? video_track : screenshare_track
                            }
                        />
                    </VideoLayout>
                </div>
            )}
        </div>
    );
}
