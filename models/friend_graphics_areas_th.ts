import { BaseModel } from './base_model'

class FriendGraphicsAreasTH extends BaseModel {
    protected table: string = 'friend_graphics__areas_th'
    column = []
    areaTrans = {
        "unknown": "unknown",
        "Bangkok": "bangkok",
        "Pattaya": "pattaya",
        "Northern": "northern",
        "Central": "central",
        "Southern": "southern",
        "Eastern": "eastern",
        "NorthEastern": "northeastern",
        "Western": "western",
    }

}

export { FriendGraphicsAreasTH }