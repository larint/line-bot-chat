"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const home_controller_1 = require("../controllers/home_controller");
let router = express_1.Router();
exports.router = router;
let homeController = new home_controller_1.HomeController();
router.get('/', homeController.index);
