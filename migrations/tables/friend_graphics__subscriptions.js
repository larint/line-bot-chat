"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFriendGraphicsSubscriptions = void 0;
const migration_1 = require("../migration");
class TableFriendGraphicsSubscriptions {
}
exports.TableFriendGraphicsSubscriptions = TableFriendGraphicsSubscriptions;
TableFriendGraphicsSubscriptions.column = ['id', 'date_update', 'within7days', 'within30days', 'within90days', 'within180days', 'within365days', 'over365days', 'unknown'];
TableFriendGraphicsSubscriptions.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('friend_graphics__subscriptions');
    migration.create('friend_graphics__subscriptions', (table) => {
        table.integer('id').unsigned().increment();
        table.integer('account_id');
        table.string('date_update');
        table.float('within7days').default(0);
        table.float('within30days').default(0);
        table.float('within90days').default(0);
        table.float('within180days').default(0);
        table.float('within365days').default(0);
        table.float('over365days').default(0);
        table.float('unknown').default(0);
    });
};
