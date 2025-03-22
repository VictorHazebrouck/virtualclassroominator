import { $player_self } from "../store/player_self";
import Socket from "../socket/SocketIO";
import { $players_other } from "~/store/players_other";

Socket.on("connect", () =>
{
    Socket.emit("client:connect", $player_self.get());

    Socket.on("server:game:send-gamestate", (e) =>
    {
        for (const socket_data of e)
        {
            $players_other.setKey(socket_data._id, socket_data);
        }
    });

    Socket.on("server:player-leave", (e) =>
    {
        $players_other.setKey(e.player_id, undefined!);
    });

    Socket.on("server:player-join", (e) =>
    {
        $players_other.setKey(e._id, e);
    });

    Socket.on("server:game:broadcast-player-info", ({ player_id, info }) =>
    {
        $players_other.setKey(`${player_id}.info`, info);
    });

    Socket.on("server:game:broadcast-player-movement", ({ player_id, spacial }) =>
    {
        $players_other.setKey(`${player_id}.spacial`, spacial);
    });
});
