"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGroups = void 0;
const base_model_1 = require("./base_model");
const helper_1 = require("../helpers/helper");
class ChannelGroups extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'channel__groups';
        this.getAccountStatisticBetweenDate = async (groupId, startDate, endDate) => {
            startDate = helper_1.formatDate('YYYY-MM-DD', new Date(startDate));
            endDate = helper_1.formatDate('YYYY-MM-DD', new Date(endDate));
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
            GROUP BY c.account_id`;
            let accounts = await this.executeQuery(sql);
            if (!accounts) {
                return [];
            }
            return accounts;
        };
    }
}
exports.ChannelGroups = ChannelGroups;
