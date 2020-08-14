import * as Types from '@line/bot-sdk/dist/types'
import { generateNumberProportion } from '../helpers/helper'
import { TableFriendGraphicsGenders } from '../migrations/tables/friend_graphics__genders'
import { TableFriendGraphicsAges } from '../migrations/tables/friend_graphics__ages'
import { TableFriendGraphicsApptypes } from '../migrations/tables/friend_graphics__apptypes'
import { TableFriendGraphicsSubscriptions } from '../migrations/tables/friend_graphics__subscriptions'
import { TableFriendGraphicsAreaJP } from '../migrations/tables/friend_graphics__areas_jp'
import { TableFriendGraphicsAreaTW } from '../migrations/tables/friend_graphics__areas_tw'
import { TableFriendGraphicsAreaTH } from '../migrations/tables/friend_graphics__areas_th'
import { TableFriendGraphicsAreaID } from '../migrations/tables/friend_graphics__areas_id'

require('dotenv').config()

class Faker {

    static getFakeJsonFriendGraphics = async () => {
        let areaTrans: any
        switch (process.env.LINE_LOCATE) {
            case 'jp':
                areaTrans = TableFriendGraphicsAreaJP.areaTrans;
                break;
            case 'tw':
                areaTrans = TableFriendGraphicsAreaTW.areaTrans;
                break;
            case 'th':
                areaTrans = TableFriendGraphicsAreaTH.areaTrans;
                break;
            case 'id':
                areaTrans = TableFriendGraphicsAreaID.areaTrans;
                break;
            default:
                areaTrans = TableFriendGraphicsAreaJP.areaTrans;
                break;
        }

        let genderTexts = TableFriendGraphicsGenders.column.slice(2)
        let genders = []
        let percent1 = await generateNumberProportion(100, genderTexts.length)
        for (let i = 0; i < genderTexts.length; i++) {
            let text: any = genderTexts[i]
            genders.push({
                "gender": text,
                "percentage": percent1[i]
            })
        }

        let agesTexts = TableFriendGraphicsAges.column.slice(2)
        let ages = []
        let percent2 = await generateNumberProportion(100, agesTexts.length)
        for (let i = 0; i < agesTexts.length; i++) {
            ages.push({
                "age": agesTexts[i],
                "percentage": percent2[i]
            })
        }

        let areasTexts = Object.keys(areaTrans)
        let areas = []
        let percent3 = await generateNumberProportion(100, areasTexts.length)
        for (let i = 0; i < areasTexts.length; i++) {
            areas.push({
                "area": areasTexts[i],
                "percentage": percent3[i]
            })
        }

        let appTypeTexts = TableFriendGraphicsApptypes.column.slice(2)
        let appTypes = []
        let percent4 = await generateNumberProportion(100, appTypeTexts.length)
        for (let i = 0; i < appTypeTexts.length; i++) {
            let text: any = appTypeTexts[i]
            appTypes.push({
                "appType": text,
                "percentage": percent4[i]
            })
        }

        let subscriptionTexts = TableFriendGraphicsSubscriptions.column.slice(2)
        let subscriptions = []
        let percent5 = await generateNumberProportion(100, subscriptionTexts.length)
        for (let i = 0; i < subscriptionTexts.length; i++) {
            let text: any = subscriptionTexts[i]
            subscriptions.push({
                "subscriptionPeriod": text,
                "percentage": percent5[i]
            })
        }

        let data: Types.FriendDemographics = {
            "available": true,
            "genders": genders,
            "ages": ages,
            "areas": areas,
            "appTypes": appTypes,
            "subscriptionPeriods": subscriptions
        }

        return data
    }

}

export { Faker }