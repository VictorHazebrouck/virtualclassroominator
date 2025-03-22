import { useStore } from "@nanostores/react";
import { useRef } from "react";
import { $player_card } from "~/store/player_card";

const CARD_WIDTH = 150;
const CARD_HEIGHT = 100;
const PADDING = 10;

export default function Overlay()
{
    const player_card = useStore($player_card);

    const ref = useRef<HTMLDivElement>(null);

    function get_card_position_within_bounds()
    {
        if (!player_card || !ref.current) return null;

        const rect = ref.current.getBoundingClientRect();

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

    return (
        <div className="absolute h-full w-full" ref={ref} onClick={() => $player_card.set(null)}>
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
