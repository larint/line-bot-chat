"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatistic = void 0;
const base_model_1 = require("./base_model");
class MessageStatistic extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'messages_statistic';
    }
}
exports.MessageStatistic = MessageStatistic;
