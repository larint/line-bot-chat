import { Migration } from '../migration'

class TableChannelAccount {
    static column = ['id', 'name', 'access_token', 'secret', 'create_at']

    static up = () => {
        let migration = new Migration()

        migration.drop('channel_accounts')
        migration.create('channel_accounts', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('name').default('NULL')
            table.string('access_token', 500)
            table.string('secret')
            table.timestamps()
        })
    }
}

export { TableChannelAccount }
