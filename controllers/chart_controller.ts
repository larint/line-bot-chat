import { Request, Response, } from 'express'
import { Chart } from '../services/chart'
import { ChannelGroups } from '../models/channel_groups'
import { ChannelGroupsAccounts } from '../models/channel_groups_accounts'
import { ChannelAccounts } from '../models/channel_accounts'

class ChartController {
    channelAccounts: ChannelAccounts
    channelGroups: ChannelGroups
    channelGroupsAccounts: ChannelGroupsAccounts

    constructor() {
        this.channelAccounts = new ChannelAccounts()
        this.channelGroups = new ChannelGroups()
        this.channelGroupsAccounts = new ChannelGroupsAccounts()
    }

    index = async (req: Request, res: Response) => {
        let groupAll = await this.channelGroups.selectAll()

        return res.render('charts/index', { groupAll: groupAll })
    }

    getChartData = async (req: Request, res: Response) => {
        let groupId = req.body.id,
            startDate = req.body.start_date,
            endDate = req.body.end_date

        let accounts = await this.channelGroups.getAccountStatisticBetweenDate(groupId, startDate, endDate)

        // build data for chart 1, chart 2
        let dataChart1 = [], seriesChart1 = [], dataChart2 = [], seriesChart2 = []
        for (let account of accounts) {

            dataChart1.push({
                category: account.name,
                friends: account.friends,
                target_reach: account.target_reach,
                block: account.block
            })

            dataChart2.push({
                category: account.name,
                deliveries_broadcast: account.total_deliveries_broadcast,
                delivery_count: account.delivery_count,
            })

        }

        seriesChart1 = [{
            dataFields: 'friends', name: 'Friend'
        }, {
            dataFields: 'target_reach', name: 'Target Reach'
        }, {
            dataFields: 'block', name: 'Block'
        }]

        seriesChart2 = [{
            dataFields: 'deliveries_broadcast', name: 'Total Broadcast'
        }, {
            dataFields: 'delivery_count', name: 'Delivery Count'
        }]

        res.json({ dataChart1: dataChart1, seriesChart1: seriesChart1, dataChart2: dataChart2, seriesChart2: seriesChart2 })
    }

    getChart1 = async (req: Request, res: Response) => {
        return res.render('charts/chart/column_style', {}, (err, html) => {
            res.json({ data: html })
        });
    }
}

export default new ChartController