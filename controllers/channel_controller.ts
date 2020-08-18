import { Request, Response } from 'express'
import { DB } from '../helpers/db'
import { ChannelConfig } from '../helpers/type'
import { ChannelGroups } from '../models/channel_groups'
import { ChannelGroupsAccounts } from '../models/channel_groups_accounts'
import { ChannelAccounts } from '../models/channel_accounts'

class ChannelController {

    static index = async (req: Request, res: Response) => {
        let channelAccounts = new ChannelAccounts()
        let channelGroups = new ChannelGroups()

        let accounts = await channelAccounts.selectAll()
        let groups = await channelGroups.selectAll()

        return res.render('channel', { accounts: accounts, groups: groups })
    }

    static addAccount = async (req: Request, res: Response) => {
        let channelConfig: ChannelConfig = req.body

        if (!channelConfig.name || !channelConfig.access_token || !channelConfig.secret) {

        } else {
            let channelAccounts = new ChannelAccounts()

            await channelAccounts.save([
                { field: 'name', data: channelConfig.name },
                { field: 'access_token', data: channelConfig.access_token },
                { field: 'secret', data: channelConfig.secret }
            ])

        }

        return res.redirect('back')
    }

    static deleteAccount = async (req: Request, res: Response) => {
        let id = req.params.id
        let channelAccounts = new ChannelAccounts()

        await channelAccounts.destroy([
            { field: 'id', data: id }
        ])

        return res.redirect('back')
    }

    static createGroup = async (req: Request, res: Response) => {
        let ids = req.body.id
        let name_group = req.body.name_group
        let channelGroups = new ChannelGroups()
        let channelGroupsAccounts = new ChannelGroupsAccounts()

        let group = await channelGroups.save([
            { field: 'name', data: name_group },
            { field: 'account_number', data: ids.length }
        ])

        if (group) {
            for (const id of ids) {
                await channelGroupsAccounts.save([
                    { field: 'group_id', data: group.insertId },
                    { field: 'account_id', data: id }
                ])
            }
        }

        return res.redirect('channel')
    }

    static deleteGroup = async (req: Request, res: Response) => {
        let id = req.params.id
        let channelGroups = new ChannelGroups()
        let channelGroupsAccounts = new ChannelGroupsAccounts()

        await channelGroupsAccounts.destroy([
            { field: 'group_id', data: id }
        ])

        await channelGroups.destroy([
            { field: 'id', data: id }
        ])

        return res.redirect('back')
    }

    static groupDetail = async (req: Request, res: Response) => {
        let id = req.params.id
        let channelGroupsAccounts = new ChannelGroupsAccounts()
        let channelAccounts = new ChannelAccounts()

        let groups = await channelGroupsAccounts.select([
            { field: 'group_id', data: id }
        ])

        let accounts = await channelAccounts.selectIn([
            { field: 'id', data: [1, 2] }
        ])


        return res.render('group_detail', { accounts: accounts })
    }

    static exportDataInGroup = async (req: Request, res: Response) => {
        return res.redirect('back')
    }
}

export { ChannelController }