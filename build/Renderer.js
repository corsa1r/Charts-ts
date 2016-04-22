"use strict";
var ChartLine_1 = require('./types/ChartLine');
var Renderer = (function () {
    function Renderer(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
    Renderer.prototype.draw = function (chartEngine) {
        if (chartEngine instanceof ChartLine_1.ChartLine) {
            this.each(chartEngine.data, function (item, index) {
                console.log('draw item: ', item.value);
            });
        }
    };
    Renderer.prototype.each = function (data, iterator) {
        for (var i = 0, len = data.length; i < len; i++) {
            if (iterator(data[i], i) === false) {
                break;
            }
        }
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map