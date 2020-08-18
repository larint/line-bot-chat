"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const webhook_controller_1 = require("../controllers/webhook_controller");
let router = express.Router();
exports.router = router;
router.post('/', webhook_controller_1.WebhookController.receiveEvent);
