import { $player_self } from "~/store/player_self";
import { ParticipantSelf } from "./ParticipantSelf";
import { subscribeKeys } from "nanostores";

class ConversationManagerClass
{
    participant_self = ParticipantSelf;

    constructor()
    {}
}

subscribeKeys($player_self, ["chat"], (data) =>
{
    const { is_mike_active, is_screensharing, is_webcam_active } = data.chat;

    ParticipantSelf.toggle_webcam(is_webcam_active);
    ParticipantSelf.toggle_microphone(is_mike_active);
    ParticipantSelf.toggle_screenshare(is_screensharing);
});

export const ConversationManager = new ConversationManagerClass();
