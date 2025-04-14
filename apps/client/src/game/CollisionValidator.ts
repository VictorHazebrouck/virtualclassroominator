import type { TDirection, TPosition } from "@repo/shared-types/common";

interface C
{
    position: {
        x: number;
        y: number;
    };
    pivot: {
        x: number;
        y: number;
    };
    height: number;
    width: number;
}

class CollisionValidator
{
    collidable_entities: C[] = [];

    public add_entity(entity: C)
    {
        this.collidable_entities.push(entity);
    }

    has_collided(position: TPosition, direction: TDirection)
    {
        const MARGIN = 5;

        const next_position = { x: position.x, y: position.y };
        if (direction == "left") next_position.x -= MARGIN;
        else if (direction == "right") next_position.x += MARGIN;
        else if (direction == "top") next_position.y -= MARGIN;
        else if (direction == "down") next_position.y += MARGIN;

        for (const c_entity of this.collidable_entities)
        {
            const { pivot, position, height, width } = c_entity;

            const bounding_box = {
                left: position.x - width * pivot.x,
                right: position.x - width * pivot.x + width,
                top: position.y - height * pivot.y,
                down: position.y - height * pivot.y + height,
            };

            const is_next_position_colliding =
                next_position.x > bounding_box.left &&
                next_position.x < bounding_box.right &&
                next_position.y > bounding_box.top &&
                next_position.y < bounding_box.down;

            if (is_next_position_colliding) return true;
            else return false;
        }
    }
}

export default new CollisionValidator();
