import { new_message_from_other_player } from "~/store/conversations";
import Socket from "../socket/SocketIO";
import {
    create_player_other,
    remove_player_other,
    set_player_other_stream,
    set_player_other_info,
    set_player_other_spacial,
} from "~/store/players_other";

Socket.on("connect", () =>
{
    Socket.on("server:game:send-gamestate", (players_data) =>
    {
        players_data.forEach((player_data) => create_player_other(player_data));
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

    Socket.on("server:game:broadcast-player-stream", ({ player_id, stream }) =>
    {
        set_player_other_stream(player_id, stream);
    });

    Socket.on("server:chat:send-message-to-player", (message) =>
    {
        new_message_from_other_player(message.sender, message);
    });
});
