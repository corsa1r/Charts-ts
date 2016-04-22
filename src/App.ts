import {ChartsTs} from './ChartsTs';
import {ChartLine} from './types/ChartLine';
import {ChartLineDataInterface} from './types/ChartLine';

let charts = new ChartsTs();
charts.setEngine(new ChartLine);

let data: Array<ChartLineDataInterface> = [];

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