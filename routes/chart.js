"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const chart_controller_1 = require("../controllers/chart_controller");
let router = express_1.Router();
exports.router = router;
let chartController = new chart_controller_1.ChartController();
router.get('/', chartController.index);
