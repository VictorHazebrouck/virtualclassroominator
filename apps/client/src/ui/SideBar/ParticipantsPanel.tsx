import { useStore } from "@nanostores/react";
import type { SocketData } from "@repo/shared-types/socket";
import { useRef, useState, type MouseEvent } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { camera_focus_player_by_id } from "~/store/nav";
import type { SocketDataPersisted } from "~/store/persist_config";
import { show_player_card } from "~/store/player_card";
import { $players_other_persisted } from "~/store/players_other_persisted";
import { tm } from "~/utils/tm";
import ScrollArea from "../-components/ScrollArea";
import TextInput from "../-components/TextInput";
import TextWithStatusTag from "../-components/TextWithStatus";
import { PanelTitle } from "./-components";

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
    participants_list: SocketDataPersisted[];
}

function ParticipantSection({
    participants_list,
    title,
    default_is_open,
}: ParticipantSectionProps)
{
    const [is_visible, set_is_visible] = useState(default_is_open);

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
                {participants_list.map(({ _id, info }) => (
                    <ParticipantCard
                        key={_id}
                        username={info.name}
                        skin={info.skin}
                        status={info.status}
                        _id={_id}
                    />
                ))}
            </div>
        </div>
    );
}

interface ParticipantCardProps
{
    _id: string;
    username: string;
    skin: string;
    status: SocketData["info"]["status"];
}

function ParticipantCard({ _id, username, skin, status }: ParticipantCardProps)
{
    const ref = useRef<null | HTMLButtonElement>(null);
    const is_active = status !== "disconnected";

    function on_click_card()
    {
        if (!ref.current || !is_active) return;

        const rect = ref.current.getBoundingClientRect();
        show_player_card(_id, {
            x: rect.left,
            y: rect.top,
        });
    }

    function on_click_avatar(e: MouseEvent)
    {
        camera_focus_player_by_id(_id);
        e.stopPropagation();
    }

    return (
        <button
            className={"flex w-full cursor-pointer overflow-hidden rounded-lg bg-gray-800"}
            onClick={on_click_card}
            ref={ref}
        >
            <div className={tm("flex w-full gap-4 px-4 py-2", !is_active && "grayscale-75")}>
                <div
                    className="h-10 w-10 overflow-hidden rounded-full bg-red-500 hover:bg-green-500"
                    onClick={on_click_avatar}
                >
                    {skin}
                </div>

                <TextWithStatusTag
                    text_classname="text-stone-200 text-md"
                    text={username}
                    status={status}
                />
            </div>
        </button>
    );
}
