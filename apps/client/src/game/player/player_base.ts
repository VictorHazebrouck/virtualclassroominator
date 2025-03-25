import type { AvailableSkins, Direction, SocketData } from "@repo/shared-types/socket";
import { AnimatedSprite, Container, Ticker } from "pixi.js";
import type { TickerCallback } from "pixi.js";
import { create_username_label } from "./utils";
import { load_character_spritesheet, type SpriteSheetType } from "../assets/AssetsLoader";

export class Player extends Container
{
    player_data: SocketData;

    player_sprite?: PlayerSprite;
    username_label?: Container;

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
        const is_new_direction = this.player_data.spacial.direction !== new_data.spacial.direction;
        const is_new_is_moving = this.player_data.spacial.is_moving !== new_data.spacial.is_moving;

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

        if (is_new_direction || is_new_is_moving)
        {
            this.set_animation();
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
        if (this.player_sprite)
        {
            this.player_sprite.destroy();
            this.removeChild(this.player_sprite);
        }

        this.player_sprite = await PlayerSprite.create(this.player_data.info.skin);
        this.addChild(this.player_sprite);
    }

    private set_animation()
    {
        const spacial = this.player_data.spacial;
        this.player_sprite?.set_animation(spacial.is_moving, spacial.direction);
    }
}

class PlayerSprite extends AnimatedSprite
{
    spritesheet: SpriteSheetType;

    private constructor(spritesheet: SpriteSheetType)
    {
        super(spritesheet.animations["idle"]);
        this.animationSpeed = 0.1;
        this.scale = 1.5;
        this.x += 2;
        this.spritesheet = spritesheet;
    }

    public set_animation(is_moving: boolean, direction: Direction)
    {
        if (!is_moving)
        {
            return this.gotoAndStop(0);
        }

        const dir_actions_map = {
            top: () => (this.textures = this.spritesheet.animations["move_back"]),
            down: () => (this.textures = this.spritesheet.animations["move_front"]),
            left: () => (this.textures = this.spritesheet.animations["move_left"]),
            right: () => (this.textures = this.spritesheet.animations["move_right"]),
        };
        dir_actions_map[direction]?.();
        this.play();
    }

    static async create(skin: AvailableSkins)
    {
        const spritesheet = await load_character_spritesheet(skin);
        return new PlayerSprite(spritesheet);
    }
}
