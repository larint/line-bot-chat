"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const db_1 = require("../helpers/db");
let router = express.Router();
exports.router = router;
router.get('/', async (req, res, next) => {
    let graphicsAges = await db_1.DB.selectBySql('select * from friend_graphics__ages order by id desc limit 1', true, true);
    let dataChart1 = { data: '', labels: '', bgcolor: '' };
    if (graphicsAges.length > 0) {
        let labels = graphicsAges[0];
        labels = labels.slice(2, graphicsAges[0].length);
        dataChart1.labels = JSON.stringify(labels);
        let data = graphicsAges[1];
        data = data.slice(2, graphicsAges[0].length);
        dataChart1.data = JSON.stringify(data);
        let bgcolor = [];
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor);
        }
        dataChart1.bgcolor = JSON.stringify(bgcolor);
    }
    let graphicsAppType = await db_1.DB.selectBySql('select * from friend_graphics__apptypes order by id desc limit 1', true, true);
    let dataChart2 = { data: '', labels: '', bgcolor: '' };
    if (graphicsAppType.length > 0) {
        let labels = graphicsAppType[0];
        labels = labels.slice(2, graphicsAppType[0].length);
        dataChart2.labels = JSON.stringify(labels);
        let data = graphicsAppType[1];
        data = data.slice(2, graphicsAppType[0].length);
        dataChart2.data = JSON.stringify(data);
        let bgcolor = [];
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor);
        }
        dataChart2.bgcolor = JSON.stringify(bgcolor);
    }
    let graphicsGender = await db_1.DB.selectBySql('select * from friend_graphics__genders order by id desc limit 1', true, true);
    let dataChart3 = { data: '', labels: '', bgcolor: '' };
    if (graphicsGender.length > 0) {
        let labels = graphicsGender[0];
        labels = labels.slice(2, graphicsGender[0].length);
        dataChart3.labels = JSON.stringify(labels);
        let data = graphicsGender[1];
        data = data.slice(2, graphicsGender[0].length);
        dataChart3.data = JSON.stringify(data);
        let bgcolor = [];
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor);
        }
        dataChart3.bgcolor = JSON.stringify(bgcolor);
    }
    let graphicsSubscription = await db_1.DB.selectBySql('select * from friend_graphics__subscriptions order by id desc limit 1', true, true);
    let dataChart4 = { data: '', labels: '', bgcolor: '' };
    if (graphicsSubscription.length > 0) {
        let labels = graphicsSubscription[0];
        labels = labels.slice(2, graphicsSubscription[0].length);
        dataChart4.labels = JSON.stringify(labels);
        let data = graphicsSubscription[1];
        data = data.slice(2, graphicsSubscription[0].length);
        dataChart4.data = JSON.stringify(data);
        let bgcolor = [];
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor);
        }
        dataChart4.bgcolor = JSON.stringify(bgcolor);
    }
    res.render('chart', { dataAges: dataChart1, dataAppType: dataChart2, dataGender: dataChart3, dataSubscription: dataChart4 });
});
