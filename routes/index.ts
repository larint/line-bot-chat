import * as express from 'express'
import { IndexController } from '../controllers/index_controller'

let router = express.Router()

require('dotenv').config()

router.get('/', IndexController.index)
router.get('/linedata/downcsv/:data', IndexController.downCsv)

export { router }
