import * as express from "express"
import { WebhookController } from "../controllers/webhook_controller"

let router = express.Router();

// webhook callback
router.post('/', WebhookController.receiveEvent)

export { router }
