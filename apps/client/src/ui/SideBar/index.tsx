import { useStore } from "@nanostores/react";
import { $current_tab } from "~/store/nav";
import { tm } from "~/utils/tm";
import ChatPanel from "./ChatPanel";
import ParticipantsPanel from "./ParticipantsPanel";

export default function SideBar()
{
    const tab_selected = useStore($current_tab);

    return (
        <div className={tm("w-96 h-full", tab_selected == "" && "w-0 p-0")}>
            {tab_selected == "chat" && <ChatPanel />}
            {tab_selected == "participants" && <ParticipantsPanel />}
        </div>
    );
}
