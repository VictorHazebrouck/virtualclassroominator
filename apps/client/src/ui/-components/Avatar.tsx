import type { TPlayerInfoSkin } from "@repo/shared-types/common";
import type { MouseEvent } from "react";
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

    return (
        <div
            className={tm(
                "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-red-500 hover:bg-green-500",
                className,
            )}
            onClick={(e) => on_click?.(e)}
        >
            <div className="relative -mt-1 h-[32px] w-[16px] scale-150 overflow-hidden">
                <img
                    src={character_asset_path}
                    className="absolute top-0 left-0 h-auto w-auto max-w-none"
                />
            </div>
        </div>
    );
}
