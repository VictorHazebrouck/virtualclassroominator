import {
    $player_self,
    player_self_toggle_microphone,
    player_self_toggle_screenshare,
    player_self_toggle_webcam,
} from "~/store/player_self";
import ParticipantSelf from "./ParticipantSelf";
import { P2P } from "./p2p/main";
import { $nearby_players_ids } from "~/store/nearby_players";
import { ParticipantsOther } from "./ParticipantOther";

class ConversationManagerClass
{
    participant_self: ParticipantSelf;
    participants_other = new ParticipantsOther();

    mode: "p2p" | "sfu" = "p2p";
    p2p_client: P2P;
    sfu_client = null;

    constructor(self_id: string)
    {
        this.participant_self = new ParticipantSelf(self_id);
        this.p2p_client = new P2P(this.participant_self, this.participants_other);
    }

    call_users_by_ids(new_user_ids: string[])
    {
        const old_user_ids = this.participants_other.get_participants_ids();
        for (const old_user_id of old_user_ids)
        {
            if (!new_user_ids.includes(old_user_id))
            {
                this.participants_other.remove_participant_by_id(old_user_id);
            }
        }

        for (const new_user_id of new_user_ids)
        {
            if (!old_user_ids.includes(new_user_id))
            {
                this.participants_other.add_or_set_participant_by_id(new_user_id);
                this.p2p_client.call_user_by_id(new_user_id);
            }
        }
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
