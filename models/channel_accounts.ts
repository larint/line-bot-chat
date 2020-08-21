import { BaseModel, FieldDataModel } from './base_model'

interface FieldChannelAccount extends FieldDataModel {
    name: string,
    line_account: string,
    account_id: string,
    access_token: string,
    secret: string
}

class ChannelAccounts extends BaseModel {
    protected table: string = 'channel__accounts'

}

export { ChannelAccounts, FieldChannelAccount }