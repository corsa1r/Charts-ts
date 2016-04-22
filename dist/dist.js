(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var ChartsTs_1 = require('./ChartsTs');
var ChartLine_1 = require('./types/ChartLine');
var charts = new ChartsTs_1.ChartsTs();
charts.setEngine(new ChartLine_1.ChartLine);
var data = [];
data.push({ value: 10 });
data.push({ value: 30 });
data.push({ value: 40 });
data.push({ value: 68 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: Math.random() * 100 });
data.push({ value: 46 });
data.push({ value: 46 });
data.push({ value: 46 });
data.push({ value: 46 });
data.push({ value: 47 });
data.push({ value: 36 });
data.push({ value: 0 });
charts.setData(data);
console.log(charts);

},{"./ChartsTs":4,"./types/ChartLine":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./CanvasCreator":2}],4:[function(require,module,exports){
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

},{"./CanvasFinder":3,"./RendererFactory":5}],5:[function(require,module,exports){
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

},{"./renderers/ChartLineRenderer":6,"./types/ChartLine":8}],6:[function(require,module,exports){
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

},{"./RendererInterface":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChartType_1 = require('./ChartType');
var ChartLine = (function (_super) {
    __extends(ChartLine, _super);
    function ChartLine() {
        _super.call(this);
    }
    return ChartLine;
}(ChartType_1.ChartType));
exports.ChartLine = ChartLine;

},{"./ChartType":9}],9:[function(require,module,exports){
"use strict";
var ChartType = (function () {
    function ChartType() {
        this.data = [];
    }
    return ChartType;
}());
exports.ChartType = ChartType;

},{}]},{},[1]);
