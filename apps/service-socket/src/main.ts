import {
    TBClientChatSendMessageToPlayerValidator,
    type ClientToServerEvents,
} from "@repo/shared-types/client-events";
import type { TPlayerData } from "@repo/shared-types/common";
import {
    TBMessageValidator,
    TBPlayerDataValidator,
    TBPlayerInfoValidator,
    TBPlayerSpacialValidator,
    TBPlayerStreamValidator,
} from "@repo/shared-types/common";
import type { InterServerEvents } from "@repo/shared-types/interserver-events";
import type { ServerToClientEvents } from "@repo/shared-types/server-events";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer();

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, TPlayerData>(
    server,
    {
        cors: {
            origin: "*",
        },
    },
);

io.on("connection", async (socket) =>
{
    try
    {
        const socket_data_str = socket.handshake.query.player_initial_data;
        const socket_data_obj = JSON.parse(socket_data_str as string) as TPlayerData;

        const passes_validation = TBPlayerDataValidator.Check(socket_data_obj);
        if (passes_validation)
        {
            socket.data = socket_data_obj;
            socket.broadcast.emit("server:player-join", socket.data);

            const sockets = await io.fetchSockets();

            const players_data = sockets
                .map((e) => e.data)
                .filter((e) => e._id !== socket.data._id);

            socket.emit("server:game:send-gamestate", players_data);
        }
        else
        {
            console.error("CONNECTION DATA DOESNT PASS VALIDATION");
            socket.disconnect(true);
        }
    }
    catch (error)
    {
        console.error("COULDNT PARSE CONNECTION INFO", error);
        socket.disconnect(true);
    }

    // might use this as a reconnect mechanism instead or somth
    // socket.on("client:connect", async (data) =>
    // {
    //     // //on connection, init the socket data for said player
    //     // socket.data = data;
    //     // // and send him current gamestate
    //     // socket.broadcast.emit("server:player-join", data);
    // });

    socket.on("client:game:player:movement", (spacial_data) =>
    {
        const passes_validation = TBPlayerSpacialValidator.Check(spacial_data);
        if (!passes_validation) return;

        socket.data.spacial = spacial_data;

        socket.broadcast.emit("server:game:broadcast-player-movement", {
            player_id: socket.data._id,
            spacial: socket.data.spacial,
        });
    });

    socket.on("client:game:player:info", (info_data) =>
    {
        const passes_validation = TBPlayerInfoValidator.Check(info_data);
        if (!passes_validation) return;

        socket.data.info = info_data;

        socket.broadcast.emit("server:game:broadcast-player-info", {
            player_id: socket.data._id,
            info: socket.data.info,
        });
    });

    socket.on("client:game:player:stream", (stream_data) =>
    {
        const passes_validation = TBPlayerStreamValidator.Check(stream_data);
        if (!passes_validation) return;

        socket.data.stream = stream_data;

        socket.broadcast.emit("server:game:broadcast-player-stream", {
            player_id: socket.data._id,
            stream: socket.data.stream,
        });
    });

    socket.on("client:chat:send-message-global", (message) =>
    {
        const passes_validation = TBMessageValidator.Check(message);
        if (!passes_validation) return;

        socket.broadcast.emit("server:chat:send-message-global", message);
    });

    socket.on("client:chat:send-message-to-player", async (message_data) =>
    {
        const passes_validation = TBClientChatSendMessageToPlayerValidator.Check(message_data);
        if (!passes_validation) return;

        const { to_player_id, message } = message_data;
        const sockets = await io.fetchSockets();

        const player_socket = sockets.find((s) => s.data._id == to_player_id);
        if (!player_socket) return;

        player_socket.emit("server:chat:send-message-to-player", message);
    });

    socket.on("disconnect", () =>
    {
        io.emit("server:player-leave", { player_id: socket.data._id });
    });
});

const PORT = process.env.PORT;
if (!PORT) throw new Error("No PORT found");

server.listen(PORT, () =>
{
    //test
    console.log("Socket Service running on port " + PORT);
});
