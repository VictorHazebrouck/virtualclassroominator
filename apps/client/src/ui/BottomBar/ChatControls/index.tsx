import { useStore } from "@nanostores/react";
import type { IconType } from "react-icons";
import { BiCamera, BiCameraOff, BiCast, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { $player_self } from "~/store/player_self";
import {
    use_set_personal_microphone,
    use_set_personal_screenshare,
    use_set_personal_webcam,
} from "~/stream/hooks";

export default function ChatControls()
{
    const { stream } = useStore($player_self, { keys: ["stream"] });
    const { is_mike_active, is_webcam_active, is_screensharing } = stream;

    const activate_screenshare = use_set_personal_screenshare();
    const activate_webcam = use_set_personal_webcam();
    const activate_microphone = use_set_personal_microphone();

    function handle_screenshare_click()
    {
        activate_screenshare(!is_screensharing);
    }

    function handle_webcam_click()
    {
        activate_webcam(!is_webcam_active);
    }

    function handle_microphone_click()
    {
        activate_microphone(!is_mike_active);
    }

    return (
        <div className="flex h-fit gap-8 rounded-full bg-gray-800 px-8 py-1 text-white">
            <ControlButton
                isActive={is_mike_active}
                onClick={handle_microphone_click}
                ActiveIcon={BiMicrophone}
                InactiveIcon={BiMicrophoneOff}
            />
            <ControlButton
                isActive={is_webcam_active}
                onClick={handle_webcam_click}
                ActiveIcon={BiCamera}
                InactiveIcon={BiCameraOff}
            />
            <ControlButton
                isActive={is_screensharing}
                onClick={handle_screenshare_click}
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
