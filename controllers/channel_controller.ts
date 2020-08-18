import { Request, Response } from 'express'
import { DB } from '../helpers/db'
import { ChannelConfig } from '../helpers/type'
import { ChannelGroups } from '../models/channel_groups'
import { ChannelGroupsAccounts } from '../models/channel_groups_accounts'
import { ChannelAccounts } from '../models/channel_accounts'

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

        let accounts = await this.channelAccounts.selectAll()
        let groups = await this.channelGroups.selectAll()

        return res.render('channel', { accounts: accounts, groups: groups })
    }

    addAccount = async (req: Request, res: Response) => {
        let channelConfig: ChannelConfig = req.body

        if (!channelConfig.name || !channelConfig.access_token || !channelConfig.secret) {

        } else {

            await this.channelAccounts.save([
                { field: 'name', data: channelConfig.name },
                { field: 'access_token', data: channelConfig.access_token },
                { field: 'secret', data: channelConfig.secret }
            ])

        }

        return res.redirect('back')
    }

    deleteAccount = async (req: Request, res: Response) => {
        let id = req.params.id

        await this.channelAccounts.destroy([
            { field: 'id', data: id }
        ])

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

        return res.redirect('channel')
    }

    deleteGroup = async (req: Request, res: Response) => {
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

    groupDetail = async (req: Request, res: Response) => {
        let id = req.params.id

        let group = await this.channelGroups.find({ field: 'id', data: id })

        let groups = await this.channelGroupsAccounts.select([
            { field: 'group_id', data: id }
        ])

        let accounts = await this.channelAccounts.selectIn([
            { field: 'id', data: [1, 2] }
        ])


        return res.render('group_detail', { accounts: accounts, group: group })
    }

    exportDataInGroup = async (req: Request, res: Response) => {
        return res.redirect('back')
    }
}

export { ChannelController }