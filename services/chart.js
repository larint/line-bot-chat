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
