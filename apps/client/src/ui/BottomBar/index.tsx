import ChatControls from "./ChatControls";
import TabPanelControls from "./TabPanelControls";
import UserInfo from "./UserInfo";

export default function BottomBar()
{
    return (
        <div className="flex justify-between px-12 h-12 w-full items-center">
            <UserInfo />
            <ChatControls />
            <TabPanelControls />
        </div>
    );
}
