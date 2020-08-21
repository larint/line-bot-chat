import { Request, Response, } from 'express'
import { DB } from '../helpers/db'
import { writeToPath } from '@fast-csv/format';
import * as path from 'path'
import { formatDate } from '../helpers/helper'
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
        let groups = await this.channelGroups.selectAll()

        let data = []
        if (groups) {
            for (const item of groups) {
                let groupAccount = await this.channelGroupsAccounts.select([
                    { field: 'group_id', data: item.id }
                ])

                let ids = []
                for (const it of groupAccount) {
                    ids.push(it.account_id)
                }

                let accounts = await this.channelAccounts.selectIn([
                    { field: 'id', data: ids }
                ])

                data.push({
                    group: item,
                    account: accounts
                })
            }
        }

        return res.render('statistics/index', {
            data: data
        })

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


        let file = path.join(path.dirname(__dirname), `/data_csv/${filename}`)

        writeToPath(file, data)
            .on('error', err => console.error(err))
            .on('finish', () => res.download(file));
    }
}

export { StatisticController }