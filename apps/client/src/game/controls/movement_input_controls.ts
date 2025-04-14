import type { TDirection } from "@repo/shared-types/common";

const default_movement_controls: Record<string, TDirection> = {
    ArrowUp: "top",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
};

export default class MovementInputControls
{
    private movement_input_queue: TDirection[] = [];
    private movement_controls: Record<string, TDirection> = default_movement_controls;

    private movement_start_listeners: ((direction: TDirection) => void)[] = [];
    private movement_stop_listeners: (() => void)[] = [];

    constructor(element: any)
    {
        element.addEventListener("keydown", this.keydown_fn);
        element.addEventListener("keyup", this.keyup_fn);
    }

    public on_move(fn: (direction: TDirection) => void)
    {
        this.movement_start_listeners.push(fn);
    }

    public on_stop(fn: () => void)
    {
        this.movement_stop_listeners.push(fn);
    }

    private keydown_fn = (e: KeyboardEvent) =>
    {
        const direction = this.movement_controls[e.code];
        if (!direction) return;

        const last_i = this.movement_input_queue.length - 1;
        const last_direction = this.movement_input_queue[last_i];
        if (last_direction === direction) return;

        this.movement_input_queue.push(direction);
        this.movement_start_listeners.forEach((callback) => callback(direction));
    };

    private keyup_fn = (e: KeyboardEvent) =>
    {
        const direction = this.movement_controls[e.code];
        if (!direction) return;

        const prev_i = this.movement_input_queue.length - 1;
        const prev_direction = this.movement_input_queue[prev_i];

        this.movement_input_queue = this.movement_input_queue.filter((e) => e !== direction);

        const last_i = this.movement_input_queue.length - 1;
        const last_direction = this.movement_input_queue[last_i];
        const is_new_direction = last_direction !== prev_direction;

        if (last_direction && is_new_direction)
        {
            this.movement_start_listeners.forEach((callback) => callback(last_direction));
        }
        else if (this.movement_input_queue.length === 0)
        {
            this.movement_stop_listeners.forEach((callback) => callback());
        }
    };
}
