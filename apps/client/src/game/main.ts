import "./assets/AssetsLoader";
import { Application } from "pixi.js";
import { sync_app_size_to } from "./utils";
import Camera from "./camera";

export async function init_app(container: HTMLDivElement)
{
    const app = new Application();
    await app.init({ background: "#1099bb", resizeTo: container });

    sync_app_size_to(app, container);
    container.appendChild(app.canvas);

    const camera = new Camera(app);
    app.stage.addChild(camera);
}
