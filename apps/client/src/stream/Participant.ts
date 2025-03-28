type CallbackToggleTrack = {
    (on: true, track: MediaStreamTrack): void;
    (on: false, track?: undefined): void;
};

export class Participant
{
    stream = new MediaStream();

    microphone_track?: MediaStreamTrack;
    webcam_track?: MediaStreamTrack;
    screenshare_track?: MediaStreamTrack;

    on_microphone_share_lists: CallbackToggleTrack[] = [];
    on_webcam_share_lists: CallbackToggleTrack[] = [];
    on_screenshare_share_lists: CallbackToggleTrack[] = [];

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
        this.on_microphone_share_lists.filter((e) => e !== cb);
    }
    off_webcam_share(cb: CallbackToggleTrack)
    {
        this.on_webcam_share_lists.filter((e) => e !== cb);
    }
    off_screenshare_share(cb: CallbackToggleTrack)
    {
        this.on_screenshare_share_lists.filter((e) => e !== cb);
    }
}
