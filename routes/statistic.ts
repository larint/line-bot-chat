import { Router } from 'express'
import { StatisticController } from '../controllers/statistic_controller'

let router = Router()
let statisticController = new StatisticController()

router.get('/', statisticController.index)
router.get('/linedata/downcsv/:data', statisticController.downCsv)
router.post('/get-group-statistic', statisticController.getGroupStatistic)

export { router }
