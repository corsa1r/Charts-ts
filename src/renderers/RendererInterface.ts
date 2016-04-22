export interface ChartRendererInterface {
    data: Array<any>;
    draw: () => void;
    each: (list: Array<any>, iterator: Function) => void;
}

export interface MousePoint {
    x: number;
    y: number;
}

export class ChartRenderer implements ChartRendererInterface {
    mouse: MousePoint;
    data: Array<any>;
    /**
     * @abstract
     */
    public draw() { }

    public each(list: Array<any>, iterator: Function) {
        for (let i = 0, len = list.length; i < len; i++) {
            if (iterator(list[i], i) === false) {
                break;
            }
        }
    }
    
    constructor() {
        let position: MousePoint = { x: 0, y: 0};
        this.mouse = position;
    }
}