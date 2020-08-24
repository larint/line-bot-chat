"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendGraphicsApptypes = void 0;
const base_model_1 = require("./base_model");
class FriendGraphicsApptypes extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'friend_graphics__apptypes';
        this.column = ['id', 'account_id', 'date_update', 'ios', 'android', 'others'];
    }
}
exports.FriendGraphicsApptypes = FriendGraphicsApptypes;
