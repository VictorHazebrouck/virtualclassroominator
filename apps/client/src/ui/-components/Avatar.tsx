import type { TPlayerInfoSkin } from "@repo/shared-types/common";
import { useEffect } from "react";
import { useRef, useState, type MouseEvent } from "react";
import manifest from "~/game/assets/manifest.json";
import { tm } from "~/utils/tm";

const characters_list_raw = manifest.bundles.find((b) => b.name == "characters")?.assets || [];
const characters_list = characters_list_raw.map((c) => ({
    name: c.alias[1]?.replace(".png", ""),
    src: c.src.find((s) => s.endsWith(".webp") && !s.endsWith("@0.5x.webp")),
}));

export interface AvatarProps
{
    character: TPlayerInfoSkin;
    on_click?: (e: MouseEvent) => void;
    className?: string;
}

export default function Avatar({ character, on_click, className }: AvatarProps)
{
    const character_asset = characters_list.find((c) => c.name == character);
    const character_asset_path = `/assets/${character_asset!.src}`;

    const outer_ref = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1.5);

    useEffect(() =>
    {
        if (outer_ref.current)
        {
            const height = outer_ref.current.offsetHeight;
            setScale((height / 32) * 1.2);
        }
    }, []);

    return (
        <div
            className={tm(
                "flex aspect-square h-full items-center justify-center overflow-hidden rounded-full",
                // "bg-red-500 hover:bg-green-500",
                className,
            )}
            onClick={(e) => on_click?.(e)}
            ref={outer_ref}
        >
            {/* crop to get the front view of the character from the spritesheet */}
            <div
                className="relative h-[32px] w-[16px] scale-150 overflow-hidden"
                style={{ scale: scale }}
            >
                <img
                    src={character_asset_path}
                    className="absolute top-0 left-0 h-auto w-auto max-w-none"
                />
            </div>
        </div>
    );
}
