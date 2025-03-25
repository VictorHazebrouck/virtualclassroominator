import type { SocketData } from "@repo/shared-types/socket";
import { Container } from "pixi.js";
import { $player_self } from "../../store/player_self";
import { $players_other } from "../../store/players_other";
import { PlayerOther } from "../player/player_other";
import { PlayerSelf } from "../player/player_self";

export default class PlayersLayer extends Container
{
    private players_other_map = new Map<string, PlayerOther>();
    private player_self = new PlayerSelf($player_self.get());

    constructor()
    {
        super();
        this.addChild(this.player_self);
        this.init_listeners();
    }

    public get_player_by_id(player_id: string)
    {
        return this.players_other_map.get(player_id);
    }

    public get_self()
    {
        return this.player_self;
    }

    private create_new_player(player_data: SocketData)
    {
        const new_player = new PlayerOther(player_data);
        this.addChild(new_player);
        this.players_other_map.set(player_data._id, new_player);
    }

    private remove_new_player_by_id(player_id: string)
    {
        const player = this.get_player_by_id(player_id);

        if (player)
        {
            this.players_other_map.delete(player_id);
            this.removeChild(player);
            player.cleanup();
        }
    }

    private init_listeners()
    {
        const players = $players_other.get();
        for (const player_id in players)
        {
            this.create_new_player(players[player_id]!);
        }

        $players_other.listen(async (curr, prev, changed_key) =>
        {
            if (!changed_key) return;

            const player_id = changed_key.split(".")[0] || changed_key;
            const is_player_in_game = this.get_player_by_id(player_id);

            if (!is_player_in_game)
            {
                this.create_new_player(curr[player_id]!);
            }

            // when removing from a map, nanostores sends the removed key in
            // changed_key, and sends the new curr state freed of it.
            else if (!curr[player_id])
            {
                this.remove_new_player_by_id(player_id);
            }
        });
    }
}
