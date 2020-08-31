import { Request, Response, } from 'express'
import { Chart } from '../services/chart'
import { ChannelGroups } from '../models/channel_groups'
import { ChannelGroupsAccounts } from '../models/channel_groups_accounts'
import { ChannelAccounts } from '../models/channel_accounts'

class ChartController {
    channelAccounts: ChannelAccounts
    channelGroups: ChannelGroups
    channelGroupsAccounts: ChannelGroupsAccounts
    chart: Chart

    constructor() {
        this.channelAccounts = new ChannelAccounts()
        this.channelGroups = new ChannelGroups()
        this.channelGroupsAccounts = new ChannelGroupsAccounts()
        this.chart = new Chart()
    }

    index = async (req: Request, res: Response) => {
        let groupAll = await this.channelGroups.selectAll()

        return res.render('charts/index', { groupAll: groupAll })
    }

    getChartDataFriend = async (req: Request, res: Response) => {
        let groupId = req.body.id,
            startDate = req.body.start_date,
            endDate = req.body.end_date
        let data = await this.chart.prepareDataStatisticFriend(groupId, startDate, endDate)

        res.json(data)
    }

    getChartDataMessage = async (req: Request, res: Response) => {
        let groupId = req.body.id,
            startDate = req.body.start_date,
            endDate = req.body.end_date
        let data = await this.chart.prepareDataStatisticMessage(groupId, startDate, endDate)

        res.json(data)
    }

    getChart1 = async (req: Request, res: Response) => {
        return res.render('charts/chart/column_style', {}, (err, html) => {
            res.json({ data: html })
        });
    }
}

export default new ChartController