"use strict";
var ChartRenderer = (function () {
    function ChartRenderer() {
        var position = { x: 0, y: 0 };
        this.mouse = position;
    }
    ChartRenderer.prototype.draw = function () { };
    ChartRenderer.prototype.each = function (list, iterator) {
        for (var i = 0, len = list.length; i < len; i++) {
            if (iterator(list[i], i) === false) {
                break;
            }
        }
    };
    return ChartRenderer;
}());
exports.ChartRenderer = ChartRenderer;
//# sourceMappingURL=RendererInterface.js.map