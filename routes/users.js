"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
let router = express.Router();
exports.router = router;
router.get('/', async (req, res, next) => {
    res.send('user');
});
