import { Product } from './product';

export class ProductCounter {
    id: number;
    uuid: string;
    product: number;
    // product_id: number;
    start_time: number;
    end_time: number;
    displayed_item: number;
    wasted_item: number;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
