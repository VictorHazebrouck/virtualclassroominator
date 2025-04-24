import type React from "react";
import { tm } from "~/utils/tm";

export interface ScrollAreaProps
{
    className?: string;
    scrollContainerClassName?: string;
    children: React.ReactNode;
}

export default function ScrollArea({
    children,
    className,
    scrollContainerClassName,
}: ScrollAreaProps)
{
    return (
        <div className={tm("relative h-full w-full", className)}>
            <div
                className={tm(
                    "absolute flex h-fit max-h-full w-full flex-col-reverse overflow-y-scroll",
                    scrollContainerClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
}
