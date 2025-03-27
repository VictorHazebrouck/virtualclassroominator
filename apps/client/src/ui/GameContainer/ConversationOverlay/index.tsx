import { useStore } from "@nanostores/react";
import type { SocketData } from "@repo/shared-types/socket";
import { BiCameraOff, BiMicrophoneOff } from "react-icons/bi";
import { $nearby_players } from "~/store/nearby_players";

export default function ConversationOverlay()
{
    const nearby_players = useStore($nearby_players);

    return (
        <div className="absolute px-2 py-2 w-fit h-fit overflow-y-scroll max-h-full">
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
        <div className="w-62 h-36 bg-gray-800 relative rounded-lg">
            <div className="absolute top-1 left-1 flex gap-2 justify-center items-center px-3 rounded-md bg-black/80">
                {!is_mike_active && <BiMicrophoneOff size={16} className="text-red-600" />}
                <h6 className="text-white -mt-[3px]">{name}</h6>
            </div>
            <div className="absolute top-1 right-1 flex justify-center items-center"></div>
            {!is_webcam_active && (
                <div className="flex items-center justify-center h-full">
                    <BiCameraOff size={32} className="text-red-600" />
                </div>
            )}
            {is_webcam_active && <div>webcam active</div>}
        </div>
    );
}
