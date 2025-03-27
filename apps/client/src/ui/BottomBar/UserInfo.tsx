import { useStore } from "@nanostores/react";
import type { AvailableSkins, PlayerStatus } from "@repo/shared-types/socket";
import { useState } from "react";
import {
    $player_self,
    player_self_change_name,
    player_self_change_skin,
    player_self_change_status,
} from "~/store/player_self";
import Modal from "../-components/Modal";

export default function UserInfo()
{
    const [is_visible, set_is_visible] = useState(false);
    const data = useStore($player_self);

    return (
        <div className="flex bg-yellow-500 relative">
            <p onClick={() => set_is_visible(true)}>{data.info.name}</p>
            <ChangeUserInfoModal visible={is_visible} onClose={() => set_is_visible(false)} />
        </div>
    );
}

function ChangeUserInfoModal({ visible, onClose }: { visible: boolean; onClose: () => void })
{
    const AVAILABLE_SKINS: AvailableSkins[] = ["alex", "anna", "ardley", "colt", "ester", "tom"];
    const AVAILABLE_STATUSES: PlayerStatus[] = ["away", "on", "off"];
    const [username, set_username] = useState("");

    function handle_change_name()
    {
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
            className="bottom-12 flex flex-col gap-2"
        >
            <div className="flex flex-col gap-2">
                {AVAILABLE_SKINS.map((e) => (
                    <button
                        key={e}
                        className="px-6 py-2 cursor-pointer"
                        onClick={() => handle_change_skin(e)}
                    >
                        {e}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                {AVAILABLE_STATUSES.map((e) => (
                    <button
                        key={e}
                        className="px-6 py-2 cursor-pointer text-white"
                        onClick={() => handle_change_status(e)}
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
        </Modal>
    );
}
