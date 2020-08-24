import { BaseModel } from './base_model'

class FriendGraphicsSubscriptions extends BaseModel {
    protected table: string = 'friend_graphics__subscriptions'
    column = ['id', 'account_id', 'date_update', 'within7days', 'within30days', 'within90days', 'within180days', 'within365days', 'over365days', 'unknown']

}

export { FriendGraphicsSubscriptions }