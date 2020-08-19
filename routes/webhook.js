"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook_controller");
let router = express_1.Router();
exports.router = router;
let webhookController = new webhook_controller_1.WebhookController();
router.post('/', webhookController.receiveEvent);
