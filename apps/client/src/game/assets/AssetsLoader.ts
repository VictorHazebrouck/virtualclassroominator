import animation_atlas from "./character_atlas_animated.json";
import tiles_atlas from "./tiles_atlas.json";
import manifest from "./manifest.json";
import { Assets, Spritesheet } from "pixi.js";
import type { TPlayerInfoSkin } from "@repo/shared-types/common";

Assets.init({ manifest: manifest, basePath: "/assets" });

export type CharacterSpriteSheetType = Awaited<ReturnType<typeof load_character_spritesheet>>;

export async function load_character_spritesheet(character: TPlayerInfoSkin)
{
    const assets = await Assets.loadBundle("characters");
    const raw_frames = assets[`${character}.png`];

    const spritesheet = new Spritesheet(raw_frames, animation_atlas);
    await spritesheet.parse();

    return spritesheet;
}

export type TilesSpriteSheetType = Awaited<ReturnType<typeof load_tiles_spritesheet>>;

export async function load_tiles_spritesheet()
{
    const assets = await Assets.loadBundle("tiles");
    const raw_frames = assets["base_tiles.png"];

    const spritesheet = new Spritesheet(raw_frames, tiles_atlas);
    await spritesheet.parse();

    return spritesheet;
}
