import { Router } from 'express'
import BroadcastController from '../controllers/broadcast_controller'

let router = Router()

router.get('/', BroadcastController.index)
router.post('/send', BroadcastController.sendBroadcast)
router.post('/get-list-account-group', BroadcastController.getListAccountGroup)

export default router