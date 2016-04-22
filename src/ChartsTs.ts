import {CanvasFinder} from './CanvasFinder';
import {ChartType} from './types/ChartType';
import {RendererFactory} from './RendererFactory';
import {MousePoint} from './renderers/RendererInterface';

export class ChartsTs {

    private finder: CanvasFinder;
    private chart: ChartType;
    private rendererFactory: RendererFactory;

    private attachedEvents: Boolean;

    constructor() {
        this.finder = new CanvasFinder();
        this.rendererFactory = new RendererFactory(this.finder.getCanvas());
        this.chart = null;
        this.attachedEvents = false;
    }

    public setEngine(chart: ChartType) {
        this.chart = chart;
    }

    public setData(data) {
        if (this.chart) {
            this.chart.data = data;
            this.rendererFactory.draw(this.chart);
            if (!this.attachedEvents) {
                this.attachMouseMove();
            }
        }
    }

    private attachMouseMove() {
        this.finder.getCanvas().addEventListener('mousemove', (event) => {
            if (this.rendererFactory.renderer) {
                let point: MousePoint = { x: event.clientX, y: event.clientY };
                this.rendererFactory.renderer.mouse = point;
                this.rendererFactory.draw(this.chart);
            }
        }, false);

        this.attachedEvents = true;
    }
}
