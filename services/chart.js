"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
const db_1 = require("../helpers/db");
const helper_1 = require("../helpers/helper");
class Chart {
}
exports.Chart = Chart;
Chart.prepareDataChartPieFromTable = async (table) => {
    let dataTable = await db_1.DB.selectBySql(`select * from ${table} order by id desc limit 1`, true, true);
    let dataChart = { data: '', labels: '', bgcolor: '' };
    if (dataTable.length > 0) {
        let labels = dataTable[0];
        labels = labels.slice(2, dataTable[0].length);
        dataChart.labels = JSON.stringify(labels);
        let data = dataTable[1];
        data = data.slice(2, dataTable[0].length);
        dataChart.data = JSON.stringify(data);
        let bgcolor = [];
        for (const it of data) {
            let color = helper_1.randomColorHex();
            bgcolor.push(color);
        }
        dataChart.bgcolor = JSON.stringify(bgcolor);
    }
    return dataChart;
};
Chart.prepareDataChartLineFromTable = async (table) => {
    let dataTable = await db_1.DB.selectBySql(`select * from ${table} order by date_update desc limit 30`, true);
    let dataChart = { datasets: '', labels: '', suggestedMin: 0, suggestedMax: 30 };
    if (dataTable.length > 0) {
        let labels = [];
        let datasets = [];
        dataTable.reverse();
        let datait1 = [], datait2 = [], datait3 = [];
        for (const item of dataTable) {
            let date = item.date_update.substr(4, 2) + '/' + item.date_update.substr(6, 2);
            labels.push(date);
            datait1.push(item.reply_number);
            datait2.push(item.broadcast_number);
            datait3.push(item.deliveries_api_reply);
            console.log(item.deliveries_api_reply);
        }
        let fr = [];
        fr.push(datait1);
        fr.push(datait2);
        fr.push(datait3);
        for (let i = 0; i < fr.length; i++) {
            datasets.push({
                label: 'messages ' + i,
                data: fr[i],
                borderColor: '#36a2eb',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                fill: false,
                lineTension: 0
            });
        }
        dataChart.labels = JSON.stringify(labels);
        dataChart.datasets = JSON.stringify(datasets);
        console.log(dataChart);
    }
    return dataChart;
};
