import { Migration } from '../migration'

class TableMessagesBroadcast {
    static column = ['id', 'request_id', 'target', 'type']

    static up = () => {
        let migration = new Migration()

        migration.drop('messages_broadcast')
        migration.create('messages_broadcast', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('request_id').default('NULL')
            table.string('target').default('NULL')
            table.string('type').default('NULL')
            table.timestamp('created_at')
        })
    }
}

export { TableMessagesBroadcast }
