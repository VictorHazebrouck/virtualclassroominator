import { Container, Graphics, Text, Ticker } from "pixi.js";
import { Player } from "./player_base";
import type { SocketData } from "@repo/shared-types/socket";

export function create_username_label(username: string, status: SocketData["info"]["status"])
{
    const H_PADDING = 5;
    const W_PADDING = 20;

    const text = new Text({
        style: {
            fill: "#fff",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: 1,
        },
    });
    text.scale.set(0.5);
    text.text = username;
    text.x += W_PADDING / 2;
    text.y += H_PADDING / 2;

    const rounded_rect = new Graphics();
    rounded_rect.roundRect(0, 0, text.width + W_PADDING, text.height + H_PADDING);
    rounded_rect.fill("#000");
    rounded_rect.alpha = 0.6;

    const container = new Container();
    container.pivot = { x: rounded_rect.width / 2 - 15, y: 23 };

    const circle = create_status_circle(status);
    circle.x = rounded_rect.width - 2;
    circle.y += 2;

    container.addChild(rounded_rect);
    container.addChild(text);
    container.addChild(circle);

    return container;
}

function create_status_circle(status: SocketData["info"]["status"])
{
    const CIRCLE_RAD = 8;

    const color_map = {
        on: "#00C851",
        off: "#FF4444",
        away: "#FFEB3B",
        disconnected: "",
    };

    const circle = new Graphics();
    circle.circle(0, 0, CIRCLE_RAD);
    circle.setStrokeStyle({ width: 2, color: "#111111" });
    circle.fill(color_map[status]);
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
