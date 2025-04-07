type CallbackToggleTrack = {
    (on: true, track: MediaStreamTrack): void;
    (on: false, track?: undefined): void;
};

export class Participant
{
    _id: string;

    constructor(player_id: string)
    {
        this._id = player_id;
    }

    stream = new MediaStream();

    microphone_track?: MediaStreamTrack;
    webcam_track?: MediaStreamTrack;
    screenshare_track?: MediaStreamTrack;

    private on_microphone_share_lists: CallbackToggleTrack[] = [];
    private on_webcam_share_lists: CallbackToggleTrack[] = [];
    private on_screenshare_share_lists: CallbackToggleTrack[] = [];

    /** @returns - cleanup function */
    on_microphone_share(cb: CallbackToggleTrack)
    {
        this.on_microphone_share_lists.push(cb);
        return () => this.off_microphone_share(cb);
    }
    /** @returns - cleanup function */
    on_webcam_share(cb: CallbackToggleTrack)
    {
        this.on_webcam_share_lists.push(cb);
        return () => this.off_webcam_share(cb);
    }
    /** @returns - cleanup function */
    on_screenshare_share(cb: CallbackToggleTrack)
    {
        this.on_screenshare_share_lists.push(cb);
        return () => this.off_screenshare_share(cb);
    }

    off_microphone_share(cb: CallbackToggleTrack)
    {
        this.on_microphone_share_lists = this.on_microphone_share_lists.filter((e) => e !== cb);
    }
    off_webcam_share(cb: CallbackToggleTrack)
    {
        this.on_webcam_share_lists = this.on_webcam_share_lists.filter((e) => e !== cb);
    }
    off_screenshare_share(cb: CallbackToggleTrack)
    {
        this.on_screenshare_share_lists = this.on_screenshare_share_lists.filter((e) => e !== cb);
    }

    protected _toggle_screenshare(on: boolean, track?: MediaStreamTrack)
    {
        if (!on)
        {
            if (this.screenshare_track)
            {
                this.screenshare_track.stop();
                this.stream.removeTrack(this.screenshare_track);
            }
            this.screenshare_track = undefined;
            this.on_screenshare_share_lists.forEach((cb) => cb(false));
        }
        else if (on && track)
        {
            this.screenshare_track = track;
            this.stream.addTrack(this.screenshare_track);
            this.on_screenshare_share_lists.forEach((cb) => cb(true, track));
        }
    }

    protected _toggle_webcam(on: boolean, track?: MediaStreamTrack)
    {
        if (!on)
        {
            if (this.webcam_track)
            {
                this.webcam_track.stop();
                this.stream.removeTrack(this.webcam_track!);
            }
            this.webcam_track = undefined;
            this.on_webcam_share_lists.forEach((cb) => cb(false));
        }
        else if (on && track)
        {
            this.webcam_track = track;
            this.stream.addTrack(this.webcam_track);
            this.on_webcam_share_lists.forEach((cb) => cb(true, track));
        }
    }

    protected _toggle_microphone(on: boolean, track?: MediaStreamTrack)
    {
        if (!on)
        {
            if (this.microphone_track)
            {
                this.microphone_track.stop();
                this.stream.removeTrack(this.microphone_track);
            }
            this.microphone_track = undefined;
            this.on_microphone_share_lists.forEach((cb) => cb(false));
        }
        else if (on && track)
        {
            this.microphone_track = track;
            this.stream.addTrack(this.microphone_track);
            this.on_microphone_share_lists.forEach((cb) => cb(true, track));
        }
    }
}
