import { Migration } from '../migration'

class TableFriendGraphicsAges {
    static column = ['id', 'date_update', 'unknown', 'from0to14', 'from15to19', 'from20to24', 'from25to29', 'from30to34', 'from35to39', 'from40to44', 'from45to49', 'from50']

    static up = () => {
        let migration = new Migration()

        migration.drop('friend_graphics__ages')
        migration.create('friend_graphics__ages', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('date_update')
            table.integer('unknown').default(0)
            table.integer('from0to14').default(0)
            table.integer('from15to19').default(0)
            table.integer('from20to24').default(0)
            table.integer('from25to29').default(0)
            table.integer('from30to34').default(0)
            table.integer('from35to39').default(0)
            table.integer('from40to44').default(0)
            table.integer('from45to49').default(0)
            table.integer('from50').default(0)
        })
    }
}

export { TableFriendGraphicsAges }
