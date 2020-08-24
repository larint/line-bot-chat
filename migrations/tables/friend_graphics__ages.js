"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsAges = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsAges {
}
exports.TableFriendGraphicsAges = TableFriendGraphicsAges;
TableFriendGraphicsAges.column = ['id', 'date_update', 'unknown', 'from0to14', 'from15to19', 'from20to24', 'from25to29', 'from30to34', 'from35to39', 'from40to44', 'from45to49', 'from50'];
TableFriendGraphicsAges.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('friend_graphics__ages');
    migration.create('friend_graphics__ages', (table) => {
        table.integer('id').unsigned().increment();
        table.integer('account_id');
        table.string('date_update');
        table.float('unknown').default(0);
        table.float('from0to14').default(0);
        table.float('from15to19').default(0);
        table.float('from20to24').default(0);
        table.float('from25to29').default(0);
        table.float('from30to34').default(0);
        table.float('from35to39').default(0);
        table.float('from40to44').default(0);
        table.float('from45to49').default(0);
        table.float('from50').default(0);
    });
};
