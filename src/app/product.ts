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

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
