import { Container, Graphics, Text, Ticker } from "pixi.js";
import { Player } from "./player_base";
import type { TPlayerInfoStatus } from "@repo/shared-types/common";
import { COLOR_MAP } from "~/constants";

export const PLAYER_HEIGHT_PX = 32;
export const PLAYER_WIDTH_PX = 24;

export function create_username_label(username: string, status: TPlayerInfoStatus)
{
    const H_PADDING = 3;
    const W_PADDING = 15;

    const text = new Text({
        style: {
            fill: "#fff",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: 1,
        },
    });
    text.scale.set(0.25);
    text.text = username;
    text.x += W_PADDING / 2;
    text.y += H_PADDING / 2;

    const rounded_rect = new Graphics();
    rounded_rect.roundRect(0, 0, text.width + W_PADDING, text.height + H_PADDING);
    rounded_rect.fill("#000");
    rounded_rect.alpha = 0.6;

    const container = new Container();
    container.pivot = {
        x: rounded_rect.width / 2 - PLAYER_WIDTH_PX / 2,
        y: 15,
    };

    const circle = create_status_circle(status);
    circle.x = rounded_rect.width - 1.5;
    circle.y += 2;

    container.addChild(rounded_rect);
    container.addChild(text);
    container.addChild(circle);

    return container;
}

function create_status_circle(status: TPlayerInfoStatus)
{
    const CIRCLE_RAD = 6;

    const circle = new Graphics();
    circle.circle(0, 0, CIRCLE_RAD);
    circle.setStrokeStyle({ width: 1, color: "#111111" });
    circle.fill(COLOR_MAP[status]);
    circle.stroke();
    circle.scale.set(0.5);

    return circle;
}

export function animate_player(ctx: Player, ticker: Ticker)
{
    const { deltaTime } = ticker;
    const { direction, is_moving } = ctx.player_data.spacial;

    if (!is_moving) return;

    const SPEED = 2;
    const { x, y } = ctx.position;
    const new_pos = { x: x, y: y };

    const moves = {
        top: () => (new_pos.y -= SPEED * deltaTime),
        down: () => (new_pos.y += SPEED * deltaTime),
        left: () => (new_pos.x -= SPEED * deltaTime),
        right: () => (new_pos.x += SPEED * deltaTime),
    };
    moves[direction]?.();

    ctx.position = new_pos;
}
