import { io, Socket as TSocket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "@repo/shared-types/socket";
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
