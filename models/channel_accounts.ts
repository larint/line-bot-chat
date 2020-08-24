import { BaseModel, FieldDataModel } from './base_model'
import { formatDate } from '../helpers/helper'

interface FieldChannelAccount extends FieldDataModel {
    name: string,
    line_account: string,
    account_id: string,
    access_token: string,
    secret: string,
    start_date: Date,
}

class ChannelAccounts extends BaseModel {
    protected table: string = 'channel__accounts'

    selectBetweenDate = async (idArr: number[], startDate: string, endDate: string) => {
        let ids = idArr.join(',')
        startDate = formatDate('YYYY-MM-DD', new Date(startDate))
        endDate = formatDate('YYYY-MM-DD', new Date(endDate))
        let accounts = await this.executeQuery(`select * from ${this.table} where id in (${ids}) and start_date >= '${startDate}' and start_date <= '${endDate}'`)
        if (!accounts) {
            return []
        }
        return accounts
    }
}

export { ChannelAccounts, FieldChannelAccount }