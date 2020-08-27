"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesBroadcast = void 0;
const base_model_1 = require("./base_model");
class MessagesBroadcast extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'messages_broadcast';
    }
}
exports.MessagesBroadcast = MessagesBroadcast;
