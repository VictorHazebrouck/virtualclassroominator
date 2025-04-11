import { BiX } from "react-icons/bi";
import { close_tab_panel } from "~/store/nav";

export interface PanelTitleProps
{
    title: string;
}
export function PanelTitle({ title }: PanelTitleProps)
{
    return (
        <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-medium text-white">{title}</h2>
            <button className="cursor-pointer" onClick={() => close_tab_panel()}>
                <BiX size={28} className="text-white" />
            </button>
        </div>
    );
}
