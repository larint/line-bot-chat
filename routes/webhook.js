"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = __importDefault(require("../controllers/webhook_controller"));
let router = express_1.Router();
router.post('/', webhook_controller_1.default.receiveEvent);
exports.default = router;
