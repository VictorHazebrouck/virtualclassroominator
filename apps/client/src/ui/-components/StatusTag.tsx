import type { TPlayerInfoStatus } from "@repo/shared-types/common";
import { COLOR_MAP } from "~/constants";

export interface StatusTagProps
{
    status: TPlayerInfoStatus;
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
