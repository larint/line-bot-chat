"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableChannelGroup = void 0;
const migration_1 = require("../migration");
class TableChannelGroup {
}
exports.TableChannelGroup = TableChannelGroup;
TableChannelGroup.column = ['id', 'name', 'account_number'];
TableChannelGroup.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('channel__groups');
    migration.create('channel__groups', (table) => {
        table.integer('id').unsigned().increment();
        table.string('name').default('NULL');
        table.integer('account_number').default(0);
        table.timestamps();
    });
};
