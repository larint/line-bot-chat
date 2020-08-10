"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.log = void 0;
const fs = require("fs");
function log(msg, file = 'log.log') {
    fs.readFileSync(file, { encoding: 'utf-8', flag: 'w+' });
    fs.writeFile(file, msg + '\n', { encoding: 'utf-8', flag: 'w+' }, console.warn);
}
exports.log = log;
function formatDate(format = 'dd-MM-YYYY', dateObj = new Date()) {
    let year = dateObj.getFullYear();
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let date = ("0" + (dateObj.getDate() + 1)).slice(-2);
    switch (format) {
        case 'dd-MM-YYYY':
            return `${date}${month}${year}`;
        case 'YYYYMMDD':
            return `${year}${month}${date}`;
    }
    return dateObj.toDateString();
}
exports.formatDate = formatDate;
