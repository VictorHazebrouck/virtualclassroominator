import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $conversations_preview } from "~/store/conversations";

export default function ChatPanel()
{
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

    return !selectedConversation ? (
        <ConversationList onSelectConversation={(id) => setSelectedConversation(id)} />
    ) : (
        <Conversation onClickGoBack={() => setSelectedConversation(null)} />
    );
}

function ConversationList({
    onSelectConversation,
}: {
    onSelectConversation: (id: string) => void;
})
{
    const conversations_preview = useStore($conversations_preview);

    return (
        <div className="flex h-full w-full flex-col gap-6">
            {conversations_preview.map((e) => (
                <button
                    key={e._id}
                    className="flex w-full cursor-pointer flex-col rounded-lg bg-gray-800 px-4 py-2"
                    onClick={() => onSelectConversation(e._id)}
                >
                    <h6 className="text-stone-100">{e.participants[0]?.info.name || "unknown"}</h6>
                    <p className="text-stone-400">{e.last_message?.message}</p>
                </button>
            ))}
        </div>
    );
}

type ConversationProps = {
    onClickGoBack: () => void;
};
function Conversation({ onClickGoBack }: ConversationProps)
{
    return (
        <div className="flex h-full w-full flex-col text-white">
            <div onClick={() => onClickGoBack()}>
                <p>go back</p>
            </div>
            <div>nananan</div>
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
