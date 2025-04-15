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
    className?: string;
}

export default function PlayerCard({
    on_click_card,
    on_click_avatar,
    disabled = false,
    player_info,
    className,
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
            className={tm(
                "flex w-full cursor-pointer gap-4 overflow-hidden rounded-lg bg-gray-800 px-4 py-2",
                className,
            )}
            onClick={handle_click_card}
        >
            <Avatar
                className={disabled ? "grayscale-75" : ""}
                character={skin}
                on_click={handle_click_avatar}
            />

            <TextWithStatusTag text_classname="text-md" text={name} status={status} />
        </button>
    );
}
