import { useStore } from "@nanostores/react";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { new_message_from_self } from "~/store/conversations";
import { $current_conversation, close_conversation } from "~/store/nav";
import { $player_self } from "~/store/player_self";
import TextInputWithButton from "~/ui/-components/TextInputWithButton";
import TextWithStatusTag from "~/ui/-components/TextWithStatus";
import { get_display_date_from_uuidv7 } from "~/utils/date";
import { tm } from "~/utils/tm";

export default function Conversation()
{
    const current_conversation = useStore($current_conversation);
    const [message, set_message] = useState("");
    const my_id = $player_self.get()._id;

    if (!current_conversation) return;
    const { messages, receiver } = current_conversation;

    function handle_click_send_message()
    {
        new_message_from_self(current_conversation!.receiver_id, message);
    }

    return (
        <div className="flex h-full w-full max-w-full flex-col justify-end gap-4 text-white">
            <div className="mb-auto -ml-2 flex w-full gap-4">
                <button className="cursor-pointer" onClick={() => close_conversation()}>
                    <BiChevronLeft size={28} className="text-white" />
                </button>

                <div className="flex w-full items-center justify-center">
                    <TextWithStatusTag
                        text_classname="text-lg font-medium"
                        text={receiver.info.name}
                        status={receiver.info.status}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {messages.map(({ _id, sender, message }) => (
                    <Message
                        key={_id}
                        _id={_id}
                        is_from_self={sender == my_id}
                        message={message}
                        sender={sender}
                    />
                ))}
            </div>

            <TextInputWithButton
                value={message}
                on_change_text={(e) => set_message(e)}
                placeholder="new message..."
                button_content="send"
                on_click={handle_click_send_message}
            />
        </div>
    );
}

interface MessageProps
{
    _id: string;
    message: string;
    sender: string;
    is_from_self: boolean;
}
function Message({ _id, is_from_self, message }: MessageProps)
{
    const date = get_display_date_from_uuidv7(_id);

    return (
        <div className={tm("flex flex-col gap-1", is_from_self ? "self-end" : "self-start")}>
            <p className="text-sm text-slate-500">{date}</p>
            <p
                className={tm(
                    "flex flex-col rounded-md px-3 py-1",
                    is_from_self ? "self-end bg-gray-800" : "self-start bg-indigo-500",
                )}
            >
                {message}
            </p>
        </div>
    );
}
