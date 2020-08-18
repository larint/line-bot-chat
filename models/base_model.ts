import { DB } from '../helpers/db'
import { DataColumn } from '../helpers/type'

class BaseModel {
    protected table: string = ''

    find = async (attrs: DataColumn) => {
        let res = await this.select([attrs])
        if(res) {
            return res[0]
        }
        return false
    }

    select = async (attrs: DataColumn[]) => {
        let buildSet = await this.buildSet(attrs)

        return await DB.selectByParams({
            table: this.table,
            where: buildSet.where,
            select: '*',
            set: buildSet.set
        })
    }

    selectIn = async (attrs: DataColumn[]) => {
        let buildSet = await this.buildSet(attrs)

        return await DB.selectBySql(`select * from ${this.table} where  ${attrs[0].field} in (${attrs[0].data})`)
    }

    selectAll = async () => {

        return await DB.selectByParams({
            table: this.table,
            where: [1],
            select: '*',
            set: '?'
        })

    }

    save = async (attrs: DataColumn[]) => {
        let buildSet = await this.buildSet(attrs)

        return await DB.insertItem({
            table: this.table,
            where: buildSet.where,
            set: buildSet.set
        })

    }

    destroy = async (attrs: DataColumn[]) => {
        let buildSet = await this.buildSet(attrs)

        await DB.deleteItem({
            table: this.table,
            where: buildSet.where,
            set: buildSet.set
        })
    }

    private buildSet = async (attrs: DataColumn[]) => {
        let wheres: any[] = [], sets: any[] = []
        for (const it of attrs) {
            wheres.push(it.field)
            wheres.push(it.data)
            sets.push('?? = ?')
        }

        return { where: wheres, set: sets.join() }
    }
}

export { BaseModel }