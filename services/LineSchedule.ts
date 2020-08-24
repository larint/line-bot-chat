import { Client } from '@line/bot-sdk'
import * as Types from '@line/bot-sdk/dist/types'
import { formatDate } from '../helpers/helper'
import { Faker } from '../faker/faker'
import { DataWhere } from '../helpers/db'
import { messageStatistic as TypeMessageStatistic } from '../helpers/type'
import { MessageStatistic } from '../models/messages_statistic'
import { ChannelAccounts } from '../models/channel_accounts'
import { FriendGraphicsAges } from '../models/friend_graphics_ages'
import { FriendGraphicsApptypes } from '../models/friend_graphics_apptypes'
import { FriendGraphicsGenders } from '../models/friend_graphics_genders'
import { FriendGraphicsSubscriptions } from '../models/friend_graphics_subscriptions'
import { FriendGraphicsAreasJP } from '../models/friend_graphics_areas_jp'
import { FriendGraphicsAreasTH } from '../models/friend_graphics_areas_th'
import { FriendGraphicsAreasTW } from '../models/friend_graphics_areas_tw'
import { FriendGraphicsAreasID } from '../models/friend_graphics_areas_id'


require('dotenv').config()

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.LINE_CHANNEL_SECRET as string
}

const client = new Client(config)

class LineSchedule {
    /**
     * Get statistical information for all accounts at the current date 
     */
    static run = async () => {
        // send notification to chat bot
        // await client.broadcast({ type: 'text', text: 'Updated data from LINE success' })

        // Updates for all accounts by date
        let channelAccounts = new ChannelAccounts()
        let accountList = await channelAccounts.selectAll()

        for (const account of accountList) {
            let client = new Client({
                channelAccessToken: account.access_token,
                channelSecret: account.secret
            })

            // Only get information from the previous day
            let date = formatDate('YYYYMMDD', new Date(), -1)
            let friend: Types.FriendDemographics = await client.getFriendDemographics()
            // let friend = await Faker.getFakeJsonFriendGraphics()

            await LineSchedule.saveGraphicsGenders(friend, account.id, date)
            await LineSchedule.saveGraphicsAges(friend, account.id, date)
            await LineSchedule.saveGraphicsAppTypes(friend, account.id, date)
            await LineSchedule.saveGraphicsSubscription(friend, account.id, date)
            await LineSchedule.saveGraphicsAreas(friend, account.id, date)

            await LineSchedule.saveMessageStatistic(client, account.id, date)
        }

    }

    static saveGraphicsGenders = async (friend: Types.FriendDemographics, accountId: number, dateUpdate: string) => {
        let friendGraphicsGenders = new FriendGraphicsGenders()
        let isExist = await friendGraphicsGenders.find([
            { field: 'date_update', data: dateUpdate },
            { field: 'account_id', data: accountId },
        ])

        if (friend.genders?.length == 0) {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friendGraphicsGenders.column.slice(3).forEach((column, idx) => {
                    fields.push({ field: column, data: 0 })
                })

                await friendGraphicsGenders.save(fields)
            }
        } else {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friend.genders?.forEach((item: any) => {
                    fields.push({ field: item.gender, data: item.percentage })
                })

                await friendGraphicsGenders.save(fields)
            } else {
                let fields: DataWhere[] = [{ field: 'id', data: isExist.id }]

                friend.genders?.forEach((item: any) => {
                    fields.push({ field: item.gender, data: item.percentage })
                })

                await friendGraphicsGenders.update(fields)
            }
        }
    }

    static saveGraphicsAges = async (friend: Types.FriendDemographics, accountId: number, dateUpdate: string) => {
        let friendGraphicsAges = new FriendGraphicsAges()
        let isExist = await friendGraphicsAges.find([
            { field: 'date_update', data: dateUpdate },
            { field: 'account_id', data: accountId },
        ])

        if (friend.ages?.length == 0) {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friendGraphicsAges.column.slice(3).forEach((column, idx) => {
                    fields.push({ field: column, data: 0 })
                })

                await friendGraphicsAges.save(fields)
            }
        } else {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friend.ages?.forEach((item: any) => {
                    fields.push({ field: item.age, data: item.percentage })
                })

                await friendGraphicsAges.save(fields)
            } else {
                let fields: DataWhere[] = [{ field: 'id', data: isExist.id }]

                friend.ages?.forEach((item: any) => {
                    fields.push({ field: item.age, data: item.percentage })
                })

                await friendGraphicsAges.update(fields)
            }
        }
    }

    static saveGraphicsAppTypes = async (friend: Types.FriendDemographics, accountId: number, dateUpdate: string) => {
        let friendGraphicsApptypes = new FriendGraphicsApptypes()
        let isExist = await friendGraphicsApptypes.find([
            { field: 'date_update', data: dateUpdate },
            { field: 'account_id', data: accountId },
        ])

        if (friend.appTypes?.length == 0) {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friendGraphicsApptypes.column.slice(3).forEach((column, idx) => {
                    fields.push({ field: column, data: 0 })
                })

                await friendGraphicsApptypes.save(fields)
            }
        } else {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friend.appTypes?.forEach((item: any) => {
                    fields.push({ field: item.appType, data: item.percentage })
                })

                await friendGraphicsApptypes.save(fields)
            } else {
                let fields: DataWhere[] = [{ field: 'id', data: isExist.id }]

                friend.appTypes?.forEach((item: any) => {
                    fields.push({ field: item.appType, data: item.percentage })
                })

                await friendGraphicsApptypes.update(fields)
            }
        }
    }

    static saveGraphicsSubscription = async (friend: Types.FriendDemographics, accountId: number, dateUpdate: string) => {
        let friendGraphicsSubscriptions = new FriendGraphicsSubscriptions()
        let isExist = await friendGraphicsSubscriptions.find([
            { field: 'date_update', data: dateUpdate },
            { field: 'account_id', data: accountId },
        ])

        if (friend.subscriptionPeriods?.length == 0) {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friendGraphicsSubscriptions.column.slice(3).forEach((column, idx) => {
                    fields.push({ field: column, data: 0 })
                })

                await friendGraphicsSubscriptions.save(fields)
            }
        } else {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friend.subscriptionPeriods?.forEach((item: any) => {
                    fields.push({ field: item.subscriptionPeriod, data: item.percentage })
                })

                await friendGraphicsSubscriptions.save(fields)
            } else {
                let fields: DataWhere[] = [{ field: 'id', data: isExist.id }]

                friend.subscriptionPeriods?.forEach((item: any) => {
                    fields.push({ field: item.subscriptionPeriod, data: item.percentage })
                })

                await friendGraphicsSubscriptions.update(fields)
            }
        }
    }

    static saveGraphicsAreas = async (friend: Types.FriendDemographics, accountId: number, dateUpdate: string) => {
        let friendGraphicsArea: any = {}
        switch (process.env.LINE_LOCATE) {
            case 'jp':
                friendGraphicsArea = new FriendGraphicsAreasJP()
                break;
            case 'tw':
                friendGraphicsArea = new FriendGraphicsAreasTW()
                break;
            case 'th':
                friendGraphicsArea = new FriendGraphicsAreasTH()
                break;
            case 'id':
                friendGraphicsArea = new FriendGraphicsAreasID()
                break;
            default:
                friendGraphicsArea = new FriendGraphicsAreasJP()
                break;
        }

        let areaTrans: any[] = friendGraphicsArea.areaTrans
        let isExist = await friendGraphicsArea.find([
            { field: 'date_update', data: dateUpdate },
            { field: 'account_id', data: accountId },
        ])

        if (friend.areas?.length == 0) {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                let citys = Object.values(areaTrans)
                for (const city of citys) {
                    fields.push({ field: city as string, data: 0 })
                }

                await friendGraphicsArea.save(fields)
            }
        } else {
            if (!isExist) {
                let fields: DataWhere[] = [
                    { field: 'account_id', data: accountId },
                    { field: 'date_update', data: dateUpdate }
                ]

                friend.areas?.forEach((item: any) => {
                    fields.push({ field: areaTrans[item.area], data: item.percentage })
                })

                await friendGraphicsArea.save(fields)
            } else {
                let fields: DataWhere[] = [{ field: 'id', data: isExist.id }]

                friend.areas?.forEach((item: any) => {
                    fields.push({ field: areaTrans[item.area], data: item.percentage })
                })

                await friendGraphicsArea.update(fields)
            }
        }

    }

    /**
     * update statistic for each account by date
     * @param accountId 
     * @param date 
     */
    static saveMessageStatistic = async (client: Client, accountId: number, dateUpdate: string) => {
        let messageStatistic = new MessageStatistic()
        let result: TypeMessageStatistic = {}
        result.reply = await client.getNumberOfSentReplyMessages(dateUpdate)
        result.sentPush = await client.getNumberOfSentPushMessages(dateUpdate)
        result.sentMulticast = await client.getNumberOfSentMulticastMessages(dateUpdate)
        result.sentBroadcast = await client.getNumberOfSentBroadcastMessages(dateUpdate)
        result.messageDeliveries = <Types.NumberOfMessageDeliveries>await client.getNumberOfMessageDeliveries(dateUpdate)

        let isExist = await messageStatistic.find([
            { field: 'account_id', data: accountId },
            { field: 'date_update', data: dateUpdate }
        ])

        if (isExist) {
            messageStatistic.update([
                { field: 'id', data: isExist.id },
                { field: 'reply_status', data: result.reply.status },
                { field: 'reply_number', data: result.reply.success ?? 0 },
                { field: 'push_status', data: result.sentPush.status },
                { field: 'push_number', data: result.sentPush.success ?? 0 },
                { field: 'multicast_status', data: result.sentMulticast.status },
                { field: 'multicast_number', data: result.sentMulticast.success ?? 0 },
                { field: 'broadcast_status', data: result.sentBroadcast.status },
                { field: 'broadcast_number', data: result.sentBroadcast.success ?? 0 },
                { field: 'deliveries_status', data: result.messageDeliveries.status },
                { field: 'deliveries_broadcast', data: result.messageDeliveries.broadcast ?? 0 },
                { field: 'deliveries_targeting', data: result.messageDeliveries.targeting ?? 0 },
                { field: 'deliveries_auto_response', data: result.messageDeliveries.autoResponse ?? 0 },
                { field: 'deliveries_welcome_response', data: result.messageDeliveries.welcomeResponse ?? 0 },
                { field: 'deliveries_chat', data: result.messageDeliveries.chat ?? 0 },
                { field: 'deliveries_api_broadcast', data: result.messageDeliveries.apiBroadcast ?? 0 },
                { field: 'deliveries_api_push', data: result.messageDeliveries.apiPush ?? 0 },
                { field: 'deliveries_api_multicast', data: result.messageDeliveries.apiMulticast ?? 0 },
                { field: 'deliveries_api_reply', data: result.messageDeliveries.apiReply ?? 0 }
            ])
        } else {
            messageStatistic.save([
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate },
                { field: 'reply_status', data: result.reply.status },
                { field: 'reply_number', data: result.reply.success ?? 0 },
                { field: 'push_status', data: result.sentPush.status },
                { field: 'push_number', data: result.sentPush.success ?? 0 },
                { field: 'multicast_status', data: result.sentMulticast.status },
                { field: 'multicast_number', data: result.sentMulticast.success ?? 0 },
                { field: 'broadcast_status', data: result.sentBroadcast.status },
                { field: 'broadcast_number', data: result.sentBroadcast.success ?? 0 },
                { field: 'deliveries_status', data: result.messageDeliveries.status },
                { field: 'deliveries_broadcast', data: result.messageDeliveries.broadcast ?? 0 },
                { field: 'deliveries_targeting', data: result.messageDeliveries.targeting ?? 0 },
                { field: 'deliveries_auto_response', data: result.messageDeliveries.autoResponse ?? 0 },
                { field: 'deliveries_welcome_response', data: result.messageDeliveries.welcomeResponse ?? 0 },
                { field: 'deliveries_chat', data: result.messageDeliveries.chat ?? 0 },
                { field: 'deliveries_api_broadcast', data: result.messageDeliveries.apiBroadcast ?? 0 },
                { field: 'deliveries_api_push', data: result.messageDeliveries.apiPush ?? 0 },
                { field: 'deliveries_api_multicast', data: result.messageDeliveries.apiMulticast ?? 0 },
                { field: 'deliveries_api_reply', data: result.messageDeliveries.apiReply ?? 0 }
            ])
        }

    }
}

export { LineSchedule }