import { useStore } from "@nanostores/react";
import type { IconType } from "react-icons";
import { BiCamera, BiCameraOff, BiCast, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import {
    $player_self,
    player_self_toggle_microphone,
    player_self_toggle_screenshare,
    player_self_toggle_webcam,
} from "~/store/player_self";

export default function ChatControls()
{
    const { chat } = useStore($player_self, { keys: ["chat"] });
    const { is_mike_active, is_webcam_active, is_screensharing } = chat;

    function handle_screenshare_click()
    {
        player_self_toggle_screenshare();
    }

    return (
        <div className="flex text-white gap-8 bg-gray-800 h-fit py-1 px-8 rounded-full">
            <ControlButton
                isActive={is_mike_active}
                onClick={() => player_self_toggle_microphone()}
                ActiveIcon={BiMicrophone}
                InactiveIcon={BiMicrophoneOff}
            />
            <ControlButton
                isActive={is_webcam_active}
                onClick={() => player_self_toggle_webcam()}
                ActiveIcon={BiCamera}
                InactiveIcon={BiCameraOff}
            />
            <ControlButton
                isActive={is_screensharing}
                onClick={() => handle_screenshare_click()}
                ActiveIcon={BiCast}
                InactiveIcon={BiCast}
            />
        </div>
    );
}

type ControlButtonProps = {
    ActiveIcon: IconType;
    InactiveIcon: IconType;
    isActive: boolean;
    onClick: () => void;
};

function ControlButton({ ActiveIcon, InactiveIcon, isActive, onClick }: ControlButtonProps)
{
    return (
        <button className="cursor-pointer" onClick={onClick}>
            {isActive ? (
                <ActiveIcon size={24} className="text-green-600" />
            ) : (
                <InactiveIcon size={24} className="text-red-600" />
            )}
        </button>
    );
}
