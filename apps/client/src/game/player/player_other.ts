import type { SocketData } from "@repo/shared-types/socket";
import { listenKeys } from "nanostores";
import { Ticker } from "pixi.js";
import { $players_other } from "../../store/players_other";
import { Player } from "./player_base";
import { animate_player } from "./utils";

export class PlayerOther extends Player
{
    private cleanup_listeners: () => void;

    constructor(player_data: SocketData)
    {
        super(player_data, animate_player_other);
        this.cleanup_listeners = this.sub_to_store();
    }

    private sub_to_store()
    {
        return listenKeys(
            $players_other,
            [
                this.player_data._id,
                `${this.player_data._id}.spacial`,
                `${this.player_data._id}.info`,
            ],
            (players) =>
            {
                const new_player_data = players[this.player_data._id];
                if (new_player_data)
                {
                    this.set_player_data(new_player_data);
                }
            },
        );
    }

    /**
     * Unsubscribes animation fn and store listeners
     * Destroys the Container and its children recursively
     */
    cleanup()
    {
        Ticker.shared.remove(this._animate_fn);
        this.cleanup_listeners();
        this.destroy(true);
    }
}

function animate_player_other(this: Player, ticker: Ticker)
{
    animate_player(this, ticker);
}
