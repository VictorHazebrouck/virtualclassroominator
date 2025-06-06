import { Container, Sprite } from "pixi.js";
import { load_tiles_spritesheet, type TilesSpriteSheetType } from "../assets/AssetsLoader";
import tile_map from "../assets/tile_map_background.json";

export default class GroundsLayer extends Container
{
    spritesheet!: TilesSpriteSheetType;
    tilemap = tile_map;

    constructor()
    {
        super();
        this.generate_background();
    }

    async generate_background()
    {
        this.spritesheet = await load_tiles_spritesheet();

        const TILE_SIZE = 16;
        const width = this.tilemap[0]!.length * TILE_SIZE;
        const height = this.tilemap.length * TILE_SIZE;
        this.height = height;
        this.width = width;

        for (let i = 0; i < this.tilemap.length; i++)
        {
            for (let j = 0; j < this.tilemap[i]!.length; j++)
            {
                const texture_name = `${this.tilemap[i]![j]}.png`;
                //@ts-expect-error need to find a way to make ts happy about this
                const texture = this.spritesheet.textures[texture_name];
                const sprite = new Sprite(texture);
                sprite.position.set(j * TILE_SIZE, i * TILE_SIZE);
                this.addChild(sprite);
            }
        }
    }
}
