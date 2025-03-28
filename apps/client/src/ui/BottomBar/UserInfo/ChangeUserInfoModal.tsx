import type { AvailableSkins, PlayerStatus } from "@repo/shared-types/socket";
import { useState } from "react";
import { COLOR_MAP } from "~/constants";
import {
    player_self_change_name,
    player_self_change_skin,
    player_self_change_status,
} from "~/store/player_self";
import Modal from "~/ui/-components/Modal";

const AVAILABLE_SKINS: AvailableSkins[] = ["alex", "anna", "ardley", "colt", "ester", "tom"];
const AVAILABLE_STATUSES: PlayerStatus[] = ["away", "on", "off"];

export default function ChangeUserInfoModal({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
})
{
    const [username, set_username] = useState("");

    function handle_change_name()
    {
        if (username.length < 3) return alert("Username too short");
        if (username.length > 18) return alert("Username too long");
        player_self_change_name(username);
    }

    function handle_change_skin(skin: AvailableSkins)
    {
        player_self_change_skin(skin);
    }

    function handle_change_status(status: PlayerStatus)
    {
        player_self_change_status(status);
    }

    return (
        <Modal
            onClickOutside={() => onClose()}
            visible={visible}
            className="bottom-12 flex flex-col gap-2 py-4"
        >
            <div className="flex flex-col gap-2">
                {AVAILABLE_SKINS.map((e) => (
                    <button
                        key={e}
                        className="cursor-pointer px-6 py-2"
                        onClick={() => handle_change_skin(e)}
                    >
                        {e}
                    </button>
                ))}
            </div>
            <div className="flex gap-2">
                {AVAILABLE_STATUSES.map((e) => (
                    <button
                        key={e}
                        className="cursor-pointer px-6 py-2 text-white flex gap-1"
                        onClick={() => handle_change_status(e)}
                    >
                        {e}
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: COLOR_MAP[e] }}
                        ></div>
                    </button>
                ))}
            </div>
            <div className="flex">
                <input
                    className="rounded-md px-3 py-1 text-zinc-400"
                    value={username}
                    onChange={(e) => set_username(e.target.value)}
                    placeholder="new username..."
                />
                <button
                    className="text-zinc-100 cursor-pointer px-3 py-1"
                    onClick={() => handle_change_name()}
                >
                    change
                </button>
            </div>
        </Modal>
    );
}
