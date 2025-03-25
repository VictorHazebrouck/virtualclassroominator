import { useStore } from "@nanostores/react";
import type { AvailableSkins } from "@repo/shared-types/socket";
import { useState } from "react";
import {
    $player_self,
    player_self_change_name,
    player_self_change_skin,
} from "~/store/player_self";

export default function UserInfo()
{
    const data = useStore($player_self);

    return (
        <div className="flex bg-yellow-500 relative">
            <p>{data.info.name}</p>
            <ChangeUserInfo />
        </div>
    );
}

function ChangeUserInfo()
{
    const available_skins: AvailableSkins[] = ["alex", "anna", "ardley", "colt", "ester", "tom"];
    const [username, set_username] = useState("");

    function handle_change_name()
    {
        player_self_change_name(username);
    }

    function handle_change_skin(skin: AvailableSkins)
    {
        player_self_change_skin(skin);
    }

    return (
        <div className="absolute bg-gray-800 bottom-12 text-white rounded-md px-6 py-2 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                {available_skins.map((e) => (
                    <button
                        className="px-6 py-2 cursor-pointer"
                        key={e}
                        onClick={() => handle_change_skin(e)}
                    >
                        {e}
                    </button>
                ))}
            </div>
            <input
                className="px-3 py-1 rounded-md"
                value={username}
                onChange={(e) => set_username(e.target.value)}
                placeholder="new username..."
            />
            <button onClick={() => handle_change_name()}>change</button>
        </div>
    );
}
