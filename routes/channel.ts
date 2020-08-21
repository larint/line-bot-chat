import { Router } from 'express'
import { ChannelController } from '../controllers/channel_controller'

let router = Router()
let channelController = new ChannelController()

router.get('/', channelController.index)
router.post('/account/add', channelController.addAccount)
router.get('/account/delete/:id', channelController.deleteAccount)
router.get('/account/edit/:id', channelController.editAccount)
router.post('/account/update', channelController.updateAccount)

router.post('/group/add', channelController.createGroup)
router.get('/group/delete/:id', channelController.deleteGroup)
router.get('/group/export', channelController.exportDataInGroup)
router.get('/group/detail/:id', channelController.groupDetail)

export { router }