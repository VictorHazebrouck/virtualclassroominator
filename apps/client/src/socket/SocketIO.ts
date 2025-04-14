import { io, Socket as TSocket } from "socket.io-client";
import type { ClientToServerEvents } from "@repo/shared-types/client-events";
import type { ServerToClientEvents } from "@repo/shared-types/server-events";
import { $player_self } from "~/store/player_self";

const SOCKET_SERVER = import.meta.env.VITE_SOCKETIO_SERVER;
const PATH_SOCKETIO = import.meta.env.VITE_SOCKETIO_SERVER_PATH;

const Socket: TSocket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER, {
    path: PATH_SOCKETIO,
    autoConnect: false,
    query: {
        player_initial_data: JSON.stringify($player_self.get()),
    },
});

export default Socket;
