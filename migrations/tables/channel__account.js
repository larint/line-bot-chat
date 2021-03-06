"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableChannelAccount = void 0;
const migration_1 = require("../migration");
class TableChannelAccount {
}
exports.TableChannelAccount = TableChannelAccount;
TableChannelAccount.column = ['id', 'name', 'line_account', 'account_id', 'duration', 'friends', 'target_reach', 'block', 'block_rate', 'access_token', 'secret', 'start_date'];
TableChannelAccount.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('channel__accounts');
    migration.create('channel__accounts', (table) => {
        table.integer('id').unsigned().increment();
        table.string('name').default('NULL');
        table.string('line_account').default('NULL');
        table.string('account_id').default('NULL');
        table.integer('duration').default(0);
        table.integer('friends').default(0);
        table.integer('target_reach').default(0);
        table.integer('block').default(0);
        table.float('block_rate').default(0);
        table.string('access_token', 500);
        table.string('secret');
        table.date('start_date', false);
        table.timestamps();
    });
};
