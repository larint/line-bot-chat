import { BaseModel } from './base_model'

class FriendGraphicsGenders extends BaseModel {
    protected table: string = 'friend_graphics__genders'
    column = ['id', 'account_id', 'date_update', 'unknown', 'male', 'female']
}

export { FriendGraphicsGenders }