"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsGenders = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsGenders {
}
exports.TableFriendGraphicsGenders = TableFriendGraphicsGenders;
TableFriendGraphicsGenders.column = ['id', 'date_update', 'unknown', 'male', 'female'];
TableFriendGraphicsGenders.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('friend_graphics__genders');
    migration.create('friend_graphics__genders', (table) => {
        table.integer('id').unsigned().increment();
        table.string('date_update');
        table.float('unknown').default(0);
        table.float('male').default(0);
        table.float('female').default(0);
    });
};
