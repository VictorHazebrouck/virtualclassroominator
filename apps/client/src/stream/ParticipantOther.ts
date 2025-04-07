import { Participant } from "./Participant";

export class ParticipantOther extends Participant
{
    toggle_webcam = this._toggle_webcam;
    toggle_microphone = this._toggle_microphone;
    toggle_screenshare = this._toggle_screenshare;
}
