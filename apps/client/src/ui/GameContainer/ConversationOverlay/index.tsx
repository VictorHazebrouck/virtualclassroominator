import { useStore } from "@nanostores/react";
import type { SocketData } from "@repo/shared-types/socket";
import { BiCameraOff, BiMicrophoneOff } from "react-icons/bi";
import { $nearby_players } from "~/store/nearby_players";

export default function ConversationOverlay()
{
    const nearby_players = useStore($nearby_players);

    return (
        <div className="absolute h-fit max-h-full w-fit overflow-y-scroll px-2 py-2">
            <div className="flex flex-col gap-2">
                {nearby_players.map((e) => (
                    <PlayerCam key={e._id} playerData={e} />
                ))}
            </div>
        </div>
    );
}

function PlayerCam({ playerData }: { playerData: SocketData })
{
    const { name } = playerData.info;
    const { is_webcam_active, is_mike_active } = playerData.chat;

    return (
        <div className="relative h-36 w-62 rounded-lg bg-gray-800">
            <div className="absolute top-1 left-1 flex items-center justify-center gap-2 rounded-md bg-black/80 px-3">
                {!is_mike_active && <BiMicrophoneOff size={16} className="text-red-600" />}
                <h6 className="-mt-[3px] text-white">{name}</h6>
            </div>
            <div className="absolute top-1 right-1 flex items-center justify-center"></div>
            {!is_webcam_active && (
                <div className="flex h-full items-center justify-center">
                    <BiCameraOff size={32} className="text-red-600" />
                </div>
            )}
            {is_webcam_active && <div>webcam active</div>}
        </div>
    );
}
