import { Migration } from '../migration'

class TableChannelAccount {
    static column = ['id', 'group_id', 'name', 'access_token', 'secret']

    static up = () => {
        let migration = new Migration()

        migration.drop('channel__accounts')
        migration.create('channel__accounts', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('name').default('NULL')
            table.string('access_token', 500)
            table.string('secret')
            table.timestamps()
        })
    }
}

export { TableChannelAccount }
