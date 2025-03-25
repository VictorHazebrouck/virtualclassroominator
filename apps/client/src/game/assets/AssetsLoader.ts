import animation_atlas from "./character_atlas_animated.json";
import manifest from "./manifest.json";
import { Assets, Spritesheet } from "pixi.js";
import type { AvailableSkins } from "@repo/shared-types/socket";

await Assets.init({ manifest: manifest, basePath: "/assets" });

export type SpriteSheetType = Awaited<ReturnType<typeof load_character_spritesheet>>;

export async function load_character_spritesheet(character: AvailableSkins)
{
    const assets = await Assets.loadBundle("characters");
    const raw_frames = assets[`${character}.png`];

    const spritesheet = new Spritesheet(raw_frames, animation_atlas);
    await spritesheet.parse();

    return spritesheet;
}

export async function load_tiles()
{
    return await Assets.loadBundle("tiles");
}
