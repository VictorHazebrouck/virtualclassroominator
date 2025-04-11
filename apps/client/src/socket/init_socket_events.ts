// import { $player_self } from "../store/player_self";
import { new_message_from_other_player } from "~/store/conversations";
import Socket from "../socket/SocketIO";
import {
    create_player_other,
    remove_player_other,
    set_player_other_chat,
    set_player_other_info,
    set_player_other_spacial,
} from "~/store/players_other";

Socket.on("connect", () =>
{
    // Socket.emit("client:connect", $player_self.get());

    Socket.on("server:game:send-gamestate", (e) =>
    {
        for (const socket_data of e)
        {
            create_player_other(socket_data);
        }
    });

    Socket.on("server:player-leave", (e) =>
    {
        remove_player_other(e.player_id);
    });

    Socket.on("server:player-join", (e) =>
    {
        create_player_other(e);
    });

    Socket.on("server:game:broadcast-player-info", ({ player_id, info }) =>
    {
        set_player_other_info(player_id, info);
    });

    Socket.on("server:game:broadcast-player-movement", ({ player_id, spacial }) =>
    {
        set_player_other_spacial(player_id, spacial);
    });

    Socket.on("server:game:broadcast-player-chat", ({ player_id, chat }) =>
    {
        set_player_other_chat(player_id, chat);
    });

    Socket.on("server:chat:send-message-to-player", ({ from_player_id, message }) =>
    {
        new_message_from_other_player(from_player_id, message);
        console.log("recevied message !", message);
    });
});
