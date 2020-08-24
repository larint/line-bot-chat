"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsAreaID = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsAreaID {
}
exports.TableFriendGraphicsAreaID = TableFriendGraphicsAreaID;
TableFriendGraphicsAreaID.table = 'friend_graphics__areas_id';
TableFriendGraphicsAreaID.column = [];
TableFriendGraphicsAreaID.areaTrans = {
    "unknown": "unknown",
    "Bali": "bali",
    "Bandung": "bandung",
    "Banjarmasin": "banjarmasin",
    "Jabodetabek": "jabodetabek",
    "Makassar": "makassar",
    "Medan": "medan",
    "Palembang": "palembang",
    "Samarinda": "samarinda",
    "Semarang": "semarang",
    "Surabaya": "surabaya",
    "Yogyakarta": "yogyakarta",
    "Lainnya": "lainnya",
};
TableFriendGraphicsAreaID.up = () => {
    let migration = new migration_1.Migration();
    migration.drop(TableFriendGraphicsAreaID.table);
    migration.create(TableFriendGraphicsAreaID.table, (table) => {
        table.integer('id').unsigned().increment();
        table.integer('account_id');
        table.string('date_update');
        let citys = Object.values(TableFriendGraphicsAreaID.areaTrans);
        citys.map((city) => {
            table.float(city).default(0);
        });
    });
};
