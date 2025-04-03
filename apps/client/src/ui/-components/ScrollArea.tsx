import type React from "react";
import { tm } from "~/utils/tm";

export interface ScrollAreaProps
{
    className?: string;
    children: React.ReactNode;
}

export default function ScrollArea({ children, className }: ScrollAreaProps)
{
    return (
        <div className={tm("h-full w-full relative", className)}>
            <div className="h-fit w-full max-h-full absolute overflow-y-scroll">{children}</div>
        </div>
    );
}
