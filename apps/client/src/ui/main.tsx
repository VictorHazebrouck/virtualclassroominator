import { useStore } from "@nanostores/react";
import BottomBar from "./BottomBar";
import GameContainer from "./GameContainer";
import SideBar from "./SideBar";
import { $is_first_connection } from "~/store/is_first_connection";
import FirstLauch from "./FirstLauch";

export default function Main()
{
    const is_first_connection = useStore($is_first_connection);

    return (
        <div className="flex h-screen w-screen flex-col">
            {is_first_connection == "true" && <FirstLauch />}
            {is_first_connection == "false" && (
                <>
                    <div className="flex h-full w-full">
                        <GameContainer />
                        <SideBar />
                    </div>
                    <BottomBar />
                </>
            )}
        </div>
    );
}
