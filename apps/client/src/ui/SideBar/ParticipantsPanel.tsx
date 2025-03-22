import { useStore } from "@nanostores/react";
import { useRef } from "react";
import { show_player_card } from "~/store/player_card";
import { $players_other_persisted } from "~/store/players_other";

export default function ParticipantsPanel()
{
    const user_data_persisted = useStore($players_other_persisted);

    return (
        <div className="flex flex-col w-full gap-3">
            {Object.values(user_data_persisted).map(({ _id, info }) => (
                <ParticipantCard key={_id} username={info.name} skin={info.skin} _id={_id} />
            ))}
        </div>
    );
}

type ParticipantCardProps = {
    _id: string;
    username: string;
    skin: string;
};

function ParticipantCard({ _id, username, skin }: ParticipantCardProps)
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
            className="flex flex-col w-full bg-gray-800 py-2 px-4 rounded-lg cursor-pointer relative"
            onClick={() => on_click()}
            ref={ref}
        >
            <h5 className="text-stone-100">{username}</h5>
            <p className="text-stone-400">online</p>
            <p className="text-stone-400">{skin}</p>
        </button>
    );
}
