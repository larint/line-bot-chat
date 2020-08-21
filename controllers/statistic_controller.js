"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticController = void 0;
const db_1 = require("../helpers/db");
const format_1 = require("@fast-csv/format");
const path = require("path");
const helper_1 = require("../helpers/helper");
const channel_groups_1 = require("../models/channel_groups");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const channel_accounts_1 = require("../models/channel_accounts");
class StatisticController {
    constructor() {
        this.index = async (req, res) => {
            let groups = await this.channelGroups.selectAll();
            let data = [];
            if (groups) {
                for (const item of groups) {
                    let groupAccount = await this.channelGroupsAccounts.select([
                        { field: 'group_id', data: item.id }
                    ]);
                    let ids = [];
                    for (const it of groupAccount) {
                        ids.push(it.account_id);
                    }
                    let accounts = await this.channelAccounts.selectIn([
                        { field: 'id', data: ids }
                    ]);
                    data.push({
                        group: item,
                        account: accounts
                    });
                }
            }
            return res.render('statistics/index', {
                data: data
            });
        };
        this.downCsv = async (req, res) => {
            let currentDate = helper_1.formatDate('YYYYMMDD');
            let data = [];
            let filename = `${currentDate}.csv`;
            switch (req.params.data) {
                case "1":
                    filename = `${currentDate}_friend_graphics_ages.csv`;
                    data = await db_1.DB.selectByParams({
                        select: '*',
                        table: 'friend_graphics__ages',
                        set: '?',
                        where: [1]
                    }, false, true);
                    break;
                case "2":
                    filename = `${currentDate}_friend_graphics_apptypes.csv`;
                    data = await db_1.DB.selectByParams({
                        select: '*',
                        table: 'friend_graphics__apptypes',
                        set: '?',
                        where: [1]
                    }, false, true);
                    break;
                case "3":
                    filename = `${currentDate}_friend_graphics_areas.csv`;
                    data = await db_1.DB.selectByParams({
                        select: '*',
                        table: 'friend_graphics__areas_jp',
                        set: '?',
                        where: [1]
                    }, false, true);
                    break;
                case "4":
                    filename = `${currentDate}_friend_graphics_genders.csv`;
                    data = await db_1.DB.selectByParams({
                        select: '*',
                        table: 'friend_graphics__genders',
                        set: '?',
                        where: [1]
                    }, false, true);
                    break;
                case "5":
                    filename = `${currentDate}_friend_graphics_subscriptions.csv`;
                    data = await db_1.DB.selectByParams({
                        select: '*',
                        table: 'friend_graphics__subscriptions',
                        set: '?',
                        where: [1]
                    }, false, true);
                    break;
                case "6":
                    filename = `${currentDate}_messages_statistic.csv`;
                    data = await db_1.DB.selectByParams({
                        select: '*',
                        table: 'messages_statistic',
                        set: '?',
                        where: [1]
                    }, false, true);
                    break;
                default:
                    break;
            }
            let file = path.join(path.dirname(__dirname), `/data_csv/${filename}`);
            format_1.writeToPath(file, data)
                .on('error', err => console.error(err))
                .on('finish', () => res.download(file));
        };
        this.channelAccounts = new channel_accounts_1.ChannelAccounts();
        this.channelGroups = new channel_groups_1.ChannelGroups();
        this.channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    }
}
exports.StatisticController = StatisticController;
