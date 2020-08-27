"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistic_controller_1 = __importDefault(require("../controllers/statistic_controller"));
let router = express_1.Router();
router.get('/', statistic_controller_1.default.index);
router.get('/linedata/downcsv/:data', statistic_controller_1.default.downCsv);
router.post('/get-list-statistic', statistic_controller_1.default.getListStatistic);
router.post('/export-pdf', statistic_controller_1.default.exportPdf);
exports.default = router;
