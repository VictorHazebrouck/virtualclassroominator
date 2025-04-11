import { useStore } from "@nanostores/react";
import { $conversations_preview, new_message_from_self } from "~/store/conversations";
import { $current_conversation, close_conversation, open_conversation } from "~/store/nav";
import TextInput from "../-components/TextInput";
import { useState } from "react";
import { $player_self } from "~/store/player_self";
import { tm } from "~/utils/tm";
import TextWithStatusTag from "../-components/TextWithStatus";

export default function ChatPanel()
{
    const current_conversation = useStore($current_conversation);

    return !current_conversation ? <ConversationList /> : <Conversation />;
}

function ConversationList()
{
    const conversations_preview = useStore($conversations_preview);

    return (
        <div className="flex h-full w-full flex-col gap-6">
            {conversations_preview.map((e) => (
                <button
                    key={e.participant?._id}
                    className="flex w-full cursor-pointer flex-col rounded-lg bg-gray-800 px-4 py-2"
                    onClick={() => open_conversation(e.participant!._id)}
                >
                    <h6 className="text-stone-100">{e.participant?.info.name || "unknown"}</h6>
                    <p className="text-stone-400">{e.last_message?.message}</p>
                </button>
            ))}
        </div>
    );
}

function Conversation()
{
    const current_conversation = useStore($current_conversation);
    const [message, set_message] = useState("");
    const my_id = $player_self.get()._id;

    if (!current_conversation) return;
    const { messages, receiver } = current_conversation;

    return (
        <div className="flex h-full w-full flex-col justify-end text-white">
            <div className="mb-auto flex justify-between">
                <div className="flex">
                    <TextWithStatusTag
                        text_classname="text-lg font-medium"
                        text={receiver.info.name}
                        status={receiver.info.status}
                    />
                </div>
                <button onClick={() => close_conversation()}>
                    <p>go back</p>
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {messages.map(({ _id, sender, message }) => (
                    <p key={_id} className={tm(sender == my_id ? "self-end" : "self-start")}>
                        {message}
                    </p>
                ))}
            </div>

            <div className="flex w-fit">
                <TextInput
                    className="w-full"
                    value={message}
                    on_change_text={(e) => set_message(e)}
                    placeholder="new message..."
                />
                <button
                    className="cursor-pointer px-3 py-1 text-zinc-100"
                    onClick={() => new_message_from_self(current_conversation.receiver_id, message)}
                >
                    send
                </button>
            </div>
        </div>
    );
}

// function Message()
// {
//     return (
//         <div>
//             <h5></h5>
//         </div>
//     );
// }
