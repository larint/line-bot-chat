import { Migration } from '../migration'

class TableFriendGraphicsGenders {
    static column = ['id', 'date_update', 'unknown', 'male', 'female']

    static up = () => {
        let migration = new Migration()

        migration.drop('friend_graphics__genders')
        migration.create('friend_graphics__genders', (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('date_update')
            table.integer('unknown').default(0)
            table.integer('male').default(0)
            table.integer('female').default(0)
        })
    }
}

export { TableFriendGraphicsGenders }
