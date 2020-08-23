import { Request, Response, } from 'express'
import { DB } from '../helpers/db'
import { writeToPath } from '@fast-csv/format';
import * as path from 'path'
import { formatDate, round } from '../helpers/helper'
import { ChannelGroups } from '../models/channel_groups'
import { ChannelGroupsAccounts } from '../models/channel_groups_accounts'
import { ChannelAccounts } from '../models/channel_accounts'


class StatisticController {
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

        return res.render('statistics/index', { groupAll: groupAll })
    }

    /**
     * return table html
     * @param req 
     * @param res 
     */
    getGroupStatistic = async (req: Request, res: Response) => {
        let groupId = parseInt(req.body.id),
            groupAll = [], template = ''
        if (groupId == 0) {
            groupAll = await this.channelGroups.selectAll()
            template = 'statistics/table_group_all'
        } else {
            groupAll = await this.channelGroups.select([
                { field: 'id', data: groupId }
            ])
            template = 'statistics/table_group'
        }
        for (const group of groupAll) {

            let groupAccount = await this.channelGroupsAccounts.select([
                { field: 'group_id', data: group.id }
            ])

            // get all account_id in group
            let ids = []
            for (const it of groupAccount) {
                ids.push(it.account_id)
            }

            let accounts = await this.channelAccounts.selectIn([
                { field: 'id', data: ids }
            ])

            let friend = 0, target_reach = 0, block = 0, broadcast = 0, delivery_count = 0, max = accounts.length
            for (const account of accounts) {
                friend += account.friends
                target_reach += account.target_reach
                block += account.block
                broadcast += account.broadcast
                delivery_count += account.delivery_count
            }

            group.accounts = accounts
            group.total = {
                friend: friend,
                target_reach: target_reach,
                block: block,
                block_rate: round((block / friend) * 100),
                broadcast: broadcast,
                delivery_count: delivery_count
            }

            let blockAverage = Math.ceil(block / max)
            let friendAverage = Math.ceil(friend / max)
            group.average = {
                friend: friendAverage,
                target_reach: Math.ceil(target_reach / max),
                block: blockAverage,
                block_rate: round((blockAverage / friendAverage) * 100),
                broadcast: Math.ceil(broadcast / max),
                delivery_count: Math.ceil(delivery_count / max)
            }
        }

        return res.render(template, { groupAll: groupAll })
    }

    downCsv = async (req: Request, res: Response) => {
        let currentDate = formatDate('YYYYMMDD')
        let data: any[] = []
        let filename: string = `${currentDate}.csv`

        switch (req.params.data) {
            case "1":
                filename = `${currentDate}_friend_graphics_ages.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__ages',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "2":
                filename = `${currentDate}_friend_graphics_apptypes.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__apptypes',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "3":
                filename = `${currentDate}_friend_graphics_areas.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__areas_jp',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "4":
                filename = `${currentDate}_friend_graphics_genders.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__genders',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "5":
                filename = `${currentDate}_friend_graphics_subscriptions.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'friend_graphics__subscriptions',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            case "6":
                filename = `${currentDate}_messages_statistic.csv`
                data = await DB.selectByParams({
                    select: '*',
                    table: 'messages_statistic',
                    set: '?',
                    where: [1]
                }, false, true)
                break;
            default:
                break;
        }


        let file = path.join(path.dirname(__dirname), `/data/${filename}`)

        writeToPath(file, data)
            .on('error', err => console.error(err))
            .on('finish', () => res.download(file));
    }
}

export { StatisticController }