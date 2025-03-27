import { useState } from "react";
import type { IconType } from "react-icons";
import { BiCamera, BiCameraOff, BiCast, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

export default function ChatControls()
{
    const [mikeActive, setMikeActive] = useState(false);
    const [webcamActive, setWebcamActive] = useState(false);
    const [screenShareActive, setScreenShareActive] = useState(false);

    return (
        <div className="flex h-fit gap-8 rounded-full bg-gray-800 px-8 py-1 text-white">
            <ControlButton
                isActive={mikeActive}
                onClick={() => setMikeActive((p) => !p)}
                ActiveIcon={BiMicrophone}
                InactiveIcon={BiMicrophoneOff}
            />
            <ControlButton
                isActive={webcamActive}
                onClick={() => setWebcamActive((p) => !p)}
                ActiveIcon={BiCamera}
                InactiveIcon={BiCameraOff}
            />
            <ControlButton
                isActive={screenShareActive}
                onClick={() => setScreenShareActive((p) => !p)}
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
