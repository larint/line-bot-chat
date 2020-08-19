"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faker = void 0;
const helper_1 = require("../helpers/helper");
const friend_graphics__genders_1 = require("../migrations/tables/friend_graphics__genders");
const friend_graphics__ages_1 = require("../migrations/tables/friend_graphics__ages");
const friend_graphics__apptypes_1 = require("../migrations/tables/friend_graphics__apptypes");
const friend_graphics__subscriptions_1 = require("../migrations/tables/friend_graphics__subscriptions");
const friend_graphics__areas_jp_1 = require("../migrations/tables/friend_graphics__areas_jp");
const friend_graphics__areas_tw_1 = require("../migrations/tables/friend_graphics__areas_tw");
const friend_graphics__areas_th_1 = require("../migrations/tables/friend_graphics__areas_th");
const friend_graphics__areas_id_1 = require("../migrations/tables/friend_graphics__areas_id");
class Faker {
}
exports.Faker = Faker;
Faker.getFakeJsonFriendGraphics = async () => {
    let areaTrans;
    switch (process.env.LINE_LOCATE) {
        case 'jp':
            areaTrans = friend_graphics__areas_jp_1.TableFriendGraphicsAreaJP.areaTrans;
            break;
        case 'tw':
            areaTrans = friend_graphics__areas_tw_1.TableFriendGraphicsAreaTW.areaTrans;
            break;
        case 'th':
            areaTrans = friend_graphics__areas_th_1.TableFriendGraphicsAreaTH.areaTrans;
            break;
        case 'id':
            areaTrans = friend_graphics__areas_id_1.TableFriendGraphicsAreaID.areaTrans;
            break;
        default:
            areaTrans = friend_graphics__areas_jp_1.TableFriendGraphicsAreaJP.areaTrans;
            break;
    }
    let genderTexts = friend_graphics__genders_1.TableFriendGraphicsGenders.column.slice(2);
    let genders = [];
    let percent1 = await helper_1.generateNumberProportion(100, genderTexts.length);
    for (let i = 0; i < genderTexts.length; i++) {
        let text = genderTexts[i];
        genders.push({
            "gender": text,
            "percentage": percent1[i]
        });
    }
    let agesTexts = friend_graphics__ages_1.TableFriendGraphicsAges.column.slice(2);
    let ages = [];
    let percent2 = await helper_1.generateNumberProportion(100, agesTexts.length);
    for (let i = 0; i < agesTexts.length; i++) {
        ages.push({
            "age": agesTexts[i],
            "percentage": percent2[i]
        });
    }
    let areasTexts = Object.keys(areaTrans);
    let areas = [];
    let percent3 = await helper_1.generateNumberProportion(100, areasTexts.length);
    for (let i = 0; i < areasTexts.length; i++) {
        areas.push({
            "area": areasTexts[i],
            "percentage": percent3[i]
        });
    }
    let appTypeTexts = friend_graphics__apptypes_1.TableFriendGraphicsApptypes.column.slice(2);
    let appTypes = [];
    let percent4 = await helper_1.generateNumberProportion(100, appTypeTexts.length);
    for (let i = 0; i < appTypeTexts.length; i++) {
        let text = appTypeTexts[i];
        appTypes.push({
            "appType": text,
            "percentage": percent4[i]
        });
    }
    let subscriptionTexts = friend_graphics__subscriptions_1.TableFriendGraphicsSubscriptions.column.slice(2);
    let subscriptions = [];
    let percent5 = await helper_1.generateNumberProportion(100, subscriptionTexts.length);
    for (let i = 0; i < subscriptionTexts.length; i++) {
        let text = subscriptionTexts[i];
        subscriptions.push({
            "subscriptionPeriod": text,
            "percentage": percent5[i]
        });
    }
    let data = {
        "available": true,
        "genders": genders,
        "ages": ages,
        "areas": areas,
        "appTypes": appTypes,
        "subscriptionPeriods": subscriptions
    };
    return data;
};
