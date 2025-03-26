import { Container } from "pixi.js";
import DecorationsLayer from "./decorations";
import GroundsLayer from "./grounds";
import PlayersLayer from "./players";
import WallsLayer from "./walls";
import { TickerSlow } from "../utils";
import { set_nearby_players } from "~/store/nearby_players";

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

        TickerSlow.add(this.check_nearby_players);
    }

    private check_nearby_players = () =>
    {
        const mode = "proximity";

        if (mode === "proximity")
        {
            const THRESHOLD = 50;

            const { x: my_x, y: my_y } = this.players_layer.get_self().position;
            const players = Array.from(this.players_layer.get_other_players().values());

            const nearby = players.filter(
                ({ x, y }) => Math.abs(x - my_x) < THRESHOLD && Math.abs(y - my_y) < THRESHOLD,
            );
            const ids = nearby.map((e) => e.player_data._id);
            set_nearby_players(ids);
        }
        else
        {
            // get from room rather than proximity check
        }
    };
}
