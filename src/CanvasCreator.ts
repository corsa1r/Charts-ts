export interface CanvasSize {
    width: number;
    height: number;
}

export class CanvasCreator {

    public create(options: CanvasSize) {
        let canvas = document.createElement('canvas');
        canvas.width = options.width;
        canvas.height = options.height;

        return canvas;
    }

    public append(container: Element, canvas: HTMLCanvasElement) {
        container.appendChild(canvas);
    }
}