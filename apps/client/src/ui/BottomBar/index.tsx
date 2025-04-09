import ChatControls from "./ChatControls";
import TabPanelControls from "./TabPanelControls";
import UserInfo from "./UserInfo";

export default function BottomBar()
{
    return (
        <div className="flex h-12 w-full items-center justify-between px-12">
            <UserInfo />
            <ChatControls />
            <TabPanelControls />
        </div>
    );
}
