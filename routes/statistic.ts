import { Router } from 'express'
import StatisticController from '../controllers/statistic_controller'

let router = Router()

router.get('/', StatisticController.index)
router.get('/linedata/downcsv/:data', StatisticController.downCsv)
router.post('/get-list-statistic', StatisticController.getListStatistic)
router.post('/export-pdf', StatisticController.exportPdf)

export default router
