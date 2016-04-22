import {CanvasCreator} from './CanvasCreator';
import {CanvasSize} from './CanvasCreator';

export class CanvasFinder {

    private canvas: HTMLCanvasElement;

    constructor() {
        let canvasContainer = document.querySelector('[charts-ts]');
        let attrWidth = parseInt(canvasContainer.getAttribute('charts-ts-width'), 10);
        let attrHeight = parseInt(canvasContainer.getAttribute('charts-ts-height'), 10);
        if (canvasContainer !== null) {
            let creator = new CanvasCreator();
            let options: CanvasSize = {
                width: !isNaN(attrWidth) ? attrWidth : 700,
                height: !isNaN(attrHeight) ? attrHeight : 300
            };

            this.canvas = creator.create(options);

            creator.append(canvasContainer, this.canvas);
        }
    }

    public getCanvas() {
        return this.canvas;
    }
}
