export class Product {
    id: number;
    name: string;
    img: string;
    duration: number;
    limit: number;
    isWarning: boolean;
    isTimerRunning: boolean;
    isClicked: boolean;
    uuid: string;
    start_time: string;
    end_time: string;
    displayed_item: number;
    wasted_item: number;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
