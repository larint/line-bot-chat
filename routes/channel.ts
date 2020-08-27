import { Router } from 'express'
import ChannelController from '../controllers/channel_controller'

let router = Router()

router.get('/', ChannelController.index)
router.post('/account/add', ChannelController.addAccount)
router.get('/account/delete/:id', ChannelController.deleteAccount)
router.get('/account/edit/:id', ChannelController.editAccount)
router.post('/account/update', ChannelController.updateAccount)

router.post('/group/add', ChannelController.createGroup)
router.get('/group/delete/:id', ChannelController.deleteGroup)
router.get('/group/export', ChannelController.exportDataInGroup)
router.get('/group/detail/:id', ChannelController.groupDetail)

export default router 