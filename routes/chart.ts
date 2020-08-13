import * as express from 'express'
import { Crawler } from '../services/crawler'
import { typeDataCovid } from '../helpers/type'
import * as fs from 'fs'
import * as path from 'path'
import { DB } from '../helpers/db'

let router = express.Router();

export interface dataChartPie {
    data: string,
    labels: string,
    bgcolor: string
}

router.get('/', async (req, res, next) => {
    let graphicsAges = await DB.selectBySql('select * from friend_graphics__ages order by id desc limit 1', true, true)
    let dataChart1: dataChartPie = { data: '', labels: '', bgcolor: '' }

    if (graphicsAges.length > 0) {

        let labels: string[] = graphicsAges[0]
        labels = labels.slice(2, graphicsAges[0].length)
        dataChart1.labels = JSON.stringify(labels)
        let data: number[] = graphicsAges[1]
        data = data.slice(2, graphicsAges[0].length)
        dataChart1.data = JSON.stringify(data)
        let bgcolor = []
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor)
        }
        dataChart1.bgcolor = JSON.stringify(bgcolor)
    }

    let graphicsAppType = await DB.selectBySql('select * from friend_graphics__apptypes order by id desc limit 1', true, true)
    let dataChart2: dataChartPie = { data: '', labels: '', bgcolor: '' }

    if (graphicsAppType.length > 0) {

        let labels: string[] = graphicsAppType[0]
        labels = labels.slice(2, graphicsAppType[0].length)
        dataChart2.labels = JSON.stringify(labels)
        let data: number[] = graphicsAppType[1]
        data = data.slice(2, graphicsAppType[0].length)
        dataChart2.data = JSON.stringify(data)
        let bgcolor = []
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor)
        }
        dataChart2.bgcolor = JSON.stringify(bgcolor)
    }

    let graphicsGender = await DB.selectBySql('select * from friend_graphics__genders order by id desc limit 1', true, true)
    let dataChart3: dataChartPie = { data: '', labels: '', bgcolor: '' }

    if (graphicsGender.length > 0) {

        let labels: string[] = graphicsGender[0]
        labels = labels.slice(2, graphicsGender[0].length)
        dataChart3.labels = JSON.stringify(labels)
        let data: number[] = graphicsGender[1]
        data = data.slice(2, graphicsGender[0].length)
        dataChart3.data = JSON.stringify(data)
        let bgcolor = []
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor)
        }
        dataChart3.bgcolor = JSON.stringify(bgcolor)
    }

    let graphicsSubscription = await DB.selectBySql('select * from friend_graphics__subscriptions order by id desc limit 1', true, true)
    let dataChart4: dataChartPie = { data: '', labels: '', bgcolor: '' }

    if (graphicsSubscription.length > 0) {

        let labels: string[] = graphicsSubscription[0]
        labels = labels.slice(2, graphicsSubscription[0].length)
        dataChart4.labels = JSON.stringify(labels)
        let data: number[] = graphicsSubscription[1]
        data = data.slice(2, graphicsSubscription[0].length)
        dataChart4.data = JSON.stringify(data)
        let bgcolor = []
        for (let index = 0; index < data.length; index++) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            bgcolor.push('#' + randomColor)
        }
        dataChart4.bgcolor = JSON.stringify(bgcolor)
    }

    res.render('chart', { dataAges: dataChart1, dataAppType: dataChart2, dataGender: dataChart3, dataSubscription: dataChart4 });
})

export { router }
