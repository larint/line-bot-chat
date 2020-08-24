import { Migration } from '../migration'

class TableFriendGraphicsSubscriptions {
    static column = ['id', 'date_update', 'within7days', 'within30days', 'within90days', 'within180days', 'within365days', 'over365days', 'unknown']

    static up = () => {
        let migration = new Migration()

        migration.drop('friend_graphics__subscriptions')
        migration.create('friend_graphics__subscriptions', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.integer('account_id')
            table.string('date_update')
            table.float('within7days').default(0)
            table.float('within30days').default(0)
            table.float('within90days').default(0)
            table.float('within180days').default(0)
            table.float('within365days').default(0)
            table.float('over365days').default(0)
            table.float('unknown').default(0)
        })

    }
}

export { TableFriendGraphicsSubscriptions }
