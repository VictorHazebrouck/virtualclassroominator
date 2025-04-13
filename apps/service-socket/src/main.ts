import type {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from "@repo/shared-types/socket";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors);

app.get("/", (req, res) =>
{
    res.json({ test: "test" });
});

const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    server,
    {
        cors: {
            origin: "*",
        },
    },
);

io.on("connection", async (socket) =>
{
    const socket_data_str = socket.handshake.query.player_initial_data;

    try
    {
        const socket_data_obj = JSON.parse(socket_data_str as string);
        socket.data = socket_data_obj;
        socket.broadcast.emit("server:player-join", socket.data);

        const sockets = await io.fetchSockets();

        const players_data = sockets.map((e) => e.data).filter((e) => e._id !== socket.data._id);
        socket.emit("server:game:send-gamestate", players_data);
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
        socket.data.spacial = spacial_data;

        socket.broadcast.emit("server:game:broadcast-player-movement", {
            player_id: socket.data._id,
            spacial: socket.data.spacial,
        });
    });

    socket.on("client:game:player:info", (info_data) =>
    {
        socket.data.info = info_data;

        socket.broadcast.emit("server:game:broadcast-player-info", {
            player_id: socket.data._id,
            info: socket.data.info,
        });
    });

    socket.on("client:game:player:chat", (chat_data) =>
    {
        socket.data.chat = chat_data;

        socket.broadcast.emit("server:game:broadcast-player-chat", {
            player_id: socket.data._id,
            chat: socket.data.chat,
        });
    });

    socket.on("client:chat:send-message-global", ({ message }) =>
    {
        socket.broadcast.emit("server:chat:send-message-global", {
            from_player_id: socket.data._id,
            message: message,
        });
    });

    socket.on("client:chat:send-message-to-player", async ({ to_player_id, message }) =>
    {
        const sockets = await io.fetchSockets();

        const player_socket = sockets.find((s) => s.data._id == to_player_id);
        if (!player_socket) return;

        player_socket.emit("server:chat:send-message-to-player", {
            from_player_id: socket.data._id,
            message: message,
        });
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
    console.log("Socket Service running on port " + PORT);
});
