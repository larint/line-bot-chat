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
    }
}
exports.ChannelAccounts = ChannelAccounts;
