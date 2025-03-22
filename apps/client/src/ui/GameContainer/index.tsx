import Game from "./Game";
import PlayerCard from "./PlayerCard";

export default function GameContainer()
{
    return (
        <div className="h-full w-full relative">
            <Game />
            <PlayerCard />
        </div>
    );
}
