import { tm } from "~/utils/tm";
import type { StatusTagProps } from "./StatusTag";
import StatusTag from "./StatusTag";

export interface TextWithStatusTagProps extends StatusTagProps
{
    text: string;
    text_classname?: string;
}

export default function TextWithStatusTag({
    text,
    text_classname,
    ...props
}: TextWithStatusTagProps)
{
    return (
        <div className="flex gap-1">
            <p className={tm("pt-[1px] text-sm text-slate-200", text_classname)}>{text}</p>
            <StatusTag {...props} />
        </div>
    );
}
