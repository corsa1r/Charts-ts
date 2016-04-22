"use strict";
var CanvasCreator = (function () {
    function CanvasCreator() {
    }
    CanvasCreator.prototype.create = function (options) {
        var canvas = document.createElement('canvas');
        canvas.width = options.width;
        canvas.height = options.height;
        return canvas;
    };
    CanvasCreator.prototype.append = function (container, canvas) {
        container.appendChild(canvas);
    };
    return CanvasCreator;
}());
exports.CanvasCreator = CanvasCreator;
//# sourceMappingURL=CanvasCreator.js.map