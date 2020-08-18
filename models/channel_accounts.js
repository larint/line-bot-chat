"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelAccounts = void 0;
const base_model_1 = require("./base_model");
class ChannelAccounts extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'channel__accounts';
    }
}
exports.ChannelAccounts = ChannelAccounts;
