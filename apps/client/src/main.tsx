import { createRoot } from "react-dom/client";
import Main from "~/ui/main";
import "./app.css";
import "~/socket/init_socket_events";
import "~/socket/init_socket_emits";
import "~/stream/main";

createRoot(document.getElementById("root")!).render(<Main />);
