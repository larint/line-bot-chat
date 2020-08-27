"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_1 = require("../services/chart");
class ChartController {
    constructor() {
        this.index = async (req, res) => {
            let dataChart1 = await chart_1.Chart.prepareDataChartPieFromTable('friend_graphics__ages');
            let dataChart2 = await chart_1.Chart.prepareDataChartPieFromTable('friend_graphics__apptypes');
            let dataChart3 = await chart_1.Chart.prepareDataChartPieFromTable('friend_graphics__genders');
            let dataChart4 = await chart_1.Chart.prepareDataChartPieFromTable('friend_graphics__subscriptions');
            let table = 'friend_graphics__areas_jp';
            switch (process.env.LINE_LOCATE) {
                case 'jp':
                    table = 'friend_graphics__areas_jp';
                    break;
                case 'tw':
                    table = 'friend_graphics__areas_tw';
                    break;
                case 'th':
                    table = 'friend_graphics__areas_th';
                    break;
                case 'id':
                    table = 'friend_graphics__areas_id';
                    break;
            }
            let dataChart5 = await chart_1.Chart.prepareDataChartPieFromTable(table);
            let dataChart6 = await chart_1.Chart.prepareDataChartLineFromTable('messages_statistic');
            return res.render('charts/index', { dataAges: dataChart1, dataAppType: dataChart2, dataGender: dataChart3, dataSubscription: dataChart4, dataArea: dataChart5, dataMess: dataChart6 });
        };
    }
}
exports.default = new ChartController;
