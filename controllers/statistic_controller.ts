import { Request, Response, } from 'express'
import { DB } from '../helpers/db'
import { writeToPath } from '@fast-csv/format';
import path from 'path'
import fs from 'fs'
import { PDF } from '../services/pdf_pup'

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
    getListStatistic = async (req: Request, res: Response) => {
        let groupId = parseInt(req.body.id),
            template = '', groupAll: ChannelGroups[] = []
        let startDate = req.body.start_date
        let endDate = req.body.end_date

        // if groupId is 0 then filter all group
        if (groupId == 0) {
            groupAll = await this.channelGroups.selectAll()
            template = 'statistics/table_group_all'
        } else {
            groupAll = await this.channelGroups.select([
                { field: 'id', data: groupId }
            ])
            template = 'statistics/table_group'
        }

        let dataFilterAcccount = await this.getDataFilterAccountByDate(groupAll, startDate, endDate)
        // if there is no data that matches the search criteria
        if (dataFilterAcccount.groupAll[0].accounts.length == 0) {
            return res.json({ code: 201, data: 'データが見つかりません' })
        }
        return res.render(template, dataFilterAcccount, async (err, html) => {
            res.json({ code: 200, data: html })
        })
    }

    getDataFilterAccountByDate = async (groupAll: any[], startDate: string, endDate: string) => {

        let numberOfAccountAll = 0, totalFriendAll = 0, targetReachAll = 0, blockAll = 0, broadcastAll = 0, deliveryCountAll = 0
        for (const group of groupAll) {
            let accounts = await this.channelGroups.getAccountStatisticBetweenDate(group.id, startDate, endDate)

            let friend = 0, targetReach = 0, block = 0, broadcast = 0, deliveryCount = 0, max = accounts.length
            for (const account of accounts) {
                friend += account.friends
                targetReach += account.target_reach
                block += account.block
                broadcast += account.total_deliveries_broadcast
                deliveryCount += account.delivery_count
            }

            group.accounts = accounts
            group.total = {
                friend: friend,
                target_reach: targetReach,
                block: block,
                block_rate: round((block / friend) * 100),
                deliveries_broadcast: broadcast,
                delivery_count: deliveryCount
            }

            let blockAverage = Math.ceil(block / max)
            let friendAverage = Math.ceil(friend / max)
            group.average = {
                friend: friendAverage,
                target_reach: Math.ceil(targetReach / max),
                block: blockAverage,
                block_rate: round((blockAverage / friendAverage) * 100),
                deliveries_broadcast: Math.ceil(broadcast / max),
                delivery_count: Math.ceil(deliveryCount / max)
            }
            // data total for get all groups
            numberOfAccountAll += accounts.length
            totalFriendAll += group.total.friend
            targetReachAll += group.total.target_reach
            blockAll += group.total.block
            broadcastAll += group.total.deliveries_broadcast
            deliveryCountAll += group.total.delivery_count
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
        }

        return { groupAll: groupAll, statistic: statisticAll }
    }

    exportPdf = async (req: Request, res: Response) => {
        let startDate = req.body.start_date
        let endDate = req.body.end_date
        let fileName = formatDate('YYYYMMDD', new Date(startDate)) + '-' + formatDate('YYYYMMDD', new Date(endDate)) + '_line_statistics.pdf'

        let pathHtml = path.join(path.dirname(__dirname), `/data/table.html`)
        let pathPdf = path.join(path.dirname(__dirname), `/data/${fileName}`)

        let groupId = parseInt(req.body.id),
            template = '', groupAll: ChannelGroups[] = []

        // if groupId is 0 then filter all group
        if (groupId == 0) {
            groupAll = await this.channelGroups.selectAll()
            template = 'statistics/pdf/table_group_all'
        } else {
            groupAll = await this.channelGroups.select([
                { field: 'id', data: groupId }
            ])
            template = 'statistics/pdf/table_group'
        }

        let dataFilterAcccount = await this.getDataFilterAccountByDate(groupAll, startDate, endDate)

        return res.render(template, dataFilterAcccount,
            async (err, html) => {
                fs.writeFileSync(pathHtml, html)
                let pdf = await PDF.capturePdf(pathHtml)
                fs.writeFileSync(pathPdf, pdf)
                res.download(pathPdf)
            }
        )
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

export default new StatisticController