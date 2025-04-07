import {
    $player_self,
    player_self_toggle_microphone,
    player_self_toggle_screenshare,
    player_self_toggle_webcam,
} from "~/store/player_self";
import ParticipantSelf from "./ParticipantSelf";
import { P2P } from "./p2p/main";
import { $nearby_players_ids } from "~/store/nearby_players";

class ConversationManagerClass
{
    participant_self: ParticipantSelf;
    p2p_client: P2P;
    sfu_client = null;

    constructor(self_id: string)
    {
        this.participant_self = new ParticipantSelf(self_id);
        this.p2p_client = new P2P(self_id, this.participant_self);
    }

    call_users_by_ids(user_ids: string[])
    {
        this.p2p_client.call_many_by_ids(user_ids);
    }

    join_room_by_id()
    {}

    leave_room_by_id()
    {}
}

export const ConversationManager = new ConversationManagerClass($player_self.get()._id);
const participant_self = ConversationManager.participant_self;

participant_self.on_screenshare_share((track) => player_self_toggle_screenshare(Boolean(track)));
participant_self.on_microphone_share((track) => player_self_toggle_microphone(Boolean(track)));
participant_self.on_webcam_share((track) => player_self_toggle_webcam(Boolean(track)));

$nearby_players_ids.subscribe((user_ids) =>
{
    ConversationManager.call_users_by_ids(user_ids as string[]);
});
