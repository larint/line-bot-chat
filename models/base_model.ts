import { DB, DataWhere, DataUpdate } from '../helpers/db'

interface FieldDataModel {
    id?: number,
}

class BaseModel {
    protected table: string = ''

    find = async (attrs: number | DataWhere[]) => {
        let where = (typeof attrs == 'number') ? [{ field: 'id', data: attrs }] : attrs

        let res = await this.select(where)
        if (res) {
            return res[0]
        }
        return false
    }

    select = async (attrs: DataWhere[]) => {
        let buildSet = await this.buildSet(attrs)

        return await DB.selectByParams({
            table: this.table,
            where: buildSet.where,
            select: '*',
            set: buildSet.set.replace(',', ' and ')
        })
    }

    selectIn = async (attrs: DataWhere[]) => {
        let data = attrs[0].data
        data = (data instanceof Array) ? data.join() : [data];

        return await this.executeQuery(`select * from ${this.table} where ${attrs[0].field} in (${data})`)
    }

    selectAll = async () => {

        return await DB.selectByParams({
            table: this.table,
            where: [1],
            select: '*',
            set: '?'
        })

    }

    save = async (attrs: DataWhere[]) => {
        let buildSet = await this.buildSet(attrs)

        return await DB.insertItem({
            table: this.table,
            where: buildSet.where,
            set: buildSet.set
        })

    }

    update = async (attrs: DataUpdate[]) => {
        let buildSet = await this.buildSet(attrs, true)

        return await DB.updateItem({
            table: this.table,
            where: buildSet.where,
            set: buildSet.set
        })
    }

    destroy = async (attrs: number | DataWhere[]) => {
        let where = (typeof attrs == 'number') ? [{ field: 'id', data: attrs }] : attrs

        let buildSet = await this.buildSet(where)

        await DB.deleteItem({
            table: this.table,
            where: buildSet.where,
            set: buildSet.set
        })
    }

    private buildSet = async (attrs: DataWhere[], isUpdate: boolean = false) => {
        let wheres: any[] = [],
            sets: any[] = [],
            idField: DataWhere = {}
        for (const it of attrs) {
            if (it.field != 'id') {
                wheres.push(it.field)
                wheres.push(it.data)
                sets.push('?? = ?')
            } else {
                idField = it
            }
        }

        // If it is update, add ID to the key [set]
        if (isUpdate) {
            wheres.push('id')
            wheres.push(idField.data)
        } else if (idField.field) {
            wheres.push(idField.field)
            wheres.push(idField.data)
            sets.push('?? = ?')
        }

        return { where: wheres, set: sets.join() }
    }

    protected executeQuery = (sql: string) => {
        return DB.selectBySql(sql)
    }
}

export { BaseModel, FieldDataModel }