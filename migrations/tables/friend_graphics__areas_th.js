"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsAreaTH = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsAreaTH {
}
exports.TableFriendGraphicsAreaTH = TableFriendGraphicsAreaTH;
TableFriendGraphicsAreaTH.table = 'friend_graphics__areas_th';
TableFriendGraphicsAreaTH.column = [];
TableFriendGraphicsAreaTH.areaTrans = {
    "unknown": "unknown",
    "Bangkok": "bangkok",
    "Pattaya": "pattaya",
    "Northern": "northern",
    "Central": "central",
    "Southern": "southern",
    "Eastern": "eastern",
    "NorthEastern": "northeastern",
    "Western": "western",
};
TableFriendGraphicsAreaTH.up = () => {
    let migration = new migration_1.Migration();
    migration.drop(TableFriendGraphicsAreaTH.table);
    migration.create(TableFriendGraphicsAreaTH.table, (table) => {
        table.integer('id').unsigned().increment();
        table.integer('account_id');
        table.string('date_update');
        let citys = Object.values(TableFriendGraphicsAreaTH.areaTrans);
        citys.map((city) => {
            table.float(city).default(0);
        });
    });
};
