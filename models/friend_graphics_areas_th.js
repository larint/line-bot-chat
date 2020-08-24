"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendGraphicsAreasTH = void 0;
const base_model_1 = require("./base_model");
class FriendGraphicsAreasTH extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'friend_graphics__areas_th';
        this.column = [];
        this.areaTrans = {
            "unknown": "unknown",
            "Bangkok": "bangkok",
            "Pattaya": "pattaya",
            "Northern": "northern",
            "Central": "central",
            "Southern": "southern",
            "Eastern": "eastern",
            "NorthEastern": "northeastern",
            "Western": "western",
        };
    }
}
exports.FriendGraphicsAreasTH = FriendGraphicsAreasTH;
