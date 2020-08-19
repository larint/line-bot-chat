"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelController = void 0;
const channel_groups_1 = require("../models/channel_groups");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const channel_accounts_1 = require("../models/channel_accounts");
class ChannelController {
    constructor() {
        this.index = async (req, res) => {
            let accounts = await this.channelAccounts.selectAll();
            let groups = await this.channelGroups.selectAll();
            return res.render('channels/index', { accounts: accounts, groups: groups });
        };
        this.addAccount = async (req, res) => {
            let channelConfig = req.body;
            if (!channelConfig.name || !channelConfig.access_token || !channelConfig.secret) {
            }
            else {
                await this.channelAccounts.save([
                    { field: 'name', data: channelConfig.name },
                    { field: 'access_token', data: channelConfig.access_token },
                    { field: 'secret', data: channelConfig.secret }
                ]);
            }
            return res.redirect('back');
        };
        this.deleteAccount = async (req, res) => {
            let id = req.params.id;
            await this.channelAccounts.destroy([
                { field: 'id', data: id }
            ]);
            return res.redirect('back');
        };
        this.createGroup = async (req, res) => {
            let ids = req.body.id;
            let name_group = req.body.name_group;
            let group = await this.channelGroups.save([
                { field: 'name', data: name_group },
                { field: 'account_number', data: ids.length }
            ]);
            if (group) {
                for (const id of ids) {
                    await this.channelGroupsAccounts.save([
                        { field: 'group_id', data: group.insertId },
                        { field: 'account_id', data: id }
                    ]);
                }
            }
            return res.redirect('channel');
        };
        this.deleteGroup = async (req, res) => {
            let id = req.params.id;
            await this.channelGroupsAccounts.destroy([
                { field: 'group_id', data: id }
            ]);
            await this.channelGroups.destroy([
                { field: 'id', data: id }
            ]);
            return res.redirect('back');
        };
        this.groupDetail = async (req, res) => {
            let id = req.params.id;
            let group = await this.channelGroups.find({ field: 'id', data: id });
            let groups = await this.channelGroupsAccounts.select([
                { field: 'group_id', data: id }
            ]);
            let accounts = await this.channelAccounts.selectIn([
                { field: 'id', data: [1, 2] }
            ]);
            return res.render('channels/group_detail', { accounts: accounts, group: group });
        };
        this.exportDataInGroup = async (req, res) => {
            return res.redirect('back');
        };
        this.channelAccounts = new channel_accounts_1.ChannelAccounts();
        this.channelGroups = new channel_groups_1.ChannelGroups();
        this.channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    }
}
exports.ChannelController = ChannelController;
