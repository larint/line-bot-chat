import * as express from 'express'
import { ChannelController } from '../controllers/channel_controller'

let router = express.Router();

router.get('/', ChannelController.index)
router.post('/account/add', ChannelController.addAccount)
router.get('/account/delete/:id', ChannelController.deleteAccount)

router.post('/group/add', ChannelController.createGroup)
router.get('/group/delete/:id', ChannelController.deleteGroup)
router.get('/group/export', ChannelController.exportDataInGroup)
router.get('/group/detail/:id', ChannelController.groupDetail)

export { router }