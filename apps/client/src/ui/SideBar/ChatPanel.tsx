import { useStore } from "@nanostores/react";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { $conversations_preview, new_message_from_self } from "~/store/conversations";
import {
    $current_conversation,
    camera_focus_player_by_id,
    close_conversation,
    open_conversation,
} from "~/store/nav";
import { $player_self } from "~/store/player_self";
import { tm } from "~/utils/tm";
import TextInput from "../-components/TextInput";
import TextWithStatusTag from "../-components/TextWithStatus";
import { PanelTitle } from "./-components";
import PlayerCard from "../-components/PlayerCard";
import ScrollArea from "../-components/ScrollArea";
import { get_display_date_from_uuidv7 } from "~/utils/date";

export default function ChatPanel()
{
    const current_conversation = useStore($current_conversation);

    return !current_conversation ? <ConversationList /> : <Conversation />;
}

function ConversationList()
{
    const conversations_preview = useStore($conversations_preview);

    function handle_click_avatar(player_id: string)
    {
        camera_focus_player_by_id(player_id);
    }

    return (
        <div className="flex h-full w-full flex-col gap-2">
            <PanelTitle title="Conversations" />
            <ScrollArea>
                <div className="flex flex-col gap-2">
                    {conversations_preview.map(({ participant, last_message }) => (
                        <PlayerCard
                            key={participant!._id}
                            player_info={participant!}
                            on_click_card={() => open_conversation(participant!._id)}
                            on_click_avatar={() => handle_click_avatar(participant!._id)}
                        >
                            <p className="text-stone-400">{last_message?.message}</p>
                        </PlayerCard>
                    ))}
                </div>
            </ScrollArea>
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
        <div className={tm("flex flex-col", is_from_self ? "self-end" : "self-start")}>
            <p>{date}</p>
            <p>{message}</p>
        </div>
    );
}
