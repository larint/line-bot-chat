import { Router } from "express"
import { WebhookController } from "../controllers/webhook_controller"

let router = Router();
let webhookController = new WebhookController()

// webhook callback
router.post('/', webhookController.receiveEvent)

export { router }
