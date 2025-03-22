import type { SocketData } from "@repo/shared-types/socket";
import { AnimatedSprite, Assets, Container, Ticker } from "pixi.js";
import type { TickerCallback } from "pixi.js";
import { create_username_label } from "./utils";

export class Player extends Container
{
    player_data: SocketData;

    animated_sprite!: AnimatedSprite;
    username_label!: Container;

    _animate_fn: TickerCallback<Player>;

    constructor(player_data: SocketData, animate_fn: TickerCallback<Player>)
    {
        super({ position: player_data.spacial.postition });
        this.player_data = player_data;

        this.set_username_label();
        this.set_skin();

        this._animate_fn = animate_fn.bind(this);
        Ticker.shared.add(this._animate_fn);
    }

    public set_player_data(new_data: SocketData)
    {
        const is_new_username = this.player_data.info.name !== new_data.info.name;
        const is_new_status = this.player_data.info.status !== new_data.info.status;
        const is_new_skin = this.player_data.info.skin !== new_data.info.skin;
        this.player_data = new_data;
        this.x = this.player_data.spacial.postition.x;
        this.y = this.player_data.spacial.postition.y;

        if (is_new_username || is_new_status)
        {
            this.set_username_label();
        }

        if (is_new_skin)
        {
            this.set_skin();
        }

        // new spacial is being handled by the gameloop directly
    }

    public cleanup()
    {
        Ticker.shared.remove(this._animate_fn);
    }

    private set_username_label()
    {
        if (this.username_label)
        {
            this.username_label.destroy();
            this.removeChild(this.username_label);
        }

        this.username_label = create_username_label(
            this.player_data.info.name,
            this.player_data.info.status,
        );

        this.addChild(this.username_label);
    }

    private async set_skin()
    {
        if (this.animated_sprite)
        {
            this.animated_sprite.destroy();
            this.removeChild(this.animated_sprite);
        }

        const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

        this.animated_sprite = new AnimatedSprite([texture]);
        this.addChild(this.animated_sprite);
    }
}
