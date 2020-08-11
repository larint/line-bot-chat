import { DB } from '../helpers/db'

export interface Statement {
    uns?: string,
    def?: string,
    com?: string,
    inc?: string,
}

class Migration {

    queryString: string = ''
    queryAlter: string = ''
    table: string = ''
    collumn: string = ''
    stms: Statement = {}

    create = (table: string, callback: any) => {
        this.table = table
        this.queryString = '\nCREATE TABLE `' + table + '` ('
        callback(this)
        this.run()
    }

    integer = (collumn: string) => {
        this.setStms(collumn)
        this.queryString += `\n${collumn} int(11) ${this.stms.uns} ${this.stms.def} ${this.stms.com} ${this.stms.inc},`
        return this;
    }

    tinyInteger = (collumn: string) => {
        this.setStms(collumn)
        this.queryString += `\n${collumn} tinyint(4) ${this.stms.def} ${this.stms.com},`
        return this
    }

    string = (collumn: string, lenght: number = 255) => {
        this.setStms(collumn)
        this.queryString += `\n${collumn} varchar(${lenght}) ${this.stms.def} ${this.stms.com},`
        return this
    }

    text = (collumn: string, lenght: number = -1) => {
        this.setStms(collumn)
        if (lenght == -1) {
            this.queryString += `\n${collumn} text ${this.stms.def} ${this.stms.com},`
        } else {
            this.queryString += `\n${collumn} text(${lenght}) ${this.stms.def} ${this.stms.com},`
        }

        return this
    }

    longText = (collumn: string, lenght: number = -1) => {
        this.setStms(collumn)
        if (lenght == -1) {
            this.queryString += `\n${collumn} longtext ${this.stms.def} ${this.stms.com},`
        } else {
            this.queryString += `\n${collumn} longtext(${lenght}) ${this.stms.def} ${this.stms.com},`
        }

        return this
    }

    timestamp = (collumn: string, current: boolean = true, onUpdate: boolean = false) => {
        this.setStms(collumn)
        if (current) {
            this.queryString += `\n${collumn} timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,`
        } else {
            this.queryString += `\n${collumn} timestamp NULL DEFAULT NULL,`
        }

        if (onUpdate) {
            this.removeLastComma()
            this.queryString += ' ON UPDATE CURRENT_TIMESTAMP,'
        }

        return this
    }

    timestamps = () => {
        this.timestamp('created_at', true)
        this.timestamp('deleted_at', false, false)
        return this
    }

    //////////////////////////////////////// alter table
    default = (value: string | number | boolean) => {
        let def: any = this.stms.def
        this.queryString = this.queryString.replace(def, 'DEFAULT ' + value)
        return this
    }

    comment = (comment: string) => {
        let com: any = this.stms.com
        this.queryString = this.queryString.replace(com, "COMMENT '" + comment + "'")
        return this
    }

    unsigned = () => {
        let uns: any = this.stms.uns
        this.queryString = this.queryString.replace(uns, "UNSIGNED")
        return this
    }

    increment = () => {
        let inc: any = this.stms.inc
        this.primaryKey()
        this.queryString = this.queryString.replace(inc, "AUTO_INCREMENT")
        return this
    }

    primaryKey = () => {
        this.queryString += `\nCONSTRAINT ${this.table}_${this.collumn}_pk PRIMARY KEY (${this.collumn}),`
        return this
    }

    removeLastComma = () => {
        this.queryString = this.queryString.slice(0, -1) // remove character,
    }

    setStms = (collumn: string) => {
        this.collumn = collumn
        this.stms = {
            uns: `:${collumn}UNSIGNED`,
            def: `:${collumn}DEFAULT`,
            com: `:${collumn}COMMENT`,
            inc: `:${collumn}INCREMENT`
        }
    }


    drop = (table: string) => {
        this.queryString = `DROP TABLE IF EXISTS ${table};`
        DB.exeQuery(this.queryString)
    }

    run = () => {
        this.queryString = this.queryString.replace(/:([^ ]*)INCREMENT/g, '')
        this.queryString = this.queryString.replace(/:([^ ]*)DEFAULT/g, 'NOT NULL')
        this.queryString = this.queryString.replace(/:([^ ]*)COMMENT/g, '')
        this.queryString = this.queryString.replace(/:([^ ]*)UNSIGNED/g, '')
        this.queryString += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
        this.queryString = this.queryString.replace(/\,\)/g, '\)')

        DB.exeQuery(this.queryString)
    }
}

export { Migration }

// CREATE TABLE `friend_graphics__genders` (
//     id_friend_graphics int(11) :id_friend_graphicsUNSIGNED :id_friend_graphicsDEFAULT :id_friend_graphicsCOMMENT ,
//     unknown int(11) :unknownUNSIGNED DEFAULT 0 :unknownCOMMENT ,
//     thumbnail varchar(255) DEFAULT NULL :thumbnailCOMMENT,