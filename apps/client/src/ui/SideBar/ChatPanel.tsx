import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $conversations_preview } from "~/store/conversations";

export default function ChatPanel()
{
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

    return (
        <div className="h-full w-full">
            {!selectedConversation && (
                <ConversationList onSelectConversation={(id) => setSelectedConversation(id)} />
            )}
            {selectedConversation && (
                <Conversation onClickGoBack={() => setSelectedConversation(null)} />
            )}
        </div>
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
        <div className="flex flex-col h-full w-full gap-6">
            {conversations_preview.map((e) => (
                <button
                    key={e._id}
                    className="flex flex-col w-full bg-gray-800 py-2 px-4 rounded-lg cursor-pointer"
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
        <div className="flex flex-col h-full w-full text-white">
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
