import React, { useEffect, useRef } from "react";
import { tm } from "~/utils/tm";

export interface ModalProps
{
    children: React.ReactNode;
    visible: boolean;
    onClickOutside?: () => void;
    style?: React.CSSProperties;
    className?: string;
}

export default function Modal({ children, visible, onClickOutside, style, className }: ModalProps)
{
    const ref = useRef<HTMLDivElement>(null);

    function handleClickOutside(e: MouseEvent)
    {
        if (ref.current && !ref.current.contains(e.target as Node) && onClickOutside)
        {
            onClickOutside();
        }
    }

    useEffect(() =>
    {
        document.addEventListener("click", handleClickOutside, true);
        return () =>
        {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return visible ? (
        <div
            ref={ref}
            style={style}
            className={tm("absolute rounded-lg bg-gray-900 px-4 py-2", className)}
        >
            {children}
        </div>
    ) : (
        <></>
    );
}
