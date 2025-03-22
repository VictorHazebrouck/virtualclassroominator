import BottomBar from "./BottomBar";
import GameContainer from "./GameContainer";
import SideBar from "./SideBar";

export default function Main()
{
    return (
        <div className="h-screen w-screen flex  flex-col">
            <div className="flex w-full h-full">
                <GameContainer />
                <SideBar />
            </div>
            <BottomBar />
        </div>
    );
}
