"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableChannelGroupAccount = void 0;
const migration_1 = require("../migration");
class TableChannelGroupAccount {
}
exports.TableChannelGroupAccount = TableChannelGroupAccount;
TableChannelGroupAccount.column = ['id', 'name', 'account_number'];
TableChannelGroupAccount.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('channel__groups_accounts');
    migration.create('channel__groups_accounts', (table) => {
        table.integer('id').unsigned().increment();
        table.integer('group_id');
        table.integer('account_id');
        table.timestamps();
    });
};
