"use strict";
var CanvasCreator_1 = require('./CanvasCreator');
var CanvasFinder = (function () {
    function CanvasFinder() {
        var canvasContainer = document.querySelector('[charts-ts]');
        var attrWidth = parseInt(canvasContainer.getAttribute('charts-ts-width'), 10);
        var attrHeight = parseInt(canvasContainer.getAttribute('charts-ts-height'), 10);
        if (canvasContainer !== null) {
            var creator = new CanvasCreator_1.CanvasCreator();
            var options = {
                width: !isNaN(attrWidth) ? attrWidth : 700,
                height: !isNaN(attrHeight) ? attrHeight : 300
            };
            this.canvas = creator.create(options);
            creator.append(canvasContainer, this.canvas);
        }
    }
    CanvasFinder.prototype.getCanvas = function () {
        return this.canvas;
    };
    return CanvasFinder;
}());
exports.CanvasFinder = CanvasFinder;
//# sourceMappingURL=CanvasFinder.js.map