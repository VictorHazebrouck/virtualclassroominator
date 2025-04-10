import "~/stream";
import "./app.css";
import "~/socket/init_socket_events";
import "~/socket/init_socket_emits";
import Socket from "~/socket/SocketIO";
import { createRoot } from "react-dom/client";
import Main from "~/ui/main";

setTimeout(() => Socket.connect(), 1000);

createRoot(document.getElementById("root")!).render(<Main />);
