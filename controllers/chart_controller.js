"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_1 = require("../services/chart");
const channel_groups_1 = require("../models/channel_groups");
const channel_groups_accounts_1 = require("../models/channel_groups_accounts");
const channel_accounts_1 = require("../models/channel_accounts");
class ChartController {
    constructor() {
        this.index = async (req, res) => {
            let groupAll = await this.channelGroups.selectAll();
            return res.render('charts/index', { groupAll: groupAll });
        };
        this.getChartDataFriend = async (req, res) => {
            let groupId = req.body.id, startDate = req.body.start_date, endDate = req.body.end_date;
            let data = await this.chart.prepareDataStatisticFriend(groupId, startDate, endDate);
            res.json(data);
        };
        this.getChartDataMessage = async (req, res) => {
            let groupId = req.body.id, startDate = req.body.start_date, endDate = req.body.end_date;
            let data = await this.chart.prepareDataStatisticMessage(groupId, startDate, endDate);
            res.json(data);
        };
        this.getChart1 = async (req, res) => {
            return res.render('charts/chart/column_style', {}, (err, html) => {
                res.json({ data: html });
            });
        };
        this.channelAccounts = new channel_accounts_1.ChannelAccounts();
        this.channelGroups = new channel_groups_1.ChannelGroups();
        this.channelGroupsAccounts = new channel_groups_accounts_1.ChannelGroupsAccounts();
        this.chart = new chart_1.Chart();
    }
}
exports.default = new ChartController;
