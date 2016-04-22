import {ChartType} from './types/ChartType';
import {ChartLine} from './types/ChartLine';
import {ChartLineDataInterface} from './types/ChartLine';
import {ChartRenderer} from './renderers/RendererInterface';
import {ChartLineRenderer} from './renderers/ChartLineRenderer';

export class RendererFactory {
    private canvas: HTMLCanvasElement;
    public renderer: ChartRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.renderer = null;
    }

    public draw(chartEngine: ChartType) {
        if (chartEngine instanceof ChartLine) {
            if (this.renderer === null) {
                this.renderer = new ChartLineRenderer(this.canvas, chartEngine.data);
            }
        }

        this.renderer.draw();
    }

}