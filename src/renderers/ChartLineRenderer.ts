import {ChartLineDataInterface} from '../types/ChartLine';
import {ChartRenderer} from './RendererInterface';

let endAngle = Math.PI * 2;//cache this for performance

interface CurvePoint {
    x: number;
    y: number;
}

export class ChartLineRenderer extends ChartRenderer {

    data: Array<ChartLineDataInterface>;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    scale: number;
    
    public static freeSpace = 0.8;
    public static bottomSpace = 10;
    public maxRadius: number = 7;

    constructor(canvas: HTMLCanvasElement, data: Array<ChartLineDataInterface>) {
        super();
        
        this.scale = 1;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.setData(data);
    }

    public setData(data: Array<ChartLineDataInterface>) {
        this.data = data;
    }

    public draw() {
        if (!this.data.length) {
            return false;
        }

        let x_gap = this.canvas.width / this.data.length;
        let x_gap_half = x_gap >> 1;
        let curvePoints: Array<CurvePoint> = [];
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#007b90';
        this.each(this.data, (item: ChartLineDataInterface, index: number) => {
            this.context.beginPath();
            let x = (x_gap_half + (x_gap * index)) >> 0;
            let y = this.translateY(item.value) - ChartLineRenderer.bottomSpace;
            let distance = Math.abs(this.canvas.width - (this.mouse.x - x));
            let perc = distance / this.canvas.width;
            let r = Math.abs(this.maxRadius - Math.abs(this.maxRadius - (this.maxRadius * perc)));
            
            this.context.arc(x, y, r, 0, endAngle);
            this.context.fill();
            
            let curvePoint: CurvePoint = {
                x: x,
                y: y
            };
            
            curvePoints.push(curvePoint);
        });
        
        this.connectPoints(curvePoints);
        this.drawHoverLine();
    }
    
    private drawHoverLine() {
        this.context.beginPath();
        this.context.moveTo(this.mouse.x, 0);
        this.context.lineTo(this.mouse.x, this.canvas.height);
        this.context.stroke();
        this.context.closePath();
    }
    
    private connectPoints(points: Array<CurvePoint>) {
        for(let i = 0, len = points.length; i < len - 1; i++) {
            this.context.beginPath();
            this.context.moveTo(points[i].x, points[i].y);
            this.context.lineTo(points[i + 1].x, points[i + 1].y);
            this.context.stroke();
            this.context.closePath();
        }
    }

    private getScale(): number {
        let max = this.getMax();
        let scale = (this.canvas.height / max) * ChartLineRenderer.freeSpace;
        return scale;
    }

    private getMax(): number {
        let max = -Infinity;
        this.each(this.data, (item: ChartLineDataInterface) => {
            if (item.value > max) {
                max = item.value;
            }
        });

        return max;
    }

    private translateY(value: number): number {
        let y_scale = this.getScale();
        return (this.canvas.height - (value * y_scale)) >> 0;
    }
}