import { Postion } from "@repo/shared-types/socket";
import DecorationsLayer from "./decorations";
import GroundsLayer from "./grounds";
import PlayersLayer from "./players";
import WallsLayer from "./walls";

interface TileData
{
    position: Postion;
    size: Postion;
}

// interface MapData
// {
//     grounds_layer: [];
//     decorations_layer: [];
//     walls_layer: [];
// }

export class Layers
{
    constructor(
        private grounds_layer: GroundsLayer,
        private decorations_layer: DecorationsLayer,
        private walls_layer: WallsLayer,
        private players_layer: PlayersLayer,
    )
    {}
}

export async function init_layers(tile_data: TileData)
{
    const grounds_layer = new GroundsLayer();
    const decorations_layer = new DecorationsLayer();
    const walls_layer = new GroundsLayer();
    const players_layer = new PlayersLayer();

    const layers = new Layers(grounds_layer, decorations_layer, walls_layer, players_layer);
    return layers;
}
