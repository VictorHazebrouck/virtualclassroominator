import { useState } from "react";
import TextInput from "../-components/TextInput";
import type { TPlayerInfoSkin } from "@repo/shared-types/common";
import Avatar from "../-components/Avatar";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { set_is_first_connection_false } from "~/store/is_first_connection";
import { player_self_change_name, player_self_change_skin } from "~/store/player_self";

const AVAILABLE_SKINS: TPlayerInfoSkin[] = ["alex", "anna", "ardley", "colt", "ester", "tom"];

export default function FirstLauch()
{
    const [username, set_username] = useState("");
    const [avatar_i, set_avatar_i] = useState(0);
    const skin = AVAILABLE_SKINS[avatar_i]!;

    function next_avatar_left()
    {
        set_avatar_i((i) => (i - 1 == -1 ? AVAILABLE_SKINS.length - 1 : i - 1));
    }

    function next_avatar_right()
    {
        set_avatar_i((i) => (AVAILABLE_SKINS[i + 1] ? i + 1 : 0));
    }

    function lauch_app()
    {
        if (username.length < 3) return alert("Username too short");
        if (username.length > 18) return alert("Username too long");

        player_self_change_name(username);
        player_self_change_skin(skin);
        set_is_first_connection_false();
    }

    return (
        <div className="px-1/3 flex h-full w-full flex-col items-center justify-center gap-4 text-zinc-200">
            <div className="flex h-20 items-center">
                <button onClick={next_avatar_left}>
                    <BiChevronLeft className="h-8 w-8" />
                </button>
                <Avatar className="aspect-square h-full" character={skin} />
                <button onClick={next_avatar_right}>
                    <BiChevronRight className="h-8 w-8" />
                </button>
            </div>
            <TextInput placeholder="Username..." value={username} on_change_text={set_username} />
            <button className="cursor-pointer px-3 py-1 text-zinc-100" onClick={lauch_app}>
                Launch
            </button>
        </div>
    );
}
