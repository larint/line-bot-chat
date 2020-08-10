"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const crawler_1 = require("../services/crawler");
let router = express.Router();
exports.router = router;
router.get('/covid', async (req, res, next) => {
    let dataCovids = await crawler_1.Crawler.getDataCovid().then((data) => data).catch(console.error);
    res.send(dataCovids);
});
