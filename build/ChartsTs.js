"use strict";
var CanvasFinder_1 = require('./CanvasFinder');
var RendererFactory_1 = require('./RendererFactory');
var ChartsTs = (function () {
    function ChartsTs() {
        this.finder = new CanvasFinder_1.CanvasFinder();
        this.rendererFactory = new RendererFactory_1.RendererFactory(this.finder.getCanvas());
        this.chart = null;
        this.attachedEvents = false;
    }
    ChartsTs.prototype.setEngine = function (chart) {
        this.chart = chart;
    };
    ChartsTs.prototype.setData = function (data) {
        if (this.chart) {
            this.chart.data = data;
            this.rendererFactory.draw(this.chart);
            if (!this.attachedEvents) {
                this.attachMouseMove();
            }
        }
    };
    ChartsTs.prototype.attachMouseMove = function () {
        var _this = this;
        this.finder.getCanvas().addEventListener('mousemove', function (event) {
            if (_this.rendererFactory.renderer) {
                var point = { x: event.clientX, y: event.clientY };
                _this.rendererFactory.renderer.mouse = point;
                _this.rendererFactory.draw(_this.chart);
            }
        }, false);
        this.attachedEvents = true;
    };
    return ChartsTs;
}());
exports.ChartsTs = ChartsTs;
//# sourceMappingURL=ChartsTs.js.map