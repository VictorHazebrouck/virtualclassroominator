import type { TDirection, TPosition } from "@repo/shared-types/common";
import { PLAYER_WIDTH_PX, PLAYER_HEIGHT_PX } from "./player/utils";
import type { Container } from "pixi.js";

type ObjectBox = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

class CollisionValidator
{
    collidable_entities: Container[] = [];
    collidable_static_entities: ObjectBox[] = [];

    /** @returns cleanup function */
    public add_entity(entity: Container)
    {
        this.collidable_entities.push(entity);

        return () => this.remove_entity(entity);
    }

    public remove_entity(entity: Container)
    {
        this.collidable_entities = this.collidable_entities.filter((e) => e !== entity);
    }

    /** only for static permanent entities, once added cannot be removed */
    public add_static_entity(entity: Container)
    {
        const entity_box = this.convert_container_to_object_box(entity);
        this.collidable_static_entities.push(entity_box);
    }

    public has_collided(position: TPosition, direction: TDirection): boolean
    {
        const MARGIN = 4;

        const player_box: ObjectBox = {
            left: position.x + MARGIN,
            right: position.x + PLAYER_WIDTH_PX - MARGIN + 4,
            top: position.y + MARGIN + 6,
            bottom: position.y + PLAYER_HEIGHT_PX - MARGIN - 2,
        };

        // avoids getting stuck when trying to move perpendicular close to a wall
        if (direction === "top") player_box.top -= MARGIN;
        else if (direction === "down") player_box.bottom += MARGIN;
        else if (direction === "left") player_box.left -= MARGIN;
        else if (direction === "right") player_box.right += MARGIN;

        for (const object_box of this.collidable_static_entities)
        {
            const has_player_collided = this.have_boxes_collided(player_box, object_box);
            if (has_player_collided) return true;
        }

        for (const container of this.collidable_entities)
        {
            const object_box = this.convert_container_to_object_box(container);

            const has_player_collided = this.have_boxes_collided(player_box, object_box);
            if (has_player_collided) return true;
        }

        return false;
    }

    private have_boxes_collided(box_1: ObjectBox, box_2: ObjectBox)
    {
        const has_collided =
            box_1.right > box_2.left &&
            box_1.left < box_2.right &&
            box_1.bottom > box_2.top &&
            box_1.top < box_2.bottom;

        return has_collided;
    }

    private convert_container_to_object_box(container: Container)
    {
        const { x, y, width, height, pivot } = container;

        const object_box = {
            left: x - width * pivot.x,
            right: x - width * pivot.x + width,
            top: y - height * pivot.y,
            bottom: y - height * pivot.y + height,
        };

        return object_box;
    }
}

export default new CollisionValidator();
