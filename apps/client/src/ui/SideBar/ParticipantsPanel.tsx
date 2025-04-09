import { useStore } from "@nanostores/react";
import type { SocketData } from "@repo/shared-types/socket";
import { useRef } from "react";
import { show_player_card } from "~/store/player_card";
import { $players_other_persisted } from "~/store/players_other_persisted";
import ScrollArea from "../-components/ScrollArea";

export default function ParticipantsPanel()
{
    const user_data_persisted = useStore($players_other_persisted);

    const online_participants = Object.values(user_data_persisted).filter(
        (e) => e.info.status !== "disconnected",
    );

    const offline_participants = Object.values(user_data_persisted).filter(
        (e) => e.info.status === "disconnected",
    );

    return (
        <div className="flex h-full flex-col">
            <h2 className="h-10 text-slate-200">Participants</h2>

            <ScrollArea>
                <div className="flex flex-col gap-2 px-4 py-2">
                    <h3 className="text-slate-200">Online ({online_participants.length})</h3>
                    {online_participants.map(({ _id, info }) => (
                        <ParticipantCard
                            key={_id}
                            username={info.name}
                            skin={info.skin}
                            status={info.status}
                            _id={_id}
                        />
                    ))}
                    <h3 className="text-slate-200">Offline ({offline_participants.length})</h3>
                    {offline_participants.map(({ _id, info }) => (
                        <ParticipantCard
                            key={_id}
                            username={info.name}
                            skin={info.skin}
                            status={info.status}
                            _id={_id}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

type ParticipantCardProps = {
    _id: string;
    username: string;
    skin: string;
    status: SocketData["info"]["status"];
};

function ParticipantCard({ _id, username, skin, status }: ParticipantCardProps)
{
    const ref = useRef<null | HTMLButtonElement>(null);

    function on_click()
    {
        if (!ref) return;

        const rect = ref!.current!.getBoundingClientRect();

        show_player_card(_id, {
            x: rect.left,
            y: rect.top,
        });
    }

    return (
        <button
            className="flex w-full cursor-pointer flex-col rounded-lg bg-gray-800 px-4 py-2"
            onClick={() => on_click()}
            ref={ref}
        >
            <h5 className="text-stone-100">{username}</h5>
            <p className="text-stone-400">{status}</p>
            <p className="text-stone-400">{skin}</p>
        </button>
    );
}
