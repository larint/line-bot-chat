"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelAccounts = void 0;
const base_model_1 = require("./base_model");
const helper_1 = require("../helpers/helper");
class ChannelAccounts extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'channel__accounts';
        this.selectBetweenDate = async (idArr, startDate, endDate) => {
            let ids = idArr.join(',');
            startDate = helper_1.formatDate('YYYY-MM-DD', new Date(startDate));
            endDate = helper_1.formatDate('YYYY-MM-DD', new Date(endDate));
            let accounts = await this.executeQuery(`select * from ${this.table} where id in (${ids}) and start_date >= '${startDate}' and start_date <= '${endDate}'`);
            if (!accounts) {
                return [];
            }
            return accounts;
        };
        this.selectAllStatisticAccount = async () => {
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
        GROUP BY a.id`;
            let accounts = await this.executeQuery(sql);
            if (!accounts) {
                return [];
            }
            return accounts;
        };
        this.selectStatisticBetweenDate = async (accountIds, startDate, endDate) => {
            let ids = (accountIds instanceof Array) ? accountIds.join() : [accountIds];
            startDate = helper_1.formatDate('YYYY-MM-DD', new Date(startDate));
            endDate = helper_1.formatDate('YYYY-MM-DD', new Date(endDate));
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
        GROUP BY b.account_id`;
            let accounts = await this.executeQuery(sql);
            if (!accounts) {
                return [];
            }
            return accounts;
        };
    }
}
exports.ChannelAccounts = ChannelAccounts;
