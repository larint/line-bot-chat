"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableMessagesBroadcast = void 0;
const migration_1 = require("../migration");
class TableMessagesBroadcast {
}
exports.TableMessagesBroadcast = TableMessagesBroadcast;
TableMessagesBroadcast.column = ['id', 'request_id', 'target', 'type'];
TableMessagesBroadcast.up = () => {
    let migration = new migration_1.Migration();
    migration.drop('messages_broadcast');
    migration.create('messages_broadcast', (table) => {
        table.integer('id').unsigned().increment();
        table.string('request_id').default('NULL');
        table.string('target').default('NULL');
        table.string('type').default('NULL');
        table.timestamp('created_at');
    });
};
