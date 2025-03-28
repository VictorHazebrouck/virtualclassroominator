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
            this.screenshare_track.stop();
            this.stream.removeTrack(this.screenshare_track);
            this.screenshare_track = undefined;
            this.on_screenshare_share_lists.forEach((cb) => cb(false));
        }
        else if (on)
        {
            try
            {
                const track = await request_screenshare_track();
                this.screenshare_track = track;
                this.stream.addTrack(this.screenshare_track);
                this.on_screenshare_share_lists.forEach((cb) => cb(true, track));
            }
            catch (_e)
            {
                console.warn(_e);
                this.on_screenshare_share_lists.forEach((cb) => cb(false));
            }
        }
    }

    async toggle_webcam(on: boolean)
    {
        if (!on && this.webcam_track)
        {
            this.webcam_track.stop();
            this.stream.removeTrack(this.webcam_track!);
            this.webcam_track = undefined;
            this.on_webcam_share_lists.forEach((cb) => cb(false));
        }
        else if (on)
        {
            try
            {
                const track = await request_webcam_track();
                this.webcam_track = track;
                this.stream.addTrack(this.webcam_track);
                this.on_webcam_share_lists.forEach((cb) => cb(true, track));
            }
            catch (_e)
            {
                console.warn(_e);
                this.on_webcam_share_lists.forEach((cb) => cb(false));
            }
        }
    }

    async toggle_microphone(on: boolean)
    {
        if (!on && this.microphone_track)
        {
            this.microphone_track.stop();
            this.stream.removeTrack(this.microphone_track);
            this.microphone_track = undefined;
            this.on_microphone_share_lists.forEach((cb) => cb(false));
        }
        else if (on)
        {
            try
            {
                const track = await request_microphone_track();
                this.microphone_track = track;
                this.stream.addTrack(this.microphone_track);
                this.on_microphone_share_lists.forEach((cb) => cb(true, track));
            }
            catch (_e)
            {
                console.warn(_e);
                this.on_microphone_share_lists.forEach((cb) => cb(false));
            }
        }
    }
}

export const ParticipantSelf = new ParticipantSelfClass();
