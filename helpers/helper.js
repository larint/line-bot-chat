"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumberProportion = exports.randomColorHex = exports.formatDate = exports.log = void 0;
const fs = require("fs");
function log(msg, file = 'log.log') {
    fs.readFileSync(file, { encoding: 'utf-8', flag: 'w+' });
    fs.writeFile(file, msg + '\n', { encoding: 'utf-8', flag: 'w+' }, console.warn);
}
exports.log = log;
function formatDate(format = 'dd-MM-YYYY', dateObj = new Date()) {
    return '20200807';
    let year = dateObj.getFullYear();
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let date = ("0" + dateObj.getDate()).slice(-2);
    switch (format) {
        case 'dd-MM-YYYY':
            return `${date}${month}${year}`;
        case 'YYYYMMDD':
            return `${year}${month}${date}`;
    }
    return dateObj.toDateString();
}
exports.formatDate = formatDate;
function randomColorHex() {
    let cls = ["#626262", "#717171", "#818181", "#919191", "#a0a0a0", "#b0b0b0", "#c0c0c0", "#cfcfcf", "#dfdfdf", "#efefef", "#3b3b3b", "#484848", "#555555", "#6e6e6e", "#7b7b7b", "#888888", "#746053", "#68564a", "#5c4c42", "#51433a", "#453931", "#3a3029", "#2e2621", "#221c18", "#171310", "#0b0908", "#816f64", "#8f7f75", "#9d8f86", "#ab9f97", "#b9afa9", "#c7bfba", "#d5cfcb", "#e3dfdc", "#f1efed", "#7b4c47", "#885d59", "#956f6b", "#a2817e", "#af9390", "#bda5a3", "#cab7b5", "#d7c9c7", "#374053", "#4b5364", "#5e6675", "#737986", "#878c97", "#9b9fa9", "#afb2ba", "#c3c5cb", "#374053", "#31394a", "#2c3342", "#262c3a", "#283e46", "#3d5158", "#52646a", "#68777d", "#7e8b90", "#939ea2", "#a9b1b5", "#24373f", "#203138", "#1c2b31"];
    let idx = Math.floor(Math.random() * Math.floor(cls.length));
    return cls[idx];
}
exports.randomColorHex = randomColorHex;
async function generateNumberProportion(max, segments) {
    let segmentMax = 80, tempResults = [], remaining = max, finalResults = [];
    for (let i = 1; i <= segments; i++) {
        let r = Math.random() * segmentMax;
        r = Math.round(r * 10) / 10;
        if (i === segments) {
            r = remaining;
        }
        tempResults.push(r);
        remaining -= r;
        remaining = Math.round(remaining * 10) / 10;
        segmentMax = remaining;
    }
    while (tempResults.length > 0) {
        let index = Math.floor(Math.random() * tempResults.length);
        finalResults = finalResults.concat(tempResults.splice(index, 1));
    }
    return finalResults;
}
exports.generateNumberProportion = generateNumberProportion;
