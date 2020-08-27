import { Router } from 'express'
import HomeController from '../controllers/home_controller'

let router = Router()

router.get('/', HomeController.index)

export default router 
