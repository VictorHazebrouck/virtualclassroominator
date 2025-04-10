import { useStore } from "@nanostores/react";
import { type RefObject } from "react";
import { $player_card } from "~/store/player_card";
import Modal from "../-components/Modal";
import type { Postion } from "@repo/shared-types/socket";
import TextWithStatusTag from "../-components/TextWithStatus";

const CARD_WIDTH = 150;
const CARD_HEIGHT = 100;
const PADDING = 10;

export default function PlayerCard({
    container_ref,
}: {
    container_ref: RefObject<HTMLDivElement | null>;
})
{
    const player_card = useStore($player_card);

    console.log(player_card);

    if (!container_ref.current || !player_card) return <></>;

    const position = get_card_position_within_bounds(container_ref.current, player_card.position);
    const { name, status } = player_card.info;

    return (
        <Modal
            onClickOutside={() => $player_card.set(null)}
            visible={Boolean(player_card)}
            style={{
                top: position.y,
                left: position.x,
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
            }}
        >
            <TextWithStatusTag text={name} status={status} />
            <button className="cursor-pointer text-stone-200">Send message</button>
            <button className="cursor-pointer text-stone-200">Wave</button>
        </Modal>
    );
}

function get_card_position_within_bounds(container: HTMLElement, position: Postion)
{
    const rect = container.getBoundingClientRect();

    return {
        x: Math.min(Math.max(position.x, rect.left + PADDING), rect.right - CARD_WIDTH - PADDING),
        y: Math.min(Math.max(position.y, rect.top + PADDING), rect.bottom - CARD_HEIGHT - PADDING),
    };
}
