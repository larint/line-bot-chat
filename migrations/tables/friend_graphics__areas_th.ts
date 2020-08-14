import { Migration } from '../migration'

class TableFriendGraphicsAreaTH {
    static table: string = 'friend_graphics__areas_th'
    static column = []
    static areaTrans = {
        // TH
        "unknown": "unknown",
        "Bangkok": "bangkok",
        "Pattaya": "pattaya",
        "Northern": "northern",
        "Central": "central",
        "Southern": "southern",
        "Eastern": "eastern",
        "NorthEastern": "northeastern",
        "Western": "western",
    }

    static up = () => {
        let migration = new Migration()

        migration.drop(TableFriendGraphicsAreaTH.table)
        migration.create(TableFriendGraphicsAreaTH.table, (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('date_update')
            // JP
            let citys = Object.values(TableFriendGraphicsAreaTH.areaTrans)
            citys.map((city) => {
                table.float(city).default(0)
            })

        })

    }
}

export { TableFriendGraphicsAreaTH }