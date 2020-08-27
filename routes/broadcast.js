"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const broadcast_controller_1 = __importDefault(require("../controllers/broadcast_controller"));
let router = express_1.Router();
router.get('/', broadcast_controller_1.default.index);
router.post('/send', broadcast_controller_1.default.sendBroadcast);
router.post('/get-list-account-group', broadcast_controller_1.default.getListAccountGroup);
exports.default = router;
