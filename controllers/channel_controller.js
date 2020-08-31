"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_sdk_1 = require("@line/bot-sdk");
const helper_1 = require("../helpers/helper");
const channel_groups_1 = require("../models/channel_groups");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const channel_accounts_1 = require("../models/channel_accounts");
class ChannelController {
    constructor() {
        this.index = async (req, res) => {
            let accountList = await this.channelAccounts.selectAllStatisticAccount();
            let groupList = await this.channelGroups.selectAll();
            return res.render('channels/index', { accountList: accountList, groupList: groupList });
        };
        this.addAccount = async (req, res) => {
            let data = req.body;
            if (!data.name || !data.access_token || !data.secret || !data.start_date) {
            }
            else {
                let client = new bot_sdk_1.Client({
                    channelAccessToken: data.access_token,
                    channelSecret: data.secret
                });
                let currentDate = helper_1.formatDate('YYYYMMDD', new Date(data.start_date));
                let follower = { status: 'unready', blocks: 0, targetedReaches: 0, followers: 0, block_rate: 0 };
                try {
                    follower = await client.getNumberOfFollowers(currentDate);
                    let blocks = follower.blocks;
                    let targetedReaches = follower.targetedReaches;
                    follower.block_rate = targetedReaches > 0 ? helper_1.round(blocks / targetedReaches * 100) : 0;
                }
                catch (error) { }
                await this.channelAccounts.save([
                    { field: 'name', data: data.name },
                    { field: 'line_account', data: data.line_account },
                    { field: 'account_id', data: data.account_id },
                    { field: 'friends', data: follower.followers },
                    { field: 'target_reach', data: follower.targetedReaches },
                    { field: 'block', data: follower.blocks },
                    { field: 'block_rate', data: follower.block_rate },
                    { field: 'access_token', data: data.access_token },
                    { field: 'secret', data: data.secret },
                    { field: 'start_date', data: data.start_date }
                ]);
            }
            return res.redirect('back');
        };
        this.editAccount = async (req, res) => {
            let id = parseInt(req.params.id);
            let account = await this.channelAccounts.find(id);
            let accountList = await this.channelAccounts.selectAll();
            let groupList = await this.channelGroups.selectAll();
            return res.render('channels/index', { account: account, accountList: accountList, groupList: groupList });
        };
        this.updateAccount = async (req, res) => {
            let data = req.body;
            let client = new bot_sdk_1.Client({
                channelAccessToken: data.access_token,
                channelSecret: data.secret
            });
            let currentDate = helper_1.formatDate('YYYYMMDD', new Date(data.start_date));
            let follower = { status: 'unready', blocks: 0, targetedReaches: 0, followers: 0, block_rate: 0 };
            try {
                follower = await client.getNumberOfFollowers(currentDate);
                let blocks = follower.blocks;
                let targetedReaches = follower.targetedReaches;
                follower.block_rate = targetedReaches > 0 ? helper_1.round(blocks / targetedReaches * 100) : 0;
            }
            catch (error) { }
            await this.channelAccounts.update([
                { field: 'id', data: data.id },
                { field: 'name', data: data.name },
                { field: 'line_account', data: data.line_account },
                { field: 'account_id', data: data.account_id },
                { field: 'friends', data: follower.followers },
                { field: 'target_reach', data: follower.targetedReaches },
                { field: 'block', data: follower.blocks },
                { field: 'block_rate', data: follower.block_rate },
                { field: 'access_token', data: data.access_token },
                { field: 'secret', data: data.secret },
                { field: 'start_date', data: data.start_date }
            ]);
            return res.redirect('/channel');
        };
        this.deleteAccount = async (req, res) => {
            let id = parseInt(req.params.id);
            await this.channelAccounts.destroy(id);
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
            return res.send(true);
        };
        this.deleteGroup = async (req, res) => {
            let id = parseInt(req.params.id);
            await this.channelGroupsAccounts.destroy([
                { field: 'group_id', data: id }
            ]);
            await this.channelGroups.destroy(id);
            return res.redirect('back');
        };
        this.groupDetail = async (req, res) => {
            let id = parseInt(req.params.id);
            let group = await this.channelGroups.find(id);
            let groups = await this.channelGroupsAccounts.select([
                { field: 'group_id', data: id }
            ]);
            let ids = [];
            for (const it of groups) {
                ids.push(it.account_id);
            }
            let accounts = await this.channelAccounts.selectIn([
                { field: 'id', data: ids }
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
exports.default = new ChannelController;
