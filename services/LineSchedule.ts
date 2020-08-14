import { Client } from '@line/bot-sdk'
import * as Types from '@line/bot-sdk/dist/types'
import { log, formatDate } from '../helpers/helper'
import { Faker } from '../faker/faker'
import { DB } from '../helpers/db'
import { messageStatistic } from '../helpers/type'
import { TableFriendGraphicsGenders } from '../migrations/tables/friend_graphics__genders'
import { TableFriendGraphicsAges } from '../migrations/tables/friend_graphics__ages'
import { TableFriendGraphicsApptypes } from '../migrations/tables/friend_graphics__apptypes'
import { TableFriendGraphicsSubscriptions } from '../migrations/tables/friend_graphics__subscriptions'
import { TableFriendGraphicsAreaJP } from '../migrations/tables/friend_graphics__areas_jp'
import { TableFriendGraphicsAreaTW } from '../migrations/tables/friend_graphics__areas_tw'
import { TableFriendGraphicsAreaTH } from '../migrations/tables/friend_graphics__areas_th'
import { TableFriendGraphicsAreaID } from '../migrations/tables/friend_graphics__areas_id'

require('dotenv').config()

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.LINE_CHANNEL_SECRET as string
}

const client = new Client(config)

class LineSchedule {

    static run = async () => {
        // send to chat bot
        // await client.broadcast({ type: 'text', text: 'Updated data from LINE success' })

        console.log('run getFriendDemographics ' + new Date())
        let friend: Types.FriendDemographics = await client.getFriendDemographics()

        // let friend = await Faker.getFakeJsonFriendGraphics()
        // console.log(friend)

        await LineSchedule.saveGraphicsGenders(friend)
        await LineSchedule.saveGraphicsAges(friend)
        await LineSchedule.saveGraphicsAppTypes(friend)
        await LineSchedule.saveGraphicsSubscription(friend)
        await LineSchedule.saveGraphicsAreas(friend)
        await LineSchedule.saveMessageStatistic()

    }

    static saveGraphicsGenders = async (friend: Types.FriendDemographics) => {

        let currentDate = formatDate('YYYYMMDD');

        let exist = await DB.selectByParams({
            select: 'id',
            table: 'friend_graphics__genders',
            set: '??=?',
            where: ['date_update', currentDate]
        })

        if (exist.length > 0) {
            return
        }

        let gendersWhere = ['date_update', currentDate]

        friend.genders?.forEach((item: any) => {
            gendersWhere.push(item.gender)
            gendersWhere.push(item.percentage)
        })

        if (friend.genders?.length == 0) {
            TableFriendGraphicsGenders.column.slice(2).forEach((column, idx) => {
                gendersWhere.push(column)
                gendersWhere.push('0')
            })
        }

        await DB.insertItem({
            table: 'friend_graphics__genders',
            set: '?? = ?,?? = ?,?? = ?,?? = ?',
            where: gendersWhere
        })
    }

    static saveGraphicsAges = async (friend: Types.FriendDemographics) => {

        let currentDate = formatDate('YYYYMMDD');
        let exist = await DB.selectByParams({
            select: 'id',
            table: 'friend_graphics__ages',
            set: '??=?',
            where: ['date_update', currentDate]
        })

        if (exist.length > 0) {
            return
        }

        let agesWhere = ['date_update', currentDate]

        friend.ages?.forEach((item: any) => {
            agesWhere.push(item.age)
            agesWhere.push(item.percentage)
        })

        if (friend.ages?.length == 0) {
            TableFriendGraphicsAges.column.slice(2).forEach((column, idx) => {
                agesWhere.push(column)
                agesWhere.push('0')
            })
        }

        await DB.insertItem({
            table: 'friend_graphics__ages',
            set: '?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?',
            where: agesWhere
        })
    }

    static saveGraphicsAppTypes = async (friend: Types.FriendDemographics) => {

        let currentDate = formatDate('YYYYMMDD');
        let exist = await DB.selectByParams({
            select: 'id',
            table: 'friend_graphics__apptypes',
            set: '??=?',
            where: ['date_update', currentDate]
        })

        if (exist.length > 0) {
            return
        }

        let appTypesWhere = ['date_update', currentDate]

        friend.appTypes?.forEach((item: any) => {
            appTypesWhere.push(item.appType)
            appTypesWhere.push(item.percentage)
        })

        if (friend.appTypes?.length == 0) {
            TableFriendGraphicsApptypes.column.slice(2).forEach((column, idx) => {
                appTypesWhere.push(column)
                appTypesWhere.push('0')
            })
        }

        await DB.insertItem({
            table: 'friend_graphics__apptypes',
            set: '?? = ?,?? = ?,?? = ?,?? = ?',
            where: appTypesWhere
        })
    }

    static saveGraphicsSubscription = async (friend: Types.FriendDemographics) => {

        let currentDate = formatDate('YYYYMMDD');
        let exist = await DB.selectByParams({
            select: 'id',
            table: 'friend_graphics__subscriptions',
            set: '??=?',
            where: ['date_update', currentDate]
        })

        if (exist.length > 0) {
            return
        }

        let subscriptionWhere = ['date_update', currentDate]

        friend.subscriptionPeriods?.forEach((item: any) => {
            subscriptionWhere.push(item.subscriptionPeriod)
            subscriptionWhere.push(item.percentage)
        })

        if (friend.subscriptionPeriods?.length == 0) {
            TableFriendGraphicsSubscriptions.column.slice(2).forEach((column, idx) => {
                subscriptionWhere.push(column)
                subscriptionWhere.push('0')
            })
        }

        await DB.insertItem({
            table: 'friend_graphics__subscriptions',
            set: '?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ?',
            where: subscriptionWhere
        })
    }

    static saveGraphicsAreas = async (friend: Types.FriendDemographics) => {
        let areaTrans: any, table: string = ''
        switch (process.env.LINE_LOCATE) {
            case 'jp':
                areaTrans = TableFriendGraphicsAreaJP.areaTrans;
                table = 'friend_graphics__areas_jp'
                break;
            case 'tw':
                areaTrans = TableFriendGraphicsAreaTW.areaTrans;
                table = 'friend_graphics__areas_tw'
                break;
            case 'th':
                areaTrans = TableFriendGraphicsAreaTH.areaTrans;
                table = 'friend_graphics__areas_th'
                break;
            case 'id':
                areaTrans = TableFriendGraphicsAreaID.areaTrans;
                table = 'friend_graphics__areas_id'
                break;
            default:
                areaTrans = TableFriendGraphicsAreaJP.areaTrans;
                table = 'friend_graphics__areas_jp'
                break;
        }

        let currentDate = formatDate('YYYYMMDD');
        let exist = await DB.selectByParams({
            select: 'id',
            table: table,
            set: '??=?',
            where: ['date_update', currentDate]
        })

        if (exist.length > 0) {
            return
        }

        let areasWhere = ['date_update', currentDate]
        // build set where
        let set: string = '?? = ?,'
        friend.areas?.forEach((item: any) => {
            areasWhere.push(areaTrans[item.area])
            areasWhere.push(item.percentage)
            set += '?? = ?,'
        })

        let citys = Object.values(areaTrans)
        if (friend.areas?.length == 0) {
            for (const city of citys) {
                areasWhere.push(city as string)
                areasWhere.push('0')
            }
        }

        await DB.insertItem({
            table: table,
            set: set.slice(0, -1), // remove last character ,
            where: areasWhere
        })
    }

    static saveMessageStatistic = async () => {
        let currentDate = formatDate('YYYYMMDD')

        let exist = await DB.selectByParams({
            select: 'id',
            table: 'messages_statistic',
            set: '??=?',
            where: ['date_update', currentDate]
        })

        if (exist.length > 0) {
            return
        }

        let result: messageStatistic = {}
        result.reply = await client.getNumberOfSentReplyMessages(currentDate)
        result.sentPush = await client.getNumberOfSentPushMessages(currentDate)
        result.sentMulticast = await client.getNumberOfSentMulticastMessages(currentDate)
        result.sentBroadcast = await client.getNumberOfSentBroadcastMessages(currentDate)
        result.messageDeliveries = <Types.NumberOfMessageDeliveries>await client.getNumberOfMessageDeliveries(currentDate)

        await DB.insertItem({
            table: 'messages_statistic',
            set: '??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?',
            where: [
                'date_update', currentDate,
                'reply_status', result.reply.status,
                'reply_number', result.reply.success!,
                'push_status', result.sentPush.status,
                'push_number', result.sentPush.success!,
                'multicast_status', result.sentMulticast.status,
                'multicast_number', result.sentMulticast.success!,
                'broadcast_status', result.sentBroadcast.status,
                'broadcast_number', result.sentBroadcast.success!,
                'deliveries_status', result.messageDeliveries.status,
                'deliveries_broadcast', result.messageDeliveries.broadcast,
                'deliveries_targeting', result.messageDeliveries.targeting,
                'deliveries_auto_response', result.messageDeliveries.autoResponse,
                'deliveries_welcome_response', result.messageDeliveries.welcomeResponse,
                'deliveries_chat', result.messageDeliveries.chat,
                'deliveries_api_broadcast', result.messageDeliveries.apiBroadcast,
                'deliveries_api_push', result.messageDeliveries.apiPush,
                'deliveries_api_multicast', result.messageDeliveries.welcomeResponse,
                'deliveries_api_reply', result.messageDeliveries.apiReply,
            ]
        })
    }
}

export { LineSchedule }