import { io, Socket as TSocket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "@repo/shared-types/socket";

const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER;

const Socket: TSocket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER);

export default Socket;
