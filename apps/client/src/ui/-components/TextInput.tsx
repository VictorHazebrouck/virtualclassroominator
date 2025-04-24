import { tm } from "~/utils/tm";

export interface TextInputProps
{
    value: string;
    on_change_text: (text: string) => void;
    on_key_enter?: () => void;
    placeholder: string;
    className?: string;
}
export default function TextInput({
    value,
    on_change_text,
    on_key_enter,
    placeholder,
    className,
}: TextInputProps)
{
    return (
        <input
            className={tm("w-48 rounded-md px-3 py-1 text-zinc-400", className)}
            value={value}
            onChange={(e) => on_change_text(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && on_key_enter?.()}
            placeholder={placeholder}
        />
    );
}
