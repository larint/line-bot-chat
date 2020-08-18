import { Migration } from '../migration'

class TableChannelGroup {
    static column = ['id', 'name', 'account_number']

    static up = () => {
        let migration = new Migration()

        migration.drop('channel__groups')
        migration.create('channel__groups', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('name').default('NULL')
            table.integer('account_number').default(0)
            table.timestamps()
        })
    }
}

export { TableChannelGroup }
