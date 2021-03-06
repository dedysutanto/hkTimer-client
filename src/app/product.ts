export class Product {
    id: number;
    name: string;
    img: string;
    duration: number;
    limit: number;
    isWarning: boolean;
    isTimerRunning: boolean;
    isClicked: boolean;
    isMainMenu: boolean;
    isMainMenuWarning: boolean = false;
    // uuid: string;
    start_time: number;
    // start_time_text: string;
    end_time: number;
    // end_time_text: string;
    displayed_item: number;
    wasted_item: number;
    left_time: number;
    level: number;
    main_menu_warning_end: number;
    notify = [];

    constructor(value: Object = {}) {
        Object.assign(this, value);
        // this.lefttime = this.duration;
        for (let i = 1; i <= this.duration * 60; i++) {
            this.notify.push(i);
        }
    }

    public checkIsWarning(): void {
        if ((this.isTimerRunning) && (this.left_time < this.limit * 60)) {
            this.isWarning = true;
        }
        // console.log("Limit: ", this.limit)
        // console.log("Duration: ", this.duration)
    }

    public checkIsMainMenuWarning(): void {
        const timerWarning = 900;
        // const timerWarning = 120;
        const timerRunning = 60;

        if ((this.isTimerRunning) && (!this.isWarning)) {
            // Do something here
            let isTime = this.left_time % timerWarning;

            if ((isTime == 0) && (this.left_time != (this.duration * 60))) {
                this.main_menu_warning_end = this.left_time - timerRunning;
                this.isMainMenuWarning = true;
            } else {
                if (this.main_menu_warning_end > this.left_time) {
                    this.isMainMenuWarning = false;
                }
            }

            // console.log("Warning Menu:", this.isMainMenuWarning);
            // console.log("Duration:", this.duration - timerRunning);
            // console.log("Time Left Main Menu:", this.main_menu_warning_end); 
            // console.log("Time Left:", this.left_time); 
                          
        }
    }

    public calculateLeftTime(): void {
        const now = new Date().getTime();
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

    public startCounter(): void {
        this.calculateStartEndTime();
        this.isClicked = true;
        this.isTimerRunning = true;
        this.left_time = this.duration;
        // console.log("Start Product ID: ", this.id)
    }

    public stopCounter(): void {
        this.isTimerRunning = false;
        this.isWarning = true;
        if (this.left_time !== 0) {
            this.end_time = this.start_time + (((this.duration * 60) - this.left_time) * 1000);
        }
    }

    public resetProduct() {
        this.isClicked = false;
        this.isWarning = false;
        this.isTimerRunning = false;
        this.displayed_item = 0;
        this.wasted_item = 0;
        this.left_time = 0;
    }
}
