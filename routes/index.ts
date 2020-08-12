import * as express from 'express'
import { Router, Request, Response, NextFunction } from "express"
import { DB } from '../helpers/db'
import { writeToPath } from '@fast-csv/format';
import * as path from 'path'
import { formatDate } from '../helpers/helper'

let router = express.Router()

require('dotenv').config()

router.get('/', async (req, res, next) => {
    let graphicsAges = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__ages',
        set: '?',
        where: [1]
    })

    let graphicsApptypes = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__apptypes',
        set: '?',
        where: [1]
    })

    let graphicsAreas = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__areas',
        set: '?',
        where: [1]
    })

    let graphicsGenders = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__genders',
        set: '?',
        where: [1]
    })

    let graphicsSubscriptions = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__subscriptions',
        set: '?',
        where: [1]
    })

    res.render('index', {
        ages: graphicsAges,
        apptypes: graphicsApptypes,
        areas: graphicsAreas,
        genders: graphicsGenders,
        subscriptions: graphicsSubscriptions,
    });
}).get('/linedata/downcsv', async (req, res, next) => {

    let graphicsAges = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__ages',
        set: '?',
        where: [1]
    }, false, true)

    let graphicsApptypes = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__apptypes',
        set: '?',
        where: [1]
    }, false, true)

    let graphicsAreas = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__areas',
        set: '?',
        where: [1]
    }, false, true)

    let graphicsGenders = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__genders',
        set: '?',
        where: [1]
    }, false, true)

    let graphicsSubscriptions = await DB.selectByParams({
        select: '*',
        table: 'friend_graphics__subscriptions',
        set: '?',
        where: [1]
    }, false, true)

    let messagesStatistic = await DB.selectByParams({
        select: '*',
        table: 'messages_statistic',
        set: '?',
        where: [1]
    }, false, true)

    let currentDate = formatDate('YYYYMMDD')
    let file = path.join(path.dirname(__dirname), `/data_csv/${currentDate}.csv`)

    writeToPath(file, messagesStatistic)
        .on('error', err => console.error(err))
        .on('finish', () => res.download(file));

})

export { router }
