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

    selectAllStatisticAccount = async () => {
        let sql = `SELECT 
            a.*, 
            SUM(b.reply_number) as total_reply, 
            SUM(b.push_number) as total_push, 
            SUM(b.multicast_number) as total_multicast, 
            SUM(b.broadcast_number) as total_broadcast, 
            SUM(b.deliveries_broadcast) as total_deliveries_broadcast, 
            SUM(b.deliveries_targeting) as total_deliveries_targeting, 
            SUM(b.deliveries_auto_response) as total_deliveries_auto_response, 
            SUM(b.deliveries_welcome_response) as total_deliveries_welcome_response, 
            SUM(b.deliveries_chat) as total_deliveries_chat, 
            SUM(b.friends * b.deliveries_broadcast) as delivery_count
        FROM channel__accounts as a LEFT JOIN messages_statistic as b 
        on a.id = b.account_id 
        GROUP BY a.id`

        let accounts = await this.executeQuery(sql)
        if (!accounts) {
            return []
        }
        return accounts
    }

    /**
     * Get the account's message statistics on the period of time. 
     * @param accountIds 
     * @param startDate 
     * @param endDate 
     */
    selectStatisticBetweenDate = async (accountIds: number[], startDate: string, endDate: string) => {
        let ids = (accountIds instanceof Array) ? accountIds.join() : [accountIds]

        startDate = formatDate('YYYY-MM-DD', new Date(startDate))
        endDate = formatDate('YYYY-MM-DD', new Date(endDate))

        let sql = `SELECT 
            a.*, 
            SUM(b.reply_number) as total_reply, 
            SUM(b.push_number) as total_push, 
            SUM(b.multicast_number) as total_multicast, 
            SUM(b.broadcast_number) as total_broadcast, 
            SUM(b.deliveries_broadcast) as total_deliveries_broadcast, 
            SUM(b.deliveries_targeting) as total_deliveries_targeting, 
            SUM(b.deliveries_auto_response) as total_deliveries_auto_response, 
            SUM(b.deliveries_welcome_response) as total_deliveries_welcome_response, 
            SUM(b.deliveries_chat) as total_deliveries_chat, 
            SUM(b.friends * b.deliveries_broadcast) as delivery_count
        FROM channel__accounts as a LEFT JOIN messages_statistic as b 
        on a.id = b.account_id 
        WHERE b.account_id in (${ids}) and b.date_update >= '${startDate}' and b.date_update <= '${endDate}' 
        GROUP BY b.account_id`

        let accounts = await this.executeQuery(sql)
        if (!accounts) {
            return []
        }
        return accounts
    }
}

export { ChannelAccounts, FieldChannelAccount }