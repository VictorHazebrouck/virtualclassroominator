import { io, Socket as TSocket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "@repo/shared-types/socket";

const SOCKET_SERVER = import.meta.env.VITE_SOCKETIO_SERVER;
const PATH_SOCKETIO = import.meta.env.VITE_SOCKETIO_SERVER_PATH;

const Socket: TSocket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER, {
    path: PATH_SOCKETIO,
});

export default Socket;
