import { io, Socket as TSocket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "@repo/shared-types/socket";
// import type { ManagerOptions, SocketOptions } from "node_modules/socket.io-client/build/cjs";

const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER;

// const URL_SOCKETIO = import.meta.env.VITE_SOCKETIO_BACKEND_URL;
// const PATH_SOCKETIO = import.meta.env.VITE_SOCKETIO_SERVER_PATH;
// const IS_SECURE_SOCKETIO = import.meta.env.VITE_SOCKETIO_SERVER_IS_SECURE == "true";
// const PORT_SOCKETIO = import.meta.env.VITE_SOCKETIO_SERVER_PORT;

// let options: ManagerOptions = { pa };
const Socket: TSocket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER);

export default Socket;
