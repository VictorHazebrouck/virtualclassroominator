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
        <div className={tm("relative h-full w-full", className)}>
            <div className="absolute flex h-fit max-h-full w-full flex-col-reverse overflow-y-scroll">
                {children}
            </div>
        </div>
    );
}
