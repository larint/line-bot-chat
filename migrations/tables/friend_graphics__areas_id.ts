import { Migration } from '../migration'

class TableFriendGraphicsAreaID {
    static table: string = 'friend_graphics__areas_id'
    static column = []
    static areaTrans = {
        // ID
        "unknown": "unknown",
        "Bali": "bali",
        "Bandung": "bandung",
        "Banjarmasin": "banjarmasin",
        "Jabodetabek": "jabodetabek",
        "Makassar": "makassar",
        "Medan": "medan",
        "Palembang": "palembang",
        "Samarinda": "samarinda",
        "Semarang": "semarang",
        "Surabaya": "surabaya",
        "Yogyakarta": "yogyakarta",
        "Lainnya": "lainnya",
    }

    static up = () => {
        let migration = new Migration()

        migration.drop(TableFriendGraphicsAreaID.table)
        migration.create(TableFriendGraphicsAreaID.table, (table: Migration) => {
            table.integer('id').unsigned().increment()
            table.string('date_update')
            // JP
            let citys = Object.values(TableFriendGraphicsAreaID.areaTrans)
            citys.map((city) => {
                table.float(city).default(0)
            })

        })

    }
}

export { TableFriendGraphicsAreaID }