"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mysql = require("mysql");
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
    timezone: process.env.DB_TIMEZONE,
});
let connectDatabase = () => {
    connection.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(connectDatabase, 100);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectDatabase();
        } else {
            throw err;
        }
    });
};
connectDatabase();
class DB {}
exports.DB = DB;
DB.convertRowDataToArrayCsv = async(rowData) => {
    let dataArr = [];
    rowData.forEach((row, idx) => {
        let rowArr = [],
            fields = [];
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
                resolve(data);
            }
        });
    });
};
DB.selectBySql = async(sql, selectPlainObj = false, returnArrayCsv = false) => await DB.exeQuery(sql, selectPlainObj, returnArrayCsv);
DB.selectByParams = async(params, selectPlainObj = false, returnArrayCsv = false) => {
    let limit = '';
    if (params.limit) {
        limit = `LIMIT ${params.limit}`;
    }
    return await DB.exeQuery(mysql.format(`SELECT ${params.select} FROM ${params.table} WHERE ${params.set} ${limit}`, params.where), selectPlainObj, returnArrayCsv);
};
DB.insertItem = async(params) => await DB.exeQuery(mysql.format(`INSERT INTO ${params.table} SET ${params.set}`, params.where));
DB.updateItem = async(params) => await DB.exeQuery(mysql.format(`UPDATE ${params.table} SET ${params.set} WHERE ?? = ?`, params.where));
DB.deleteItem = async(params) => await DB.exeQuery(mysql.format(`DELETE FROM ${params.table} WHERE ${params.set}`, params.where));