"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGroupsAccounts = void 0;
const base_model_1 = require("./base_model");
class ChannelGroupsAccounts extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'channel__groups_accounts';
    }
}
exports.ChannelGroupsAccounts = ChannelGroupsAccounts;
