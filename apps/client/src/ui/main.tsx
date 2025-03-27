import BottomBar from "./BottomBar";
import GameContainer from "./GameContainer";
import SideBar from "./SideBar";

export default function Main()
{
    return (
        <div className="flex h-screen w-screen flex-col">
            <div className="flex h-full w-full">
                <GameContainer />
                <SideBar />
            </div>
            <BottomBar />
        </div>
    );
}
