import { Participant } from "./Participant";
import { request_microphone_track, request_screenshare_track, request_webcam_track } from "./utils";

class ParticipantSelfClass extends Participant
{
    _id?: string;

    init(self_id: string)
    {
        this._id = self_id;
    }

    async toggle_screenshare(on: boolean)
    {
        if (!on && this.screenshare_track)
        {
            this._toggle_screenshare(false);
        }
        else if (on)
        {
            try
            {
                const track = await request_screenshare_track();
                this._toggle_screenshare(true, track);
            }
            catch (_e)
            {
                console.warn(_e);
                this.on_screenshare_share_lists.forEach((cb) => cb(false));
                alert("Error accessing screenshare.\nPlease check permissions.");
            }
        }
    }

    async toggle_webcam(on: boolean)
    {
        if (!on && this.webcam_track)
        {
            this._toggle_webcam(false);
        }
        else if (on)
        {
            try
            {
                const track = await request_webcam_track();
                this._toggle_webcam(true, track);
            }
            catch (_e)
            {
                console.warn(_e);
                this.on_webcam_share_lists.forEach((cb) => cb(false));
                alert("Error accessing webcam.\nPlease check permissions.");
            }
        }
    }

    async toggle_microphone(on: boolean)
    {
        if (!on && this.microphone_track)
        {
            this._toggle_microphone(false);
        }
        else if (on)
        {
            try
            {
                const track = await request_microphone_track();
                this._toggle_microphone(true, track);
            }
            catch (_e)
            {
                console.warn(_e);
                this.on_microphone_share_lists.forEach((cb) => cb(false));
                alert("Error accessing microphone.\nPlease check permissions.");
            }
        }
    }
}

export const ParticipantSelf = new ParticipantSelfClass();
