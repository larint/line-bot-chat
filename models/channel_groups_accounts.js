"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGroupsAccounts = void 0;
const base_model_1 = require("./base_model");
class ChannelGroupsAccounts extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'channel__groups_accounts';
        this.selectAllAccountInGroup = async (groupIds) => {
            let ids = groupIds.join();
            let sql = `SELECT DISTINCT(b.id), b.* FROM channel__groups_accounts as a LEFT JOIN channel__accounts as b
            ON a.account_id = b.id
            WHERE a.group_id in (${ids})`;
            let accounts = await this.executeQuery(sql);
            if (!accounts) {
                return [];
            }
            return accounts;
        };
    }
}
exports.ChannelGroupsAccounts = ChannelGroupsAccounts;
