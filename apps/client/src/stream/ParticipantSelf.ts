import { Participant } from "./Participant";
import { request_microphone_track, request_screenshare_track, request_webcam_track } from "./utils";

export default class ParticipantSelf extends Participant
{
    async toggle_screenshare(on: boolean)
    {
        if (!on)
        {
            this._toggle_screenshare(null);
        }
        else
        {
            try
            {
                const track = await request_screenshare_track();
                this._toggle_screenshare(track);

                track.onended = () => this._toggle_screenshare(null);
            }
            catch (_e)
            {
                console.warn(_e);
                // this.on_screenshare_share_lists.forEach((cb) => cb(false));
                this._toggle_screenshare(null);
                alert("Error accessing screenshare.\nPlease check permissions.");
            }
        }
    }

    async toggle_webcam(on: boolean)
    {
        if (!on)
        {
            this._toggle_webcam(null);
        }
        else
        {
            try
            {
                const track = await request_webcam_track();
                this._toggle_webcam(track);
            }
            catch (_e)
            {
                console.warn(_e);
                this._toggle_webcam(null);
                alert("Error accessing webcam.\nPlease check permissions.");
            }
        }
    }

    async toggle_microphone(on: boolean)
    {
        if (!on)
        {
            this._toggle_microphone(null);
        }
        else
        {
            try
            {
                const track = await request_microphone_track();
                this._toggle_microphone(track);
            }
            catch (_e)
            {
                console.warn(_e);
                this._toggle_microphone(null);
                alert("Error accessing microphone.\nPlease check permissions.");
            }
        }
    }
}
