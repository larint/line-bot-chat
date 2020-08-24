"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendGraphicsSubscriptions = void 0;
const base_model_1 = require("./base_model");
class FriendGraphicsSubscriptions extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'friend_graphics__subscriptions';
        this.column = ['id', 'account_id', 'date_update', 'within7days', 'within30days', 'within90days', 'within180days', 'within365days', 'over365days', 'unknown'];
    }
}
exports.FriendGraphicsSubscriptions = FriendGraphicsSubscriptions;
