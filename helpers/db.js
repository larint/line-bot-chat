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
exports.DB = void 0;
const mysql = __importStar(require("mysql"));
require('dotenv').config();
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
    timezone: process.env.DB_TIMEZONE,
});
let connectDatabase = () => {
    connection.on('error', function (err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }
        console.log('Re-connecting db: ' + err.stack);
        connection = mysql.createConnection(connection.config);
        connectDatabase();
    });
};
connectDatabase();
class DB {
}
exports.DB = DB;
DB.convertRowDataToArrayCsv = async (rowData) => {
    let dataArr = [];
    rowData.forEach((row, idx) => {
        let rowArr = [], fields = [];
        if (idx == 0) {
            fields = Object.keys(row);
            dataArr.push(fields);
        }
        for (let column in row) {
            rowArr.push(row[column]);
        }
        dataArr.push(rowArr);
    });
    return dataArr;
};
DB.exeQuery = (sql, selectPlainObj = false, returnArrayCsv = false) => {
    if (process.env.ENV == 'development') {
        console.log(sql);
        console.log('-------------------------------------------------------------');
    }
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result, fields) => {
            if (err)
                reject(err);
            else {
                let data = selectPlainObj ? JSON.parse(JSON.stringify(result)) : result;
                if (returnArrayCsv) {
                    let dataArrCsv = DB.convertRowDataToArrayCsv(data);
                    data = dataArrCsv;
                }
                if (data.length == 0) {
                    return resolve(false);
                }
                resolve(data);
            }
        });
    });
};
DB.selectBySql = async (sql, selectPlainObj = false, returnArrayCsv = false) => await DB.exeQuery(sql, selectPlainObj, returnArrayCsv);
DB.selectByParams = async (params, selectPlainObj = false, returnArrayCsv = false) => {
    let limit = '', order = '';
    if (params.limit) {
        limit = `LIMIT ${params.limit}`;
    }
    if (params.order) {
        order = `ORDER BY ${params.order}`;
    }
    return await DB.exeQuery(mysql.format(`SELECT ${params.select} FROM ${params.table} WHERE ${params.set} ${order} ${limit}`, params.where), selectPlainObj, returnArrayCsv);
};
DB.insertItem = async (params) => await DB.exeQuery(mysql.format(`INSERT INTO ${params.table} SET ${params.set}`, params.where));
DB.updateItem = async (params) => await DB.exeQuery(mysql.format(`UPDATE ${params.table} SET ${params.set} WHERE ?? = ?`, params.where));
DB.deleteItem = async (params) => await DB.exeQuery(mysql.format(`DELETE FROM ${params.table} WHERE ${params.set}`, params.where));
