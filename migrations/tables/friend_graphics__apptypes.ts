import { Migration } from '../migration'

class TableFriendGraphicsApptypes {
    static column = ['id', 'date_update', 'ios', 'android', 'others']

    static up = () => {
        let migration = new Migration()

        migration.drop('friend_graphics__apptypes')
        migration.create('friend_graphics__apptypes', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('date_update')
            table.integer('ios').default(0)
            table.integer('android').default(0)
            table.integer('others').default(0)
        })
    }
}

export { TableFriendGraphicsApptypes }
