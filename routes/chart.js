"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const chart_1 = require("../services/chart");
let router = express.Router();
exports.router = router;
router.get('/', async (req, res, next) => {
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
    res.render('chart', { dataAges: dataChart1, dataAppType: dataChart2, dataGender: dataChart3, dataSubscription: dataChart4, dataArea: dataChart5 });
});
