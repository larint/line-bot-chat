import * as express from 'express'
import { Chart } from '../services/chart'

let router = express.Router();

router.get('/', async (req, res, next) => {
    let dataChart1 = await Chart.prepareDataChartPieFromTable('friend_graphics__ages')
    let dataChart2 = await Chart.prepareDataChartPieFromTable('friend_graphics__apptypes')
    let dataChart3 = await Chart.prepareDataChartPieFromTable('friend_graphics__genders')
    let dataChart4 = await Chart.prepareDataChartPieFromTable('friend_graphics__subscriptions')

    let table: string = 'friend_graphics__areas_jp'
    switch (process.env.LINE_LOCATE) {
        case 'jp':
            table = 'friend_graphics__areas_jp'
            break;
        case 'tw':
            table = 'friend_graphics__areas_tw'
            break;
        case 'th':
            table = 'friend_graphics__areas_th'
            break;
        case 'id':
            table = 'friend_graphics__areas_id'
            break;
    }
    let dataChart5 = await Chart.prepareDataChartPieFromTable(table)

    res.render('chart', { dataAges: dataChart1, dataAppType: dataChart2, dataGender: dataChart3, dataSubscription: dataChart4, dataArea: dataChart5 });
})

export { router }