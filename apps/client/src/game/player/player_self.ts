import type { SocketData } from "@repo/shared-types/socket";
import type { Ticker, TickerCallback } from "pixi.js";
import { Player } from "./player_base";
import CollisionValidator from "../CollisionValidator";
import { animate_player } from "./utils";
import MovementInputControls from "../controls/movement_input_controls";
import { $player_self, player_self_move, player_self_stop } from "../../store/player_self";

export class PlayerSelf extends Player
{
    movement_input_controller = new MovementInputControls(document);

    constructor(player_data: SocketData)
    {
        super(player_data, animate_with_collision_detection as TickerCallback<Player>);
        this.plug_inputs();
        this.sub_to_store();
    }

    private sub_to_store()
    {
        $player_self.subscribe((e) => this.set_player_data(e));
    }

    private plug_inputs()
    {
        this.movement_input_controller.on_move((new_dir) =>
        {
            player_self_move(new_dir, {
                x: this.x,
                y: this.y,
            });
        });

        this.movement_input_controller.on_stop(() =>
        {
            player_self_stop({
                x: this.x,
                y: this.y,
            });
        });
    }
}

function animate_with_collision_detection(this: PlayerSelf, ticker: Ticker)
{
    const { is_moving, direction } = this.player_data.spacial;
    if (!is_moving) return;

    const has_player_collided = CollisionValidator.has_collided(this.position, direction);
    if (has_player_collided)
    {
        return player_self_stop({
            x: this.x,
            y: this.y,
        });
    }

    animate_player(this as unknown as Player, ticker);
}
