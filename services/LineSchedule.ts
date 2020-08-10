import { Client } from '@line/bot-sdk'
import * as Types from '@line/bot-sdk/dist/types'
import { log, formatDate } from '../helpers/helper'
import { DB } from '../helpers/db'
import { messageStatistic } from '../helpers/type'

require('dotenv').config()

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.LINE_CHANNEL_SECRET as string
}

const client = new Client(config)

class LineSchedule {

    static run = async () => {
        console.log('run getFriendDemographics ' + new Date())
        let friendDemographic: Types.FriendDemographics = await client.getFriendDemographics()

        DB.insertItem({
            table: 'friend_demo_graphics',
            set: '?? = ?',
            where: ['data_json', JSON.stringify(friendDemographic)]
        })

        let currentDate = formatDate('YYYYMMDD');

        let result: messageStatistic = {}
        result.reply = await client.getNumberOfSentReplyMessages(currentDate)
        result.sentPush = await client.getNumberOfSentPushMessages(currentDate)
        result.sentMulticast = await client.getNumberOfSentMulticastMessages(currentDate)
        result.sentBroadcast = await client.getNumberOfSentBroadcastMessages(currentDate)
        result.messageDeliveries = await client.getNumberOfMessageDeliveries(currentDate)

        DB.insertItem({
            table: 'message_statistic',
            set: '?? = ?',
            where: ['data_json', JSON.stringify(result)]
        })
    }

}

export { LineSchedule }