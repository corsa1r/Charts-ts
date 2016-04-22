"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RendererInterface_1 = require('./RendererInterface');
var endAngle = Math.PI * 2;
var ChartLineRenderer = (function (_super) {
    __extends(ChartLineRenderer, _super);
    function ChartLineRenderer(canvas, data) {
        _super.call(this);
        this.maxRadius = 7;
        this.scale = 1;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.setData(data);
    }
    ChartLineRenderer.prototype.setData = function (data) {
        this.data = data;
    };
    ChartLineRenderer.prototype.draw = function () {
        var _this = this;
        if (!this.data.length) {
            return false;
        }
        var x_gap = this.canvas.width / this.data.length;
        var x_gap_half = x_gap >> 1;
        var curvePoints = [];
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#007b90';
        this.each(this.data, function (item, index) {
            _this.context.beginPath();
            var x = (x_gap_half + (x_gap * index)) >> 0;
            var y = _this.translateY(item.value) - ChartLineRenderer.bottomSpace;
            var distance = Math.abs(_this.canvas.width - (_this.mouse.x - x));
            var perc = distance / _this.canvas.width;
            var r = Math.abs(_this.maxRadius - Math.abs(_this.maxRadius - (_this.maxRadius * perc)));
            _this.context.arc(x, y, r, 0, endAngle);
            _this.context.fill();
            var curvePoint = {
                x: x,
                y: y
            };
            curvePoints.push(curvePoint);
        });
        this.connectPoints(curvePoints);
        this.drawHoverLine();
    };
    ChartLineRenderer.prototype.drawHoverLine = function () {
        this.context.beginPath();
        this.context.moveTo(this.mouse.x, 0);
        this.context.lineTo(this.mouse.x, this.canvas.height);
        this.context.stroke();
        this.context.closePath();
    };
    ChartLineRenderer.prototype.connectPoints = function (points) {
        for (var i = 0, len = points.length; i < len - 1; i++) {
            this.context.beginPath();
            this.context.moveTo(points[i].x, points[i].y);
            this.context.lineTo(points[i + 1].x, points[i + 1].y);
            this.context.stroke();
            this.context.closePath();
        }
    };
    ChartLineRenderer.prototype.getScale = function () {
        var max = this.getMax();
        var scale = (this.canvas.height / max) * ChartLineRenderer.freeSpace;
        return scale;
    };
    ChartLineRenderer.prototype.getMax = function () {
        var max = -Infinity;
        this.each(this.data, function (item) {
            if (item.value > max) {
                max = item.value;
            }
        });
        return max;
    };
    ChartLineRenderer.prototype.translateY = function (value) {
        var y_scale = this.getScale();
        return (this.canvas.height - (value * y_scale)) >> 0;
    };
    ChartLineRenderer.freeSpace = 0.8;
    ChartLineRenderer.bottomSpace = 10;
    return ChartLineRenderer;
}(RendererInterface_1.ChartRenderer));
exports.ChartLineRenderer = ChartLineRenderer;
//# sourceMappingURL=ChartLineRenderer.js.map