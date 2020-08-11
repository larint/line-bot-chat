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
        table.string('date_update');
        table.integer('within7days').default(0);
        table.integer('within30days').default(0);
        table.integer('within90days').default(0);
        table.integer('within180days').default(0);
        table.integer('within365days').default(0);
        table.integer('over365days').default(0);
        table.integer('unknown').default(0);
    });
};
