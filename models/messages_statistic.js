"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatistic = void 0;
const base_model_1 = require("./base_model");
class MessageStatistic extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'messages_statistic';
        this.getMaxDateUpdateOnAccount = async (acountId) => {
            let data = await this.executeQuery(`SELECT account_id, MAX(date_update) as date_update FROM messages_statistic WHERE account_id = ${acountId}`);
            return data[0].date_update ? data[0].date_update : false;
        };
    }
}
exports.MessageStatistic = MessageStatistic;
