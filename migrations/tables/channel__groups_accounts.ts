import { Migration } from '../migration'

class TableChannelGroupAccount {
    static column = ['id', 'name', 'account_number']

    static up = () => {
        let migration = new Migration()

        migration.drop('channel__groups_accounts')
        migration.create('channel__groups_accounts', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.integer('group_id')
            table.integer('account_id')
            table.timestamps()
        })
    }
}

export { TableChannelGroupAccount }
