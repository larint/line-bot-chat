import { BaseModel } from './base_model'
import { formatDate } from '../helpers/helper'

class ChannelGroups extends BaseModel {
    protected table: string = 'channel__groups'

    getAccountStatisticBetweenDate = async (groupId: number, startDate: string, endDate: string) => {
        startDate = formatDate('YYYYMMDD', new Date(startDate))
        endDate = formatDate('YYYYMMDD', new Date(endDate))

        let sql = `SELECT 
                b.*,
                MAX(c.friends) as friends_date_range,
                MAX(c.target_reach) as target_reach_date_range,
                SUM(c.reply_number) as total_reply,
                SUM(c.push_number) as total_push,
                SUM(c.multicast_number) as total_multicast,
                SUM(c.broadcast_number) as total_broadcast,
                SUM(c.deliveries_broadcast) as total_deliveries_broadcast,
                SUM(c.deliveries_targeting) as total_deliveries_targeting,
                SUM(c.deliveries_auto_response) as total_deliveries_auto_response,
                SUM(c.deliveries_welcome_response) as total_deliveries_welcome_response,
                SUM(c.deliveries_chat) as total_deliveries_chat,
                SUM(c.friends * c.deliveries_broadcast) as delivery_count
            FROM channel__groups_accounts as a LEFT JOIN channel__accounts as b 
            ON a.account_id = b.id
            LEFT JOIN messages_statistic as c
            ON b.id = c.account_id 
            WHERE a.group_id = ${groupId} and c.date_update >= '${startDate}' and c.date_update <= '${endDate}'
            GROUP BY c.account_id`

        let accounts = await this.executeQuery(sql)
        if (!accounts) {
            return []
        }
        return accounts
    }

}

export { ChannelGroups }