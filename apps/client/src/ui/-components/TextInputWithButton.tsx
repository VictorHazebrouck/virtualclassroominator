import type React from "react";
import type { TextInputProps } from "./TextInput";
import TextInput from "./TextInput";

export interface TextInputWithButtonProps extends TextInputProps
{
    on_click: () => void;
    button_content: React.ReactNode | string;
}

export default function TextInputWithButton({
    on_click,
    button_content,
    ...props
}: TextInputWithButtonProps)
{
    return (
        <div className="flex w-full max-w-full">
            <TextInput {...props} />
            <button className="cursor-pointer px-3 py-1 text-zinc-100" onClick={on_click}>
                {button_content}
            </button>
        </div>
    );
}
