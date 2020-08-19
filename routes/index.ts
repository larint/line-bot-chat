import { Router } from 'express'
import { HomeController } from '../controllers/home_controller'

let router = Router()
let homeController = new HomeController()

router.get('/', homeController.index)
router.get('/linedata/downcsv/:data', homeController.downCsv)

export { router }
