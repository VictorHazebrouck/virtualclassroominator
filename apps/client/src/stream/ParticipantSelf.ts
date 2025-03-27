import { subscribeKeys } from "nanostores";
import { request_microphone_track, request_screenshare_track, request_webcam_track } from "./utils";
import {
    $player_self,
    player_self_toggle_microphone,
    player_self_toggle_screenshare,
    player_self_toggle_webcam,
} from "~/store/player_self";

export class ParticipantSelf
{
    my_id = $player_self.get()._id;
    stream = new MediaStream();

    microphone_track?: MediaStreamTrack;
    webcam_track?: MediaStreamTrack;
    screenshare_track?: MediaStreamTrack;

    is_webcam_microphone_loading = false;

    constructor()
    {
        subscribeKeys($player_self, ["chat"], (self_data) =>
        {
            const { is_mike_active, is_screensharing, is_webcam_active } = self_data.chat;

            this.toggle_microphone(is_mike_active);
            this.toggle_webcam(is_webcam_active);
            this.toggle_screenshare(is_screensharing);
        });
    }

    async toggle_screenshare(on: boolean)
    {
        if (!on && this.screenshare_track)
        {
            this.screenshare_track.stop();
            this.stream.removeTrack(this.screenshare_track);
            this.screenshare_track = undefined;
        }
        else if (on)
        {
            try
            {
                const track = await request_screenshare_track();
                this.screenshare_track = track;
                this.stream.addTrack(this.screenshare_track);
            }
            catch (_e)
            {
                player_self_toggle_screenshare();
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
        }
        else if (on)
        {
            try
            {
                const track = await request_webcam_track();
                this.webcam_track = track;
                this.stream.addTrack(this.webcam_track);
            }
            catch (_e)
            {
                player_self_toggle_webcam();
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
        }
        else if (on)
        {
            try
            {
                const track = await request_microphone_track();
                this.microphone_track = track;
                this.stream.addTrack(this.microphone_track);
            }
            catch (_e)
            {
                player_self_toggle_microphone();
            }
        }
    }
}
