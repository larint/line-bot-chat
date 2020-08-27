"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../helpers/db");
const format_1 = require("@fast-csv/format");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdf_pup_1 = require("../services/pdf_pup");
const helper_1 = require("../helpers/helper");
const channel_groups_1 = require("../models/channel_groups");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const channel_accounts_1 = require("../models/channel_accounts");
class StatisticController {
    constructor() {
        this.index = async (req, res) => {
            let groupAll = await this.channelGroups.selectAll();
            return res.render('statistics/index', { groupAll: groupAll });
        };
        this.getListStatistic = async (req, res) => {
            let groupId = parseInt(req.body.id), template = '', groupAll = [];
            let startDate = req.body.start_date;
            let endDate = req.body.end_date;
            if (groupId == 0) {
                groupAll = await this.channelGroups.selectAll();
                template = 'statistics/table_group_all';
            }
            else {
                groupAll = await this.channelGroups.select([
                    { field: 'id', data: groupId }
                ]);
                template = 'statistics/table_group';
            }
            let dataFilterAcccount = await this.getDataFilterAccountByDate(groupAll, startDate, endDate);
            if (dataFilterAcccount.groupAll[0].accounts.length == 0) {
                return res.json({ code: 201, data: 'データが見つかりません' });
            }
            return res.render(template, dataFilterAcccount, async (err, html) => {
                res.json({ code: 200, data: html });
            });
        };
        this.getDataFilterAccountByDate = async (groupAll, startDate, endDate) => {
            let numberOfAccountAll = 0, totalFriendAll = 0, targetReachAll = 0, blockAll = 0, broadcastAll = 0, deliveryCountAll = 0;
            for (const group of groupAll) {
                let groupAccount = await this.channelGroupsAccounts.select([
                    { field: 'group_id', data: group.id }
                ]);
                let ids = [];
                for (const it of groupAccount) {
                    ids.push(it.account_id);
                }
                let accounts = await this.channelAccounts.selectWithTotalStatistic(ids, startDate, endDate);
                let friend = 0, targetReach = 0, block = 0, broadcast = 0, deliveryCount = 0, max = accounts.length;
                for (const account of accounts) {
                    friend += account.friends;
                    targetReach += account.target_reach;
                    block += account.block;
                    broadcast += account.total_deliveries_broadcast;
                    deliveryCount += account.delivery_count;
                }
                group.accounts = accounts;
                group.total = {
                    friend: friend,
                    target_reach: targetReach,
                    block: block,
                    block_rate: helper_1.round((block / friend) * 100),
                    deliveries_broadcast: broadcast,
                    delivery_count: deliveryCount
                };
                let blockAverage = Math.ceil(block / max);
                let friendAverage = Math.ceil(friend / max);
                group.average = {
                    friend: friendAverage,
                    target_reach: Math.ceil(targetReach / max),
                    block: blockAverage,
                    block_rate: helper_1.round((blockAverage / friendAverage) * 100),
                    deliveries_broadcast: Math.ceil(broadcast / max),
                    delivery_count: Math.ceil(deliveryCount / max)
                };
                numberOfAccountAll += accounts.length;
                totalFriendAll += group.total.friend;
                targetReachAll += group.total.target_reach;
                blockAll += group.total.block;
                broadcastAll += group.total.deliveries_broadcast;
                deliveryCountAll += group.total.delivery_count;
            }
            let statisticAll = {
                total: {
                    number_of_account: numberOfAccountAll,
                    total_friend: totalFriendAll,
                    target_reach: targetReachAll,
                    block: blockAll,
                    broadcast: broadcastAll,
                    delivery_count: deliveryCountAll,
                },
                average: {
                    total_friend: Math.ceil(totalFriendAll / groupAll.length),
                    target_reach: Math.ceil(targetReachAll / groupAll.length),
                    block: Math.ceil(blockAll / groupAll.length),
                    broadcast: Math.ceil(broadcastAll / groupAll.length),
                    delivery_count: Math.ceil(deliveryCountAll / groupAll.length),
                }
            };
            return { groupAll: groupAll, statistic: statisticAll };
        };
        this.exportPdf = async (req, res) => {
            let startDate = req.body.start_date;
            let endDate = req.body.end_date;
            let fileName = helper_1.formatDate('YYYYMMDD', new Date(startDate)) + '-' + helper_1.formatDate('YYYYMMDD', new Date(endDate)) + '_line_statistics.pdf';
            let pathHtml = path_1.default.join(path_1.default.dirname(__dirname), `/data/table.html`);
            let pathPdf = path_1.default.join(path_1.default.dirname(__dirname), `/data/${fileName}`);
            let groupId = parseInt(req.body.id), template = '', groupAll = [];
            if (groupId == 0) {
                groupAll = await this.channelGroups.selectAll();
                template = 'statistics/pdf/table_group_all';
            }
            else {
                groupAll = await this.channelGroups.select([
                    { field: 'id', data: groupId }
                ]);
                template = 'statistics/pdf/table_group';
            }
            let dataFilterAcccount = await this.getDataFilterAccountByDate(groupAll, startDate, endDate);
            return res.render(template, dataFilterAcccount, async (err, html) => {
                fs_1.default.writeFileSync(pathHtml, html);
                let pdf = await pdf_pup_1.PDF.capturePdf(pathHtml);
                fs_1.default.writeFileSync(pathPdf, pdf);
                res.download(pathPdf);
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
            let file = path_1.default.join(path_1.default.dirname(__dirname), `/data/${filename}`);
            format_1.writeToPath(file, data)
                .on('error', err => console.error(err))
                .on('finish', () => res.download(file));
        };
        this.channelAccounts = new channel_accounts_1.ChannelAccounts();
        this.channelGroups = new channel_groups_1.ChannelGroups();
        this.channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    }
}
exports.default = new StatisticController;
