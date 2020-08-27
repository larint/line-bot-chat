"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const channel_groups_1 = require("../models/channel_groups");
const messages_broadcast_1 = require("../models/messages_broadcast");
const channel_accounts_1 = require("../models/channel_accounts");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const bot_sdk_1 = require("@line/bot-sdk");
class BroadcastController {
    constructor() {
        this.index = async (req, res) => {
            let accountList = await this.channelAccounts.selectAll();
            let groupList = await this.channelGroups.selectAll();
            return res.render('broadcast/index', { accountList: accountList, groupList: groupList });
        };
        this.sendBroadcast = async (req, res) => {
            let type = req.body.type, message = req.body.message, ids = req.body.id;
            try {
                if (message != '') {
                    if (type == 'account') {
                        let accountList = await this.channelAccounts.selectIn([
                            { field: 'id', data: ids }
                        ]);
                        for (const account of accountList) {
                            let client = new bot_sdk_1.Client({
                                channelAccessToken: account.access_token,
                                channelSecret: account.secret
                            });
                            let jsonMessage = JSON.parse(message);
                            let result = await client.broadcast(jsonMessage);
                            if (result) {
                                await this.messagesBroadcast.save([
                                    { field: 'request_id', data: result['x-line-request-id'] },
                                    { field: 'target', data: account.account_id },
                                    { field: 'type', data: type }
                                ]);
                            }
                        }
                    }
                    else if (type == 'group') {
                        let accountList = await this.channelGroupsAccounts.selectAllAccountInGroup(ids);
                        for (const account of accountList) {
                            let client = new bot_sdk_1.Client({
                                channelAccessToken: account.access_token,
                                channelSecret: account.secret
                            });
                            let jsonMessage = JSON.parse(message);
                            let result = await client.broadcast(jsonMessage);
                            if (result) {
                                await this.messagesBroadcast.save([
                                    { field: 'request_id', data: result['x-line-request-id'] },
                                    { field: 'target', data: account.account_id },
                                    { field: 'type', data: type }
                                ]);
                            }
                        }
                    }
                    else {
                    }
                }
                return res.json({ code: 200, message: '正常に送信されました' });
            }
            catch (error) {
            }
            return res.json({ code: 201, message: '送信できませんでした' });
        };
        this.getListAccountGroup = async (req, res) => {
            let type = req.body.type, template = '', dataFilter = {};
            switch (type) {
                case 'group':
                    let groupList = await this.channelGroups.selectAll();
                    template = 'broadcast/table_group';
                    dataFilter = { groupList: groupList };
                    break;
                case 'account':
                    let accountList = await this.channelAccounts.selectAll();
                    template = 'broadcast/table_account';
                    dataFilter = { accountList: accountList };
                    break;
                default:
                    return res.json({ code: 200, data: '' });
            }
            return res.render(template, dataFilter, async (err, html) => {
                res.json({ code: 200, data: html });
            });
        };
        this.channelAccounts = new channel_accounts_1.ChannelAccounts();
        this.channelGroups = new channel_groups_1.ChannelGroups();
        this.messagesBroadcast = new messages_broadcast_1.MessagesBroadcast();
        this.channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    }
}
exports.default = new BroadcastController;
