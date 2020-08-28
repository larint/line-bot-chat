"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const channel_groups_1 = require("../models/channel_groups");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const channel_accounts_1 = require("../models/channel_accounts");
class ChartController {
    constructor() {
        this.index = async (req, res) => {
            let groupAll = await this.channelGroups.selectAll();
            return res.render('charts/index', { groupAll: groupAll });
        };
        this.getChartData = async (req, res) => {
            let groupId = req.body.id, startDate = req.body.start_date, endDate = req.body.end_date;
            let accounts = await this.channelGroups.getAccountStatisticBetweenDate(groupId, startDate, endDate);
            let dataChart1 = [], seriesChart1 = [], dataChart2 = [], seriesChart2 = [];
            for (let account of accounts) {
                dataChart1.push({
                    category: account.name,
                    friends: account.friends_date_range,
                    target_reach: account.target_reach_date_range,
                    block: account.block
                });
                dataChart2.push({
                    category: account.name,
                    deliveries_broadcast: account.total_deliveries_broadcast,
                    delivery_count: account.delivery_count,
                });
            }
            seriesChart1 = [{
                    dataFields: 'friends', name: 'Friend'
                }, {
                    dataFields: 'target_reach', name: 'Target Reach'
                }, {
                    dataFields: 'block', name: 'Block'
                }];
            seriesChart2 = [{
                    dataFields: 'deliveries_broadcast', name: 'Total Broadcast'
                }, {
                    dataFields: 'delivery_count', name: 'Delivery Count'
                }];
            res.json({ dataChart1: dataChart1, seriesChart1: seriesChart1, dataChart2: dataChart2, seriesChart2: seriesChart2 });
        };
        this.getChart1 = async (req, res) => {
            return res.render('charts/chart/column_style', {}, (err, html) => {
                res.json({ data: html });
            });
        };
        this.channelAccounts = new channel_accounts_1.ChannelAccounts();
        this.channelGroups = new channel_groups_1.ChannelGroups();
        this.channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
    }
}
exports.default = new ChartController;
