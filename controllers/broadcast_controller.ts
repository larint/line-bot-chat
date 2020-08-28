import { Request, Response, } from 'express'
import { ChannelGroups } from '../models/channel_groups'
import { MessagesBroadcast } from '../models/messages_broadcast'
import { ChannelAccounts, FieldChannelAccount } from '../models/channel_accounts'
import { ChannelGroupsAccounts } from '../models/channel_groups_accounts'

import { Client } from '@line/bot-sdk'
import { Message } from '@line/bot-sdk/dist/types'

class BroadcastController {
    channelAccounts: ChannelAccounts
    channelGroups: ChannelGroups
    messagesBroadcast: MessagesBroadcast
    channelGroupsAccounts: ChannelGroupsAccounts

    constructor() {
        this.channelAccounts = new ChannelAccounts()
        this.channelGroups = new ChannelGroups()
        this.messagesBroadcast = new MessagesBroadcast()
        this.channelGroupsAccounts = new ChannelGroupsAccounts()
    }

    index = async (req: Request, res: Response) => {

        let accountList = await this.channelAccounts.selectAll()
        let groupList = await this.channelGroups.selectAll()

        return res.render('broadcast/index', { accountList: accountList, groupList: groupList })
    }

    sendBroadcast = async (req: Request, res: Response) => {
        let type = req.body.type,
            message = req.body.message,
            ids = req.body.id,
            accountList: FieldChannelAccount[] = [],
            accountSendFail = []

        if (type != 'all' && ids == undefined) {
            return res.json({ code: 201, message: 'アカウントを選択していません' })
        }

        if (message == '') {
            return res.json({ code: 201, message: 'メッセージの内容はjson形式です' })
        }

        if (type == 'account') {
            accountList = await this.channelAccounts.selectIn([
                { field: 'id', data: ids }
            ])
        } else if (type == 'group') {
            accountList = await this.channelGroupsAccounts.selectAllAccountInGroup(ids)
        } else { // send all
            accountList = await this.channelAccounts.selectAll()
        }

        for (const account of accountList) {
            let client = new Client({
                channelAccessToken: account.access_token,
                channelSecret: account.secret

            })
            let jsonMessage = JSON.parse(message)

            try {
                let result = await client.broadcast(jsonMessage)

                if (result) {
                    await this.messagesBroadcast.save([
                        { field: 'request_id', data: result['x-line-request-id'] },
                        { field: 'target', data: account.id },
                        { field: 'type', data: type }
                    ])
                }
            } catch (error) {
                accountSendFail.push(account.name)
            }
        }

        if (accountSendFail.length == accountList.length) {
            return res.json({ code: 201, message: '送信できませんでした' })
        } else if (accountSendFail.length == 0) {
            return res.json({ code: 200, message: '正常に送信されました' })
        } else {
            return res.json({ code: 200, message: '正常に送信されましたが、次のアカウントは送信できませんでした：' + accountSendFail.join('/') })
        }
    }

    getListAccountGroup = async (req: Request, res: Response) => {
        let type = req.body.type, template = '', dataFilter = {}

        switch (type) {
            case 'group':
                let groupList = await this.channelGroups.selectAll()
                template = 'broadcast/table_group'
                dataFilter = { groupList: groupList }
                break;
            case 'account':
                let accountList = await this.channelAccounts.selectAll()
                template = 'broadcast/table_account'
                dataFilter = { accountList: accountList }
                break;
            default: // get all
                return res.json({ code: 200, data: 'すべてのアカウントに送信されます。' })
        }

        return res.render(template, dataFilter, async (err, html) => {
            res.json({ code: 200, data: html })
        })
    }
}

export default new BroadcastController 