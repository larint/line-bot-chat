import { Migration } from '../migration'

class TableMessagesStatistic {
    static column = []

    static up = () => {
        let migration = new Migration()

        migration.drop('messages_statistic')
        migration.create('messages_statistic', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.integer('account_id')
            table.string('date_update')
            table.string('reply_status').default('NULL')
            table.integer('reply_number').default(0)
            table.string('push_status').default('NULL')
            table.integer('push_number').default(0)
            table.string('multicast_status').default('NULL')
            table.integer('multicast_number').default(0)
            table.string('broadcast_status').default('NULL')
            table.integer('broadcast_number').default(0)
            table.string('deliveries_status').default(0)
            table.integer('deliveries_broadcast').default(0)
            table.integer('deliveries_targeting').default(0)
            table.integer('deliveries_auto_response').default(0)
            table.integer('deliveries_welcome_response').default(0)
            table.integer('deliveries_chat').default(0)
            table.integer('friends').default(0)
            table.integer('target_reach').default(0)
            table.integer('block').default(0)
            table.float('block_rate').default(0)
        })

    }
}

export { TableMessagesStatistic }
