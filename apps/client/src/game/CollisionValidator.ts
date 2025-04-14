import type { TDirection, TPosition } from "@repo/shared-types/common";
import { PLAYER_WIDTH_PX, PLAYER_HEIGHT_PX } from "./player/utils";
import type { Container } from "pixi.js";

class CollisionValidator
{
    collidable_entities: Container[] = [];

    public add_entity(entity: Container)
    {
        this.collidable_entities.push(entity);
    }

    has_collided(position: TPosition, direction: TDirection): boolean
    {
        const MARGIN = 2;

        const player_box = {
            left: position.x,
            right: position.x + PLAYER_WIDTH_PX,
            top: position.y,
            bottom: position.y + PLAYER_HEIGHT_PX,
        };

        if (direction === "top") player_box.bottom -= MARGIN;
        else if (direction === "down") player_box.top += MARGIN;
        else if (direction === "left") player_box.right -= MARGIN;
        else if (direction === "right") player_box.left += MARGIN;

        for (const object of this.collidable_entities)
        {
            const { x, y, width, height, pivot } = object;

            const object_box = {
                left: x - width * pivot.x,
                right: x - width * pivot.x + width,
                top: y - height * pivot.y,
                bottom: y - height * pivot.y + height,
            };

            const isColliding =
                player_box.right > object_box.left &&
                player_box.left < object_box.right &&
                player_box.bottom > object_box.top &&
                player_box.top < object_box.bottom;

            if (isColliding) return true;
        }

        return false;
    }
}

export default new CollisionValidator();
