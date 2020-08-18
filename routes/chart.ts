import * as express from 'express'
import { ChartController } from '../controllers/chart_controller'

let router = express.Router();

router.get('/', ChartController.index)

export { router }
