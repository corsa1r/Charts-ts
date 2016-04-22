"use strict";
var ChartLine_1 = require('./types/ChartLine');
var ChartLineRenderer_1 = require('./renderers/ChartLineRenderer');
var RendererFactory = (function () {
    function RendererFactory(canvas) {
        this.canvas = canvas;
        this.renderer = null;
    }
    RendererFactory.prototype.draw = function (chartEngine) {
        if (chartEngine instanceof ChartLine_1.ChartLine) {
            if (this.renderer === null) {
                this.renderer = new ChartLineRenderer_1.ChartLineRenderer(this.canvas, chartEngine.data);
            }
        }
        this.renderer.draw();
    };
    return RendererFactory;
}());
exports.RendererFactory = RendererFactory;
//# sourceMappingURL=RendererFactory.js.map