import { useRef } from "react";
import Game from "./Game";
import PlayerCard from "./PlayerCard";

export default function GameContainer()
{
    const container_ref = useRef<HTMLDivElement>(null);

    return (
        <div className="h-full w-full relative" ref={container_ref}>
            <Game />
            <PlayerCard container_ref={container_ref} />
        </div>
    );
}
