import { ParticipantSelf } from "./ParticipantSelf";

class ConversationManagerClass
{
    participant_self: ParticipantSelf;

    constructor()
    {
        this.participant_self = new ParticipantSelf();
    }
}

export const ConversationManager = new ConversationManagerClass();
