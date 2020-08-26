"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumberProportion = exports.randomColorHex = exports.formatDate = exports.log = exports.round = exports.isExistFile = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function isExistFile(filePath) {
    try {
        fs.statSync(filePath);
        return true;
    }
    catch (error) { }
    return false;
}
exports.isExistFile = isExistFile;
function round(num, pad = 10) {
    return Math.round(num * pad) / pad;
}
exports.round = round;
function log(msg, file = 'log.log') {
    let pathFile = path.join(path.dirname(__dirname), file);
    let stream = fs.createWriteStream(pathFile, { flags: 'a' });
    stream.write(msg + '\n');
}
exports.log = log;
function formatDate(format = 'dd-MM-YYYY', dateObj = new Date(), moreDate = 0) {
    dateObj.setDate(dateObj.getDate() + moreDate);
    let year = dateObj.getFullYear();
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let date = ("0" + dateObj.getDate()).slice(-2);
    switch (format) {
        case 'dd-MM-YYYY':
            return `${date}${month}${year}`;
        case 'YYYYMMDD':
            return `${year}${month}${date}`;
        case 'MMDD':
            return `${month}${date}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${date}`;
    }
    return dateObj.toDateString();
}
exports.formatDate = formatDate;
function randomColorHex() {
    let cls = ["#626262", "#717171", "#818181", "#919191", "#a0a0a0", "#b0b0b0", "#c0c0c0", "#cfcfcf", "#dfdfdf", "#3b3b3b", "#484848", "#555555", "#6e6e6e", "#7b7b7b", "#888888", "#746053", "#68564a", "#5c4c42", "#51433a", "#453931", "#3a3029", "#2e2621", "#221c18", "#171310", "#0b0908", "#816f64", "#8f7f75", "#9d8f86", "#ab9f97", "#b9afa9", "#c7bfba", "#d5cfcb", "#e3dfdc", "#f1efed", "#7b4c47", "#885d59", "#956f6b", "#a2817e", "#af9390", "#bda5a3", "#cab7b5", "#d7c9c7", "#374053", "#4b5364", "#5e6675", "#737986", "#878c97", "#9b9fa9", "#afb2ba", "#c3c5cb", "#374053", "#31394a", "#2c3342", "#262c3a", "#283e46", "#3d5158", "#52646a", "#68777d", "#7e8b90", "#939ea2", "#a9b1b5", "#24373f", "#203138", "#1c2b31"];
    let idx = Math.floor(Math.random() * Math.floor(cls.length));
    return cls[idx];
}
exports.randomColorHex = randomColorHex;
async function generateNumberProportion(max, segments) {
    let segmentMax = 60, tempResults = [], remaining = max, finalResults = [];
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
