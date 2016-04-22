import {ChartType} from './ChartType';

export interface ChartLineDataInterface {
    value: number
}

export class ChartLine extends ChartType {

    data: Array<ChartLineDataInterface>;

    constructor() {
        super();
    }
}