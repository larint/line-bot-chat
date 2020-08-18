"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const chart_controller_1 = require("../controllers/chart_controller");
let router = express.Router();
exports.router = router;
router.get('/', chart_controller_1.ChartController.index);
