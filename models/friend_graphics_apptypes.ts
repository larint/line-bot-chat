import { BaseModel } from './base_model'

class FriendGraphicsApptypes extends BaseModel {
    protected table: string = 'friend_graphics__apptypes'
    column = ['id', 'account_id', 'date_update', 'ios', 'android', 'others']

}

export { FriendGraphicsApptypes }