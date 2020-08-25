import { Migration } from '../migration'

class TableChannelAccount {
    static column = ['id', 'group_id', 'name', 'access_token', 'secret']

    static up = () => {
        let migration = new Migration()

        migration.drop('channel__accounts')
        migration.create('channel__accounts', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('name').default('NULL')
            table.string('line_account').default('NULL')
            table.string('account_id').default('NULL')
            table.integer('duration').default(0)
            table.integer('friends').default(0)
            table.integer('target_reach').default(0)
            table.integer('block').default(0)
            table.float('block_rate').default(0)
            table.string('access_token', 500)
            table.string('secret')
            table.date('start_date', false)
            table.timestamps()
        })
    }
}

export { TableChannelAccount }
