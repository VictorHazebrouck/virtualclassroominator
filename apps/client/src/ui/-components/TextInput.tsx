import { tm } from "~/utils/tm";

interface TextInputProps
{
    value: string;
    on_change_text: (text: string) => void;
    placeholder: string;
    className?: string;
}
export default function TextInput({
    value,
    on_change_text,
    placeholder,
    className,
}: TextInputProps)
{
    return (
        <input
            className={tm("rounded-md px-3 py-1 text-zinc-400", className)}
            value={value}
            onChange={(e) => on_change_text(e.target.value)}
            placeholder={placeholder}
        />
    );
}
