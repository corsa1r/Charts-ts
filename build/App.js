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
//# sourceMappingURL=App.js.map