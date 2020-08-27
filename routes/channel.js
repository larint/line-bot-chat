"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_controller_1 = __importDefault(require("../controllers/channel_controller"));
let router = express_1.Router();
router.get('/', channel_controller_1.default.index);
router.post('/account/add', channel_controller_1.default.addAccount);
router.get('/account/delete/:id', channel_controller_1.default.deleteAccount);
router.get('/account/edit/:id', channel_controller_1.default.editAccount);
router.post('/account/update', channel_controller_1.default.updateAccount);
router.post('/group/add', channel_controller_1.default.createGroup);
router.get('/group/delete/:id', channel_controller_1.default.deleteGroup);
router.get('/group/export', channel_controller_1.default.exportDataInGroup);
router.get('/group/detail/:id', channel_controller_1.default.groupDetail);
exports.default = router;
