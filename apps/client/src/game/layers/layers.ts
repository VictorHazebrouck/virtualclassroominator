import { Container } from "pixi.js";
import DecorationsLayer from "./decorations";
import GroundsLayer from "./grounds";
import PlayersLayer from "./players";
import WallsLayer from "./walls";

export class Layers extends Container
{
    grounds_layer: GroundsLayer;
    decorations_layer: DecorationsLayer;
    walls_layer: WallsLayer;
    players_layer: PlayersLayer;

    constructor()
    {
        super();
        this.grounds_layer = new GroundsLayer();
        this.addChild(this.grounds_layer);
        this.decorations_layer = new DecorationsLayer();
        this.addChild(this.decorations_layer);
        this.walls_layer = new WallsLayer();
        this.addChild(this.walls_layer);
        this.players_layer = new PlayersLayer();
        this.addChild(this.players_layer);
    }
}
