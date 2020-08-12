"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const db_1 = require("../helpers/db");
const format_1 = require("@fast-csv/format");
const path = require("path");
const helper_1 = require("../helpers/helper");
let router = express.Router();
exports.router = router;
require('dotenv').config();
router.get('/', async (req, res, next) => {
    let graphicsAges = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__ages',
        set: '?',
        where: [1]
    });
    let graphicsApptypes = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__apptypes',
        set: '?',
        where: [1]
    });
    let graphicsAreas = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__areas',
        set: '?',
        where: [1]
    });
    let graphicsGenders = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__genders',
        set: '?',
        where: [1]
    });
    let graphicsSubscriptions = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__subscriptions',
        set: '?',
        where: [1]
    });
    res.render('index', {
        ages: graphicsAges,
        apptypes: graphicsApptypes,
        areas: graphicsAreas,
        genders: graphicsGenders,
        subscriptions: graphicsSubscriptions,
    });
}).get('/linedata/downcsv', async (req, res, next) => {
    let graphicsAges = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__ages',
        set: '?',
        where: [1]
    }, false, true);
    let graphicsApptypes = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__apptypes',
        set: '?',
        where: [1]
    }, false, true);
    let graphicsAreas = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__areas',
        set: '?',
        where: [1]
    }, false, true);
    let graphicsGenders = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__genders',
        set: '?',
        where: [1]
    }, false, true);
    let graphicsSubscriptions = await db_1.DB.selectByParams({
        select: '*',
        table: 'friend_graphics__subscriptions',
        set: '?',
        where: [1]
    }, false, true);
    let messagesStatistic = await db_1.DB.selectByParams({
        select: '*',
        table: 'messages_statistic',
        set: '?',
        where: [1]
    }, false, true);
    let currentDate = helper_1.formatDate('YYYYMMDD');
    let file = path.join(path.dirname(__dirname), `/data_csv/${currentDate}.csv`);
    format_1.writeToPath(file, messagesStatistic)
        .on('error', err => console.error(err))
        .on('finish', () => res.download(file));
});
