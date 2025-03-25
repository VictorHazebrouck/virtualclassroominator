import { type Application, Container, Ticker } from "pixi.js";
import { Layers } from "./layers/layers";

export default class Camera extends Container
{
    private layers: Layers;
    private app: Application;
    private obj_to_focus: Container;
    private zoom_state: "in" | "out" | "stop" = "stop";

    constructor(app: Application)
    {
        super();
        this.app = app;
        this.layers = new Layers();
        this.addChild(this.layers);
        this.obj_to_focus = this.layers.players_layer.get_self();

        Ticker.shared.add(this.center_camera_around_obj);
        Ticker.shared.add(this.zoom_camera);

        const zoom_manager = new ZoomManager(this.app.canvas);
        zoom_manager.on_zoom_in(() => (this.zoom_state = "in"));
        zoom_manager.on_zoom_out(() => (this.zoom_state = "out"));
        zoom_manager.on_zoom_stop(() => (this.zoom_state = "stop"));
    }

    private center_camera_around_obj = () =>
    {
        this.position.y = -this.obj_to_focus.y * this.scale.x + this.app.screen.height / 2;
        this.position.x = -this.obj_to_focus.x * this.scale.y + this.app.screen.width / 2;
    };

    private zoom_camera = (e: Ticker) =>
    {
        const SPEED = 0.1;

        if (this.zoom_state === "stop") return;
        if (this.zoom_state === "in")
        {
            if (this.scale.x > 3) return;

            this.scale.x += SPEED * e.deltaTime;
            this.scale.y += SPEED * e.deltaTime;
        }
        else
        {
            if (this.scale.x < 0.8) return;

            this.scale.x -= SPEED * e.deltaTime;
            this.scale.y -= SPEED * e.deltaTime;
        }

        this.center_camera_around_obj();
    };
}

/**
 * Goal here is to have smoother zoom animations. Having a diff only
 * callback system here allows us to in the Camera animate smoothly
 * the camera zoom using the ticker.
 */
class ZoomManager
{
    private on_zoom_in_listeners: (() => void)[] = [];
    private on_zoom_out_listeners: (() => void)[] = [];
    private on_zoom_stop_listeners: (() => void)[] = [];

    private state: "in" | "out" | "stop" = "stop";
    private timeout: NodeJS.Timeout | null = null;

    constructor(element: HTMLElement)
    {
        element.addEventListener("wheel", this.on_wheel_handler);
    }

    private on_wheel_handler = (e: WheelEvent) =>
    {
        if (this.timeout) clearTimeout(this.timeout);

        if (e.deltaY > 5 && this.state !== "in")
        {
            this.state = "in";
            this.on_zoom_in_listeners.forEach((cb) => cb());
        }
        else if (e.deltaY < -5 && this.state !== "out")
        {
            this.state = "out";
            this.on_zoom_out_listeners.forEach((cb) => cb());
        }

        this.timeout = setTimeout(() =>
        {
            this.state = "stop";
            this.on_zoom_stop_listeners.forEach((cb) => cb());
        }, 50);
    };

    public on_zoom_in(callback: () => void)
    {
        this.on_zoom_in_listeners.push(callback);
    }

    public on_zoom_out(callback: () => void)
    {
        this.on_zoom_out_listeners.push(callback);
    }

    public on_zoom_stop(callback: () => void)
    {
        this.on_zoom_stop_listeners.push(callback);
    }
}
