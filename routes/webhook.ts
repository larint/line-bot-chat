import { Router } from "express"
import WebhookController from "../controllers/webhook_controller"

let router = Router();

// webhook callback
router.post('/', WebhookController.receiveEvent)

export default router 
