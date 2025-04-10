import type { SocketData } from "@repo/shared-types/socket";
import { COLOR_MAP } from "~/constants";
type ConnectionStatus = SocketData["info"]["status"];

export interface StatusTagProps
{
    status: ConnectionStatus;
    size?: "small";
}

export default function StatusTag({ status, size = "small" }: StatusTagProps)
{
    const size_map = {
        small: "h-2 w-2",
    };

    return (
        <div
            className={`${size_map[size]} rounded-full`}
            style={{ backgroundColor: COLOR_MAP[status] }}
        ></div>
    );
}
