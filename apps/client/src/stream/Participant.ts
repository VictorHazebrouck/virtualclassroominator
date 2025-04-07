type CallbackToggleTrack = (track: MediaStreamTrack | null) => void;

export class Participant
{
    _id: string;

    constructor(player_id: string)
    {
        this._id = player_id;
    }

    readonly stream = new MediaStream();

    microphone_track: MediaStreamTrack | null = null;
    webcam_track: MediaStreamTrack | null = null;
    screenshare_track: MediaStreamTrack | null = null;

    private on_microphone_share_listeners: CallbackToggleTrack[] = [];
    private on_webcam_share_listeners: CallbackToggleTrack[] = [];
    private on_screenshare_share_listeners: CallbackToggleTrack[] = [];

    /** @returns - cleanup function */
    on_microphone_share(cb: CallbackToggleTrack)
    {
        this.on_microphone_share_listeners.push(cb);
        return () => this.off_microphone_share(cb);
    }
    /** @returns - cleanup function */
    on_webcam_share(cb: CallbackToggleTrack)
    {
        this.on_webcam_share_listeners.push(cb);
        return () => this.off_webcam_share(cb);
    }
    /** @returns - cleanup function */
    on_screenshare_share(cb: CallbackToggleTrack)
    {
        this.on_screenshare_share_listeners.push(cb);
        return () => this.off_screenshare_share(cb);
    }

    off_microphone_share(cb: CallbackToggleTrack)
    {
        this.on_microphone_share_listeners = this.on_microphone_share_listeners.filter(
            (e) => e !== cb,
        );
    }
    off_webcam_share(cb: CallbackToggleTrack)
    {
        this.on_webcam_share_listeners = this.on_webcam_share_listeners.filter((e) => e !== cb);
    }
    off_screenshare_share(cb: CallbackToggleTrack)
    {
        this.on_screenshare_share_listeners = this.on_screenshare_share_listeners.filter(
            (e) => e !== cb,
        );
    }

    /** removes all listeners attached to the Participant */
    cleanup()
    {
        this.on_microphone_share_listeners.forEach((cb) => this.off_microphone_share(cb));
        this.on_webcam_share_listeners.forEach((cb) => this.off_webcam_share(cb));
        this.on_screenshare_share_listeners.forEach((cb) => this.off_screenshare_share(cb));
    }

    protected _toggle_screenshare(track: MediaStreamTrack | null)
    {
        if (!track)
        {
            if (this.screenshare_track)
            {
                this.screenshare_track.stop();
                this.stream.removeTrack(this.screenshare_track);
            }

            this.screenshare_track = null;
            this.on_screenshare_share_listeners.forEach((cb) => cb(null));
        }
        else
        {
            this.screenshare_track = track;
            this.stream.addTrack(this.screenshare_track);
            this.on_screenshare_share_listeners.forEach((cb) => cb(track));
        }
    }

    protected _toggle_webcam(track: MediaStreamTrack | null)
    {
        if (!track)
        {
            if (this.webcam_track)
            {
                this.webcam_track.stop();
                this.stream.removeTrack(this.webcam_track!);
            }

            this.webcam_track = null;
            this.on_webcam_share_listeners.forEach((cb) => cb(null));
        }
        else
        {
            this.webcam_track = track;
            this.stream.addTrack(this.webcam_track);
            this.on_webcam_share_listeners.forEach((cb) => cb(track));
        }
    }

    protected _toggle_microphone(track: MediaStreamTrack | null)
    {
        if (!track)
        {
            if (this.microphone_track)
            {
                this.microphone_track.stop();
                this.stream.removeTrack(this.microphone_track);
            }
            this.microphone_track = null;
            this.on_microphone_share_listeners.forEach((cb) => cb(null));
        }
        else
        {
            this.microphone_track = track;
            this.stream.addTrack(this.microphone_track);
            this.on_microphone_share_listeners.forEach((cb) => cb(track));
        }
    }
}
