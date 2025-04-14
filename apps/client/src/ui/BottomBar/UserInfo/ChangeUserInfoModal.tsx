import type { TPlayerInfoSkin, TPlayerInfoStatus } from "@repo/shared-types/common";
import React, { useState } from "react";
import {
    player_self_change_name,
    player_self_change_skin,
    player_self_change_status,
} from "~/store/player_self";
import Modal from "~/ui/-components/Modal";
import TextInput from "~/ui/-components/TextInput";
import TextWithStatusTag from "~/ui/-components/TextWithStatus";

const AVAILABLE_SKINS: TPlayerInfoSkin[] = ["alex", "anna", "ardley", "colt", "ester", "tom"];
const AVAILABLE_STATUSES: TPlayerInfoStatus[] = ["away", "on", "off"];

interface ChangeUserInfoModalProps
{
    visible: boolean;
    onClose: () => void;
}

export default function ChangeUserInfoModal({ visible, onClose }: ChangeUserInfoModalProps)
{
    const [username, set_username] = useState("");

    function handle_change_name()
    {
        if (username.length < 3) return alert("Username too short");
        if (username.length > 18) return alert("Username too long");
        player_self_change_name(username);
    }

    function handle_change_skin(skin: TPlayerInfoSkin)
    {
        player_self_change_skin(skin);
    }

    function handle_change_status(status: TPlayerInfoStatus)
    {
        player_self_change_status(status);
    }

    return (
        <Modal
            onClickOutside={() => onClose()}
            visible={visible}
            className="bottom-12 flex w-72 flex-col gap-6 px-8 py-8"
        >
            <ChangeInfoSection title="choose character">
                <div className="flex flex-wrap gap-x-2">
                    {AVAILABLE_SKINS.map((e) => (
                        <button
                            key={e}
                            className="cursor-pointer px-3 py-1 text-zinc-400 hover:text-zinc-100"
                            onClick={() => handle_change_skin(e)}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            </ChangeInfoSection>
            <ChangeInfoSection title="change status">
                <div className="flex gap-2">
                    {AVAILABLE_STATUSES.map((status) => (
                        <button
                            key={status}
                            className="flex cursor-pointer gap-1 px-3"
                            onClick={() => handle_change_status(status)}
                        >
                            <TextWithStatusTag
                                text_classname={"text-zinc-400 hover:text-zinc-100"}
                                text={status}
                                status={status}
                            />
                        </button>
                    ))}
                </div>
            </ChangeInfoSection>
            <ChangeInfoSection title="change username">
                <div className="flex w-fit">
                    <TextInput
                        className="w-full"
                        value={username}
                        on_change_text={(e) => set_username(e)}
                        placeholder="new username..."
                    />
                    <button
                        className="cursor-pointer px-3 py-1 text-zinc-100"
                        onClick={() => handle_change_name()}
                    >
                        change
                    </button>
                </div>
            </ChangeInfoSection>
        </Modal>
    );
}

interface ChangeInfoSectionProps
{
    title: string;
    children: React.ReactNode;
}

function ChangeInfoSection({ title, children }: ChangeInfoSectionProps)
{
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-zinc-200">{title}</h3>
            <div className="flex w-fit">{children}</div>
        </div>
    );
}
