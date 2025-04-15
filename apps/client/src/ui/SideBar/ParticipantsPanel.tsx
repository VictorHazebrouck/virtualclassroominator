import { useStore } from "@nanostores/react";
import { useState, type MouseEvent } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { camera_focus_player_by_id } from "~/store/nav";
import type { PlayerDataPersisted } from "~/store/persist_config";
import { show_player_card } from "~/store/player_card";
import { $players_other_persisted } from "~/store/players_other_persisted";
import { tm } from "~/utils/tm";
import ScrollArea from "../-components/ScrollArea";
import TextInput from "../-components/TextInput";
import { PanelTitle } from "./-components";
import PlayerCard from "../-components/PlayerCard";

export default function ParticipantsPanel()
{
    const user_data_persisted = useStore($players_other_persisted);
    const [search_value, set_search_value] = useState("");

    const online_participants = Object.values(user_data_persisted).filter(
        (e) =>
            e.info.status !== "disconnected" &&
            e.info.name.toLowerCase().includes(search_value.toLowerCase()),
    );

    const offline_participants = Object.values(user_data_persisted).filter(
        (e) =>
            e.info.status === "disconnected" &&
            e.info.name.toLowerCase().includes(search_value.toLowerCase()),
    );

    return (
        <div className="flex h-full flex-col gap-2">
            <PanelTitle title="Participants" />

            <TextInput
                value={search_value}
                on_change_text={set_search_value}
                placeholder="search participant..."
            />

            <ScrollArea>
                <div className="flex flex-col gap-3 py-3">
                    <ParticipantSection
                        title="Online"
                        participants_list={online_participants}
                        default_is_open={true}
                    />
                    <ParticipantSection
                        title="Offline"
                        participants_list={offline_participants}
                        default_is_open={false}
                    />
                </div>
            </ScrollArea>
        </div>
    );
}

interface ParticipantSectionProps
{
    title: "Online" | "Offline";
    default_is_open: boolean;
    participants_list: PlayerDataPersisted[];
}

function ParticipantSection({
    participants_list,
    title,
    default_is_open,
}: ParticipantSectionProps)
{
    const [is_visible, set_is_visible] = useState(default_is_open);

    function handle_click_card(e: MouseEvent, player_id: string)
    {
        const rect = e.currentTarget.getBoundingClientRect();
        show_player_card(player_id, {
            x: rect.left,
            y: rect.top,
        });
    }

    function handle_click_avatar(player_id: string)
    {
        camera_focus_player_by_id(player_id);
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h3 className="text-slate-200">
                    {title} ({participants_list.length})
                </h3>
                <button
                    className="cursor-pointer text-slate-200"
                    onClick={() => set_is_visible(!is_visible)}
                >
                    {is_visible ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
                </button>
            </div>

            <div
                className={tm(
                    "flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-initial",
                    is_visible ? "max-h-[100vh]" : "max-h-0",
                )}
            >
                {participants_list.map((p) => (
                    <PlayerCard
                        key={p._id}
                        player_info={p}
                        on_click_card={(e) => handle_click_card(e, p._id)}
                        on_click_avatar={() => handle_click_avatar(p._id)}
                        disabled={title == "Offline"}
                        classNameAvatar="h-11 hover:bg-stone-700"
                    />
                ))}
            </div>
        </div>
    );
}
