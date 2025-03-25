import "./assets/AssetsLoader";
import { Application } from "pixi.js";
import PlayersLayer from "./layers/players";
import { sync_app_size_to } from "./utils";

export async function init_app(container: HTMLDivElement)
{
    const app = new Application();
    await app.init({ background: "#1099bb", resizeTo: container });

    sync_app_size_to(app, container);
    container.appendChild(app.canvas);

    const players_layer = new PlayersLayer();
    app.stage.addChild(players_layer);
}
