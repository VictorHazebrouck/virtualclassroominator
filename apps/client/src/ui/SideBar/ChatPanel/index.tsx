import { useStore } from "@nanostores/react";
import { $current_conversation } from "~/store/nav";
import Conversation from "./Conversastion";
import ConversationList from "./ConversationList";

export default function ChatPanel()
{
    const current_conversation = useStore($current_conversation);

    return current_conversation ? <Conversation /> : <ConversationList />;
}
