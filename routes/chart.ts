import { Router } from 'express'
import { ChartController } from '../controllers/chart_controller'

let router = Router();
let chartController = new ChartController()

router.get('/', chartController.index)

export { router }
