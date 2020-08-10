"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const fs = require("fs");
function log(msg) {
    fs.readFileSync('log.log', { encoding: 'utf-8', flag: 'w+' });
    fs.writeFile('log.log', msg + '\n', { encoding: 'utf-8', flag: 'w+' }, console.warn);
}
exports.log = log;
