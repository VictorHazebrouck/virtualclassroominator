import {
    $player_self,
    player_self_toggle_microphone,
    player_self_toggle_screenshare,
    player_self_toggle_webcam,
} from "~/store/player_self";
import ParticipantSelf from "./ParticipantSelf";
import { P2P } from "./p2p/main";

class ConversationManagerClass
{
    participant_self: ParticipantSelf;
    p2pclient: P2P;

    constructor(self_id: string)
    {
        this.p2pclient = new P2P(self_id);
        this.participant_self = new ParticipantSelf(self_id);
    }
}

export const ConversationManager = new ConversationManagerClass($player_self.get()._id);
const participant_self = ConversationManager.participant_self;

participant_self.on_screenshare_share((on) => player_self_toggle_screenshare(on));
participant_self.on_microphone_share((on) => player_self_toggle_microphone(on));
participant_self.on_webcam_share((on) => player_self_toggle_webcam(on));
