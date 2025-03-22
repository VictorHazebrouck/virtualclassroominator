import { Application } from "pixi.js";
import PlayersLayer from "./layers/players";
import { sync_app_size_to } from "./utils";

// function init_other_players()
// {
//     Socket.on("server:game:broadcast-player-move", (data) =>
//     {
//         players_layer.move_player(data);
//     });

//     Socket.on("server:game:broadcast-player-stop", (data) =>
//     {
//         players_layer.stop_player(data);
//     });

//     Socket.on("server:player-leave", (data) =>
//     {
//         const { player_id } = data;
//         players_layer.remove_player(player_id);
//     });

//     Socket.on("server:player-join", (data) =>
//     {
//         players_layer.add_player(data);
//     });

//     Socket.on("server:game:send-gamestate", (data) =>
//     {
//         for (const player_data of data)
//         {
//             players_layer.add_player(player_data);
//         }
//     });
// }

export async function init_app(container: HTMLDivElement)
{
    const app = new Application();
    await app.init({ background: "#1099bb", resizeTo: container });

    sync_app_size_to(app, container);
    container.appendChild(app.canvas);

    const players_layer = new PlayersLayer();
    app.stage.addChild(players_layer);
}
