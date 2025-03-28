import { useStore } from "@nanostores/react";
import { BiChat, BiUser } from "react-icons/bi";
import { $current_tab, close_tab_panel, open_tab_panel, type Tab } from "~/store/nav";
import { tm } from "~/utils/tm";

const AVAILABLE_TABS = [
    {
        name: "chat",
        Icon: BiChat,
    },
    {
        name: "participants",
        Icon: BiUser,
    },
] as const;

export default function TabPanelControls()
{
    const current_tab = useStore($current_tab);

    function handle_select_tab(tab_name: Tab)
    {
        if (current_tab === tab_name) close_tab_panel();
        else open_tab_panel(tab_name);
    }

    return (
        <div className="flex items-center gap-6">
            {AVAILABLE_TABS.map(({ name, Icon }) => (
                <button
                    key={name}
                    className={tm(
                        "h-fit w-fit cursor-pointer text-zinc-400",
                        "hover:text-zinc-200",
                        current_tab == name && "text-zinc-50",
                    )}
                    onClick={() => handle_select_tab(name)}
                >
                    <Icon size={22} />
                </button>
            ))}
        </div>
    );
}
