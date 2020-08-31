import { BaseModel } from './base_model'

class MessageStatistic extends BaseModel {
    protected table: string = 'messages_statistic'

    getMaxDateUpdateOnAccount = async (acountId: number) => {
        let data = await this.executeQuery(`SELECT account_id, MAX(date_update) as date_update FROM messages_statistic WHERE account_id = ${acountId}`)

        return data[0].date_update ? data[0].date_update : false
    }
}

export { MessageStatistic }