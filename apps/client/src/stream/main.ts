import { request_microphone_track, request_screenshare_track, request_webcam_track } from "./utils";

export class Participant
{
    stream = new MediaStream();

    microphone_track?: MediaStreamTrack;
    webcam_track?: MediaStreamTrack;
    screenshare_track?: MediaStreamTrack;

    async toggle_screenshare()
    {
        if (this.screenshare_track)
        {
            this.stream.removeTrack(this.screenshare_track);
            this.screenshare_track = undefined;
        }
        else
        {
            const track = await request_screenshare_track();
            this.screenshare_track = track;
            this.stream.addTrack(this.screenshare_track);
        }
    }

    async toggle_webcam()
    {
        if (this.webcam_track)
        {
            this.stream.removeTrack(this.webcam_track);
            this.webcam_track = undefined;
        }
        else
        {
            const track = await request_webcam_track();
            this.webcam_track = track;
            this.stream.addTrack(this.webcam_track);
        }
    }

    async toggle_microphone()
    {
        if (this.microphone_track)
        {
            this.stream.removeTrack(this.microphone_track);
            this.microphone_track = undefined;
        }
        else
        {
            const track = await request_microphone_track();
            this.microphone_track = track;
            this.stream.addTrack(this.microphone_track);
        }
    }

    request_microphone_and_audio_access()
    {}
}
