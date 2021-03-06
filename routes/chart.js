"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chart_controller_1 = __importDefault(require("../controllers/chart_controller"));
let router = express_1.Router();
router.get('/', chart_controller_1.default.index);
router.post('/get-chart-data-friend', chart_controller_1.default.getChartDataFriend);
router.post('/get-chart-data-message', chart_controller_1.default.getChartDataMessage);
exports.default = router;
