"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendGraphicsAges = void 0;
const base_model_1 = require("./base_model");
class FriendGraphicsAges extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'friend_graphics__ages';
        this.column = ['id', 'account_id', 'date_update', 'unknown', 'from0to14', 'from15to19', 'from20to24', 'from25to29', 'from30to34', 'from35to39', 'from40to44', 'from45to49', 'from50'];
    }
}
exports.FriendGraphicsAges = FriendGraphicsAges;
