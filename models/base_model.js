"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const db_1 = require("../helpers/db");
class BaseModel {
    constructor() {
        this.table = '';
        this.select = async (attrs) => {
            let buildSet = await this.buildSet(attrs);
            return await db_1.DB.selectByParams({
                table: this.table,
                where: buildSet.where,
                select: '*',
                set: buildSet.set
            });
        };
        this.selectIn = async (attrs) => {
            let buildSet = await this.buildSet(attrs);
            return await db_1.DB.selectBySql(`select * from ${this.table} where  ${attrs[0].field} in (${attrs[0].data})`);
        };
        this.selectAll = async () => {
            return await db_1.DB.selectByParams({
                table: this.table,
                where: [1],
                select: '*',
                set: '?'
            });
        };
        this.save = async (attrs) => {
            let buildSet = await this.buildSet(attrs);
            return await db_1.DB.insertItem({
                table: this.table,
                where: buildSet.where,
                set: buildSet.set
            });
        };
        this.destroy = async (attrs) => {
            let buildSet = await this.buildSet(attrs);
            await db_1.DB.deleteItem({
                table: this.table,
                where: buildSet.where,
                set: buildSet.set
            });
        };
        this.buildSet = async (attrs) => {
            let wheres = [], sets = [];
            for (const it of attrs) {
                wheres.push(it.field);
                wheres.push(it.data);
                sets.push('?? = ?');
            }
            return { where: wheres, set: sets.join() };
        };
    }
}
exports.BaseModel = BaseModel;
