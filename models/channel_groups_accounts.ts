import { BaseModel } from './base_model'

class ChannelGroupsAccounts extends BaseModel {
    protected table: string = 'channel__groups_accounts'

    selectAllAccountInGroup = async (groupIds: number[]) => {
        let ids = (groupIds instanceof Array) ? groupIds.join() : [groupIds];

        let sql = `SELECT DISTINCT(b.id), b.* FROM channel__groups_accounts as a LEFT JOIN channel__accounts as b
            ON a.account_id = b.id
            WHERE a.group_id in (${ids})`

        let accounts = await this.executeQuery(sql)
        if (!accounts) {
            return []
        }
        return accounts
    }
}

export { ChannelGroupsAccounts }