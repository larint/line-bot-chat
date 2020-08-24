"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendGraphicsGenders = void 0;
const base_model_1 = require("./base_model");
class FriendGraphicsGenders extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'friend_graphics__genders';
        this.column = ['id', 'account_id', 'date_update', 'unknown', 'male', 'female'];
    }
}
exports.FriendGraphicsGenders = FriendGraphicsGenders;
