"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGroups = void 0;
const base_model_1 = require("./base_model");
class ChannelGroups extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.table = 'channel__groups';
    }
}
exports.ChannelGroups = ChannelGroups;
