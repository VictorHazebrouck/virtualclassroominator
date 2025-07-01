import { useRef } from "react";
import Game from "./Game";
import PlayerCard from "./PlayerCard";
import ConversationOverlay from "./ConversationOverlay";
import MobileControls from "./MobileControls";

export default function GameContainer()
{
    const container_ref = useRef<HTMLDivElement>(null);

    return (
        <div className="relative h-full w-full" ref={container_ref}>
            <Game />
            <PlayerCard container_ref={container_ref} />
            <MobileControls />
            <ConversationOverlay />
        </div>
    );
}
