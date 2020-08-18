import * as express from 'express'
import { ChannelController } from '../controllers/channel_controller'

let router = express.Router();
let channelController = new ChannelController()

router.get('/', channelController.index)
router.post('/account/add', channelController.addAccount)
router.get('/account/delete/:id', channelController.deleteAccount)

router.post('/group/add', channelController.createGroup)
router.get('/group/delete/:id', channelController.deleteGroup)
router.get('/group/export', channelController.exportDataInGroup)
router.get('/group/detail/:id', channelController.groupDetail)

export { router }