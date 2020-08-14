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
        table: 'friend_graphics__areas_jp',
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
    let messagesStatistics = await db_1.DB.selectByParams({
        select: '*',
        table: 'messages_statistic',
        set: '?',
        where: [1]
    });
    res.render('index', {
        ages: graphicsAges,
        apptypes: graphicsApptypes,
        areas: graphicsAreas,
        genders: graphicsGenders,
        subscriptions: graphicsSubscriptions,
        messagesStatistics: messagesStatistics
    });
}).get('/linedata/downcsv/:data', async (req, res, next) => {
    let currentDate = helper_1.formatDate('YYYYMMDD');
    let data = [];
    let filename = `${currentDate}.csv`;
    switch (req.params.data) {
        case "1":
            filename = `${currentDate}_friend_graphics_ages.csv`;
            data = await db_1.DB.selectByParams({
                select: '*',
                table: 'friend_graphics__ages',
                set: '?',
                where: [1]
            }, false, true);
            break;
        case "2":
            filename = `${currentDate}_friend_graphics_apptypes.csv`;
            data = await db_1.DB.selectByParams({
                select: '*',
                table: 'friend_graphics__apptypes',
                set: '?',
                where: [1]
            }, false, true);
            break;
        case "3":
            filename = `${currentDate}_friend_graphics_areas.csv`;
            data = await db_1.DB.selectByParams({
                select: '*',
                table: 'friend_graphics__areas_jp',
                set: '?',
                where: [1]
            }, false, true);
            break;
        case "4":
            filename = `${currentDate}_friend_graphics_genders.csv`;
            data = await db_1.DB.selectByParams({
                select: '*',
                table: 'friend_graphics__genders',
                set: '?',
                where: [1]
            }, false, true);
            break;
        case "5":
            filename = `${currentDate}_friend_graphics_subscriptions.csv`;
            data = await db_1.DB.selectByParams({
                select: '*',
                table: 'friend_graphics__subscriptions',
                set: '?',
                where: [1]
            }, false, true);
            break;
        case "6":
            filename = `${currentDate}_messages_statistic.csv`;
            data = await db_1.DB.selectByParams({
                select: '*',
                table: 'messages_statistic',
                set: '?',
                where: [1]
            }, false, true);
            break;
        default:
            break;
    }
    let file = path.join(path.dirname(__dirname), `/data_csv/${filename}`);
    format_1.writeToPath(file, data)
        .on('error', err => console.error(err))
        .on('finish', () => res.download(file));
});
