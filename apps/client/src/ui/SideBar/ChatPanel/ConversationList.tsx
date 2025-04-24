import { useStore } from "@nanostores/react";
import { $conversations_preview } from "~/store/conversations";
import { PanelTitle } from "../-components";
import ScrollArea from "~/ui/-components/ScrollArea";
import PlayerCard from "~/ui/-components/PlayerCard";
import { camera_focus_player_by_id, open_conversation } from "~/store/nav";

export default function ConversationList()
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
                <div className="shrink-0"></div>
                <div className="flex flex-col-reverse gap-2">
                    {conversations_preview.map(({ participant, last_message }) => (
                        <PlayerCard
                            key={participant!._id}
                            player_info={participant!}
                            on_click_card={() => open_conversation(participant!._id)}
                            on_click_avatar={() => handle_click_avatar(participant!._id)}
                        >
                            <p className="mr-2 w-full overflow-hidden text-start text-nowrap text-stone-400">
                                {last_message?.message}
                            </p>
                        </PlayerCard>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
