"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const statistic_controller_1 = require("../controllers/statistic_controller");
let router = express_1.Router();
exports.router = router;
let statisticController = new statistic_controller_1.StatisticController();
router.get('/', statisticController.index);
router.get('/linedata/downcsv/:data', statisticController.downCsv);
router.post('/get-group-statistic', statisticController.getGroupStatistic);
router.post('/export-pdf', statisticController.exportPdf);
