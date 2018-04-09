export class Product {
    id: number;
    name: string;
    img: string;
    duration: number;
    limit: number;
    isWarning: boolean;
    isTimerRunning: boolean;
    isClicked: boolean;
    // uuid: string;
    start_time: number;
    // start_time_text: string;
    end_time: number;
    // end_time_text: string;
    displayed_item: number;
    wasted_item: number;
    left_time: number;
    notify = [];

    constructor(value: Object = {}) {
        Object.assign(this, value);
        // this.lefttime = this.duration;
        for( let i=1; i <= this.duration * 60; i++ ) {
            this.notify.push(i);
        }
    }

    public calculateLeftTime(): void {
        let now = new Date().getTime();
        if ((this.end_time > now) && (this.isTimerRunning)) {
            this.left_time = Math.floor((this.end_time - now) / 1000);
            // console.log("Now: ", now);
            // console.log("isTimerRunning: ", this.isTimerRunning);
        }
    }

    public calculateStartEndTime(): void {
        this.start_time = new Date().getTime();
        this.end_time = new Date(this.start_time + this.duration * 60 * 1000).getTime();
    }
}
