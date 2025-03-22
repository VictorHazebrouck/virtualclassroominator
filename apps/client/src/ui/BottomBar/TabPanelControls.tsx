import { useStore } from "@nanostores/react";
import { BiChat, BiUser } from "react-icons/bi";
import { $current_tab, type Tab } from "~/store/nav";
import { tm } from "~/utils/tm";

const tabs = [
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

    function handle_select_tab(name: Tab)
    {
        if (current_tab === name)
        {
            $current_tab.set(null);
        }
        else
        {
            $current_tab.set(name);
        }
    }

    return (
        <div className="flex gap-6 items-center">
            {tabs.map(({ name, Icon }) => (
                <button
                    key={name}
                    className={tm(
                        "text-zinc-400 cursor-pointer h-fit w-fit",
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
