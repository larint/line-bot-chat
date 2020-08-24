"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration = void 0;
const db_1 = require("../helpers/db");
class Migration {
    constructor() {
        this.queryString = '';
        this.queryAlter = '';
        this.table = '';
        this.collumn = '';
        this.stms = {};
        this.create = (table, callback) => {
            this.table = table;
            this.queryString = '\nCREATE TABLE `' + table + '` (';
            callback(this);
            this.run();
        };
        this.integer = (collumn) => {
            this.setStms(collumn);
            this.queryString += `\n${collumn} int(11) ${this.stms.uns} ${this.stms.def} ${this.stms.com} ${this.stms.inc},`;
            return this;
        };
        this.float = (collumn) => {
            this.setStms(collumn);
            this.queryString += `\n${collumn} float ${this.stms.uns} ${this.stms.def} ${this.stms.com} ${this.stms.inc},`;
            return this;
        };
        this.tinyInteger = (collumn) => {
            this.setStms(collumn);
            this.queryString += `\n${collumn} tinyint(4) ${this.stms.def} ${this.stms.com},`;
            return this;
        };
        this.string = (collumn, lenght = 255) => {
            this.setStms(collumn);
            this.queryString += `\n${collumn} varchar(${lenght}) ${this.stms.def} ${this.stms.com},`;
            return this;
        };
        this.text = (collumn, lenght = -1) => {
            this.setStms(collumn);
            if (lenght == -1) {
                this.queryString += `\n${collumn} text ${this.stms.def} ${this.stms.com},`;
            }
            else {
                this.queryString += `\n${collumn} text(${lenght}) ${this.stms.def} ${this.stms.com},`;
            }
            return this;
        };
        this.longText = (collumn, lenght = -1) => {
            this.setStms(collumn);
            if (lenght == -1) {
                this.queryString += `\n${collumn} longtext ${this.stms.def} ${this.stms.com},`;
            }
            else {
                this.queryString += `\n${collumn} longtext(${lenght}) ${this.stms.def} ${this.stms.com},`;
            }
            return this;
        };
        this.date = (collumn, current = true) => {
            this.setStms(collumn);
            if (current) {
                this.queryString += `\n${collumn} date NOT NULL DEFAULT CURRENT_TIMESTAMP,`;
            }
            else {
                this.queryString += `\n${collumn} date DEFAULT NULL,`;
            }
            return this;
        };
        this.timestamp = (collumn, current = true, onUpdate = false) => {
            this.setStms(collumn);
            if (current) {
                this.queryString += `\n${collumn} timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,`;
            }
            else {
                this.queryString += `\n${collumn} timestamp NULL DEFAULT NULL,`;
            }
            if (onUpdate) {
                this.removeLastComma();
                this.queryString += ' ON UPDATE CURRENT_TIMESTAMP,';
            }
            return this;
        };
        this.timestamps = () => {
            this.timestamp('created_at', true);
            this.timestamp('deleted_at', false, false);
            return this;
        };
        this.default = (value) => {
            let def = this.stms.def;
            this.queryString = this.queryString.replace(def, 'DEFAULT ' + value);
            return this;
        };
        this.comment = (comment) => {
            let com = this.stms.com;
            this.queryString = this.queryString.replace(com, "COMMENT '" + comment + "'");
            return this;
        };
        this.unsigned = () => {
            let uns = this.stms.uns;
            this.queryString = this.queryString.replace(uns, "UNSIGNED");
            return this;
        };
        this.increment = () => {
            let inc = this.stms.inc;
            this.primaryKey();
            this.queryString = this.queryString.replace(inc, "AUTO_INCREMENT");
            return this;
        };
        this.primaryKey = () => {
            this.queryString += `\nCONSTRAINT ${this.table}_${this.collumn}_pk PRIMARY KEY (${this.collumn}),`;
            return this;
        };
        this.removeLastComma = () => {
            this.queryString = this.queryString.slice(0, -1);
        };
        this.setStms = (collumn) => {
            this.collumn = collumn;
            this.stms = {
                uns: `:${collumn}UNSIGNED`,
                def: `:${collumn}DEFAULT`,
                com: `:${collumn}COMMENT`,
                inc: `:${collumn}INCREMENT`
            };
        };
        this.drop = (table) => {
            this.queryString = `DROP TABLE IF EXISTS ${table};`;
            db_1.DB.exeQuery(this.queryString);
        };
        this.run = () => {
            this.queryString = this.queryString.replace(/:([^ ]*)INCREMENT/g, '');
            this.queryString = this.queryString.replace(/:([^ ]*)DEFAULT/g, 'NOT NULL');
            this.queryString = this.queryString.replace(/:([^ ]*)COMMENT/g, '');
            this.queryString = this.queryString.replace(/:([^ ]*)UNSIGNED/g, '');
            this.queryString += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;';
            this.queryString = this.queryString.replace(/\,\)/g, '\)');
            db_1.DB.exeQuery(this.queryString);
        };
    }
}
exports.Migration = Migration;
