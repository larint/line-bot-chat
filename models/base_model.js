"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const db_1 = require("../helpers/db");
class BaseModel {
    constructor() {
        this.table = '';
        this.find = async (attrs) => {
            let where = (typeof attrs == 'number') ? [{ field: 'id', data: attrs }] : attrs;
            let res = await this.select(where);
            if (res) {
                return res[0];
            }
            return false;
        };
        this.select = async (attrs) => {
            let buildSet = await this.buildSet(attrs);
            return await db_1.DB.selectByParams({
                table: this.table,
                where: buildSet.where,
                select: '*',
                set: buildSet.set.replace(',', ' and ')
            });
        };
        this.selectIn = async (attrs) => {
            let data = attrs[0].data;
            if (Array.isArray(data)) {
                data = attrs[0].data.join();
            }
            return await this.executeQuery(`select * from ${this.table} where ${attrs[0].field} in (${data})`);
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
        this.update = async (attrs) => {
            let buildSet = await this.buildSet(attrs, true);
            return await db_1.DB.updateItem({
                table: this.table,
                where: buildSet.where,
                set: buildSet.set
            });
        };
        this.destroy = async (attrs) => {
            let where = (typeof attrs == 'number') ? [{ field: 'id', data: attrs }] : attrs;
            let buildSet = await this.buildSet(where);
            await db_1.DB.deleteItem({
                table: this.table,
                where: buildSet.where,
                set: buildSet.set
            });
        };
        this.buildSet = async (attrs, isUpdate = false) => {
            let wheres = [], sets = [], idField = {};
            for (const it of attrs) {
                if (it.field != 'id') {
                    wheres.push(it.field);
                    wheres.push(it.data);
                    sets.push('?? = ?');
                }
                else {
                    idField = it;
                }
            }
            if (isUpdate) {
                wheres.push('id');
                wheres.push(idField.data);
            }
            else if (idField.field) {
                wheres.push(idField.field);
                wheres.push(idField.data);
                sets.push('?? = ?');
            }
            return { where: wheres, set: sets.join() };
        };
        this.executeQuery = (sql) => {
            return db_1.DB.selectBySql(sql);
        };
    }
}
exports.BaseModel = BaseModel;
