import type { MouseEvent } from "react";
import type { PlayerDataPersisted } from "~/store/persist_config";
import { tm } from "~/utils/tm";
import Avatar from "./Avatar";
import TextWithStatusTag from "./TextWithStatus";

export interface PlayerCardProps
{
    on_click_card?: (e: MouseEvent) => void;
    on_click_avatar?: (e: MouseEvent) => void;
    player_info: PlayerDataPersisted;
    disabled?: boolean;
}

export default function PlayerCard({
    on_click_card,
    on_click_avatar,
    disabled = false,
    player_info,
}: PlayerCardProps)
{
    const { name, skin, status } = player_info.info;

    function handle_click_card(e: MouseEvent)
    {
        if (disabled) return e.stopPropagation();
        on_click_card?.(e);
    }

    function handle_click_avatar(e: MouseEvent)
    {
        if (disabled) return e.stopPropagation();
        on_click_avatar?.(e);
        e.stopPropagation();
    }

    return (
        <button
            className={"flex w-full cursor-pointer overflow-hidden rounded-lg bg-gray-800"}
            onClick={handle_click_card}
        >
            <div className={tm("flex w-full gap-4 px-4 py-2", disabled && "grayscale-75")}>
                <div onClick={handle_click_avatar}>
                    <Avatar character={skin} />
                </div>

                <TextWithStatusTag
                    text_classname="text-stone-200 text-md"
                    text={name}
                    status={status}
                />
            </div>
        </button>
    );
}
