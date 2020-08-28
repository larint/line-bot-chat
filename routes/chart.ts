import { Router } from 'express'
import ChartController from '../controllers/chart_controller'

let router = Router();

router.get('/', ChartController.index)
router.post('/get-chart-data', ChartController.getChartData)

export default router 