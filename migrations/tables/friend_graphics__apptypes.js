"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsApptypes = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsApptypes {
}
exports.TableFriendGraphicsApptypes = TableFriendGraphicsApptypes;
TableFriendGraphicsApptypes.column = ['id', 'date_update', 'ios', 'android', 'others'];
TableFriendGraphicsApptypes.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('friend_graphics__apptypes');
    migration.create('friend_graphics__apptypes', (table) => {
        table.integer('id').unsigned().increment();
        table.string('date_update');
        table.float('ios').default(0);
        table.float('android').default(0);
        table.float('others').default(0);
    });
};
