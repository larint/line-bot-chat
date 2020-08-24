import { BaseModel } from './base_model'

class FriendGraphicsAges extends BaseModel {
    protected table: string = 'friend_graphics__ages'
    column = ['id', 'account_id', 'date_update', 'unknown', 'from0to14', 'from15to19', 'from20to24', 'from25to29', 'from30to34', 'from35to39', 'from40to44', 'from45to49', 'from50']

}

export { FriendGraphicsAges }