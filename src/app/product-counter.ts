//import { Product } from "./product";

export class ProductCounter {
    id: number;
    uuid: string;
    product: number;
    //product_id: number;
    start_time: number;
    end_time: number;
    displayed_item: number;
    wasted_item: number;

    constructor(value: Object = {}) {
        Object.assign(this, value);
        //this.id = 0;
        //this.uuid = '4ee92194-dcfc-4dc6-9ef0-b27c0ca25cee';
        //this.product = 0;
        //this.start_time = 0;
        //this.end_time = 0;
        //this.displayed_item = 0;
        //this.wasted_item = 0;
    }

}