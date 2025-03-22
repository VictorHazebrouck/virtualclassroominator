import { listenKeys } from "nanostores";
import Socket from "./SocketIO";
import { $player_self } from "~/store/player_self";

listenKeys($player_self, ["info", "info.name", "info.skin", "info.status"], (e) =>
{
    Socket.emit("client:game:player:info", e.info);
});

listenKeys($player_self, ["spacial"], (e) =>
{
    Socket.emit("client:game:player:movement", e.spacial);
});
