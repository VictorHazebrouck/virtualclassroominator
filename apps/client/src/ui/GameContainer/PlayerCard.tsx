import { useStore } from "@nanostores/react";
import type { RefObject } from "react";
import { $player_card } from "~/store/player_card";

const CARD_WIDTH = 150;
const CARD_HEIGHT = 100;
const PADDING = 10;

export default function Overlay({
    container_ref,
}: {
    container_ref: RefObject<HTMLDivElement | null>;
})
{
    const player_card = useStore($player_card);

    function get_card_position_within_bounds()
    {
        if (!player_card || !container_ref.current) return null;

        const rect = container_ref.current.getBoundingClientRect();

        return {
            x: Math.min(
                Math.max(player_card.position.x, rect.left + PADDING),
                rect.right - CARD_WIDTH - PADDING,
            ),
            y: Math.min(
                Math.max(player_card.position.y, rect.top + PADDING),
                rect.bottom - CARD_HEIGHT - PADDING,
            ),
        };
    }

    const position = get_card_position_within_bounds();

    if (!player_card) return <></>;
    return (
        <div className={"absolute h-full w-full"} onClick={() => $player_card.set(null)}>
            {position && (
                <div
                    className="absolute bg-gray-700 px-4 py-2 rounded-lg"
                    style={{
                        top: position.y,
                        left: position.x,
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                    }}
                >
                    <p>Hello hello</p>
                </div>
            )}
        </div>
    );
}
