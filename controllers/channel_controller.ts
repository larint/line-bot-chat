import { Request, Response } from 'express'
import { Client } from '@line/bot-sdk'
import * as Types from '@line/bot-sdk/dist/types'
import { DataLineFollower } from '../helpers/type'
import { round, formatDate } from '../helpers/helper'
import { ChannelGroups } from '../models/channel_groups'
import { ChannelGroupsAccounts } from '../models/channel_groups_accounts'
import { ChannelAccounts, FieldChannelAccount } from '../models/channel_accounts'

class ChannelController {
    channelAccounts: ChannelAccounts
    channelGroups: ChannelGroups
    channelGroupsAccounts: ChannelGroupsAccounts
    constructor() {
        this.channelAccounts = new ChannelAccounts()
        this.channelGroups = new ChannelGroups()
        this.channelGroupsAccounts = new ChannelGroupsAccounts()
    }

    index = async (req: Request, res: Response) => {
        let accountList = await this.channelAccounts.selectAllStatisticAccount()
        let groupList = await this.channelGroups.selectAll()

        return res.render('channels/index', { accountList: accountList, groupList: groupList })
    }

    addAccount = async (req: Request, res: Response) => {
        let data: FieldChannelAccount = req.body

        if (!data.name || !data.access_token || !data.secret || !data.start_date) {

        } else {
            let client = new Client({
                channelAccessToken: data.access_token,
                channelSecret: data.secret
            })

            let currentDate = formatDate('YYYYMMDD', new Date(data.start_date))

            let follower: DataLineFollower = { status: 'unready', blocks: 0, targetedReaches: 0, followers: 0, block_rate: 0 }
            try {
                follower = <Types.NumberOfFollowers>await client.getNumberOfFollowers(currentDate)
                let blocks = follower.blocks as number
                let targetedReaches = follower.targetedReaches as number
                follower.block_rate = targetedReaches > 0 ? round(blocks / targetedReaches * 100) : 0
            } catch (error) { }

            await this.channelAccounts.save([
                { field: 'name', data: data.name },
                { field: 'line_account', data: data.line_account },
                { field: 'account_id', data: data.account_id },
                { field: 'friends', data: follower.followers },
                { field: 'target_reach', data: follower.targetedReaches },
                { field: 'block', data: follower.blocks },
                { field: 'block_rate', data: follower.block_rate },
                { field: 'access_token', data: data.access_token },
                { field: 'secret', data: data.secret },
                { field: 'start_date', data: data.start_date }
            ])

        }

        return res.redirect('back')
    }

    editAccount = async (req: Request, res: Response) => {

        let id = parseInt(req.params.id)
        let account = await this.channelAccounts.find(id)
        let accountList = await this.channelAccounts.selectAll()
        let groupList = await this.channelGroups.selectAll()

        return res.render('channels/index', { account: account, accountList: accountList, groupList: groupList })
    }

    updateAccount = async (req: Request, res: Response) => {
        let data: FieldChannelAccount = req.body

        let client = new Client({
            channelAccessToken: data.access_token,
            channelSecret: data.secret
        })

        let currentDate = formatDate('YYYYMMDD', new Date(data.start_date))

        let follower: DataLineFollower = { status: 'unready', blocks: 0, targetedReaches: 0, followers: 0, block_rate: 0 }
        try {
            follower = <Types.NumberOfFollowers>await client.getNumberOfFollowers(currentDate)
            let blocks = follower.blocks as number
            let targetedReaches = follower.targetedReaches as number
            follower.block_rate = targetedReaches > 0 ? round(blocks / targetedReaches * 100) : 0
        } catch (error) { }

        await this.channelAccounts.update([
            { field: 'id', data: data.id },
            { field: 'name', data: data.name },
            { field: 'line_account', data: data.line_account },
            { field: 'account_id', data: data.account_id },
            { field: 'friends', data: follower.followers },
            { field: 'target_reach', data: follower.targetedReaches },
            { field: 'block', data: follower.blocks },
            { field: 'block_rate', data: follower.block_rate },
            { field: 'access_token', data: data.access_token },
            { field: 'secret', data: data.secret },
            { field: 'start_date', data: data.start_date }
        ])

        return res.redirect('/channel')
    }

    deleteAccount = async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)

        await this.channelAccounts.destroy(id)

        return res.redirect('back')
    }

    createGroup = async (req: Request, res: Response) => {
        let ids = req.body.id
        let name_group = req.body.name_group

        let group = await this.channelGroups.save([
            { field: 'name', data: name_group },
            { field: 'account_number', data: ids.length }
        ])

        if (group) {
            for (const id of ids) {
                await this.channelGroupsAccounts.save([
                    { field: 'group_id', data: group.insertId },
                    { field: 'account_id', data: id }
                ])
            }
        }

        return res.send(true)
    }

    deleteGroup = async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)

        await this.channelGroupsAccounts.destroy([
            { field: 'group_id', data: id }
        ])

        await this.channelGroups.destroy(id)

        return res.redirect('back')
    }

    groupDetail = async (req: Request, res: Response) => {
        let id = parseInt(req.params.id)

        let group = await this.channelGroups.find(id)

        let groups = await this.channelGroupsAccounts.select([
            { field: 'group_id', data: id }
        ])

        let ids = []
        for (const it of groups) {
            ids.push(it.account_id)
        }

        let accounts = await this.channelAccounts.selectIn([
            { field: 'id', data: ids }
        ])


        return res.render('channels/group_detail', { accounts: accounts, group: group })
    }

    exportDataInGroup = async (req: Request, res: Response) => {
        return res.redirect('back')
    }

}

export default new ChannelController