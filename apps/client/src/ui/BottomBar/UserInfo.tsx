import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $player_self, player_self_change_name } from "~/store/player_self";

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
    const [value, setValue] = useState("");

    function handleClick()
    {
        player_self_change_name(value);
    }

    return (
        <div className="absolute bg-gray-800 -top-28 text-white rounded-md">
            <input
                className="px-3 py-1 rounded-md"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="new username..."
            />
            <button onClick={() => handleClick()}>change</button>
        </div>
    );
}
