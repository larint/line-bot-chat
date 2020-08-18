"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelController = void 0;
const channel_groups_1 = require("../models/channel_groups");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const channel_accounts_1 = require("../models/channel_accounts");
class ChannelController {
}
exports.ChannelController = ChannelController;
ChannelController.index = async (req, res) => {
    let channelAccounts = new channel_accounts_1.ChannelAccounts();
    let channelGroups = new channel_groups_1.ChannelGroups();
    let accounts = await channelAccounts.selectAll();
    let groups = await channelGroups.selectAll();
    return res.render('channel', { accounts: accounts, groups: groups });
};
ChannelController.addAccount = async (req, res) => {
    let channelConfig = req.body;
    if (!channelConfig.name || !channelConfig.access_token || !channelConfig.secret) {
    }
    else {
        let channelAccounts = new channel_accounts_1.ChannelAccounts();
        await channelAccounts.save([
            { field: 'name', data: channelConfig.name },
            { field: 'access_token', data: channelConfig.access_token },
            { field: 'secret', data: channelConfig.secret }
        ]);
    }
    return res.redirect('back');
};
ChannelController.deleteAccount = async (req, res) => {
    let id = req.params.id;
    let channelAccounts = new channel_accounts_1.ChannelAccounts();
    await channelAccounts.destroy([
        { field: 'id', data: id }
    ]);
    return res.redirect('back');
};
ChannelController.createGroup = async (req, res) => {
    let ids = req.body.id;
    let name_group = req.body.name_group;
    let channelGroups = new channel_groups_1.ChannelGroups();
    let channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    let group = await channelGroups.save([
        { field: 'name', data: name_group },
        { field: 'account_number', data: ids.length }
    ]);
    if (group) {
        for (const id of ids) {
            await channelGroupsAccounts.save([
                { field: 'group_id', data: group.insertId },
                { field: 'account_id', data: id }
            ]);
        }
    }
    return res.redirect('channel');
};
ChannelController.deleteGroup = async (req, res) => {
    let id = req.params.id;
    let channelGroups = new channel_groups_1.ChannelGroups();
    let channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    await channelGroupsAccounts.destroy([
        { field: 'group_id', data: id }
    ]);
    await channelGroups.destroy([
        { field: 'id', data: id }
    ]);
    return res.redirect('back');
};
ChannelController.groupDetail = async (req, res) => {
    let id = req.params.id;
    let channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    let channelAccounts = new channel_accounts_1.ChannelAccounts();
    let groups = await channelGroupsAccounts.select([
        { field: 'group_id', data: id }
    ]);
    let accounts = await channelAccounts.selectIn([
        { field: 'id', data: [1, 2] }
    ]);
    return res.render('group_detail', { accounts: accounts });
};
ChannelController.exportDataInGroup = async (req, res) => {
    return res.redirect('back');
};
