"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSchedule = void 0;
const bot_sdk_1 = require("@line/bot-sdk");
const helper_1 = require("../helpers/helper");
const messages_statistic_1 = require("../models/messages_statistic");
const channel_accounts_1 = require("../models/channel_accounts");
const friend_graphics_ages_1 = require("../models/friend_graphics_ages");
const friend_graphics_apptypes_1 = require("../models/friend_graphics_apptypes");
const friend_graphics_genders_1 = require("../models/friend_graphics_genders");
const friend_graphics_subscriptions_1 = require("../models/friend_graphics_subscriptions");
const friend_graphics_areas_jp_1 = require("../models/friend_graphics_areas_jp");
const friend_graphics_areas_th_1 = require("../models/friend_graphics_areas_th");
const friend_graphics_areas_tw_1 = require("../models/friend_graphics_areas_tw");
const friend_graphics_areas_id_1 = require("../models/friend_graphics_areas_id");
class LineSchedule {
}
exports.LineSchedule = LineSchedule;
LineSchedule.run = async () => {
    let channelAccounts = new channel_accounts_1.ChannelAccounts();
    let accountList = await channelAccounts.selectAll();
    for (const account of accountList) {
        let client = new bot_sdk_1.Client({
            channelAccessToken: account.access_token,
            channelSecret: account.secret
        });
        let date = helper_1.formatDate('YYYYMMDD', new Date(), -1);
        LineSchedule.saveFollowerStatistic(client, account.id, date);
        let friend = await client.getFriendDemographics();
        LineSchedule.saveGraphicsGenders(friend, account.id, date);
        LineSchedule.saveGraphicsAges(friend, account.id, date);
        LineSchedule.saveGraphicsAppTypes(friend, account.id, date);
        LineSchedule.saveGraphicsSubscription(friend, account.id, date);
        LineSchedule.saveGraphicsAreas(friend, account.id, date);
        LineSchedule.saveMessageStatistic(client, account.id, date);
    }
};
LineSchedule.saveGraphicsGenders = async (friend, accountId, dateUpdate) => {
    var _a, _b, _c;
    let friendGraphicsGenders = new friend_graphics_genders_1.FriendGraphicsGenders();
    let isExist = await friendGraphicsGenders.find([
        { field: 'date_update', data: dateUpdate },
        { field: 'account_id', data: accountId },
    ]);
    if (((_a = friend.genders) === null || _a === void 0 ? void 0 : _a.length) == 0) {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            friendGraphicsGenders.column.slice(3).forEach((column, idx) => {
                fields.push({ field: column, data: 0 });
            });
            friendGraphicsGenders.save(fields);
        }
    }
    else {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            (_b = friend.genders) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                fields.push({ field: item.gender, data: item.percentage });
            });
            friendGraphicsGenders.save(fields);
        }
        else {
            let fields = [{ field: 'id', data: isExist.id }];
            (_c = friend.genders) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
                fields.push({ field: item.gender, data: item.percentage });
            });
            friendGraphicsGenders.update(fields);
        }
    }
};
LineSchedule.saveGraphicsAges = async (friend, accountId, dateUpdate) => {
    var _a, _b, _c;
    let friendGraphicsAges = new friend_graphics_ages_1.FriendGraphicsAges();
    let isExist = await friendGraphicsAges.find([
        { field: 'date_update', data: dateUpdate },
        { field: 'account_id', data: accountId },
    ]);
    if (((_a = friend.ages) === null || _a === void 0 ? void 0 : _a.length) == 0) {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            friendGraphicsAges.column.slice(3).forEach((column, idx) => {
                fields.push({ field: column, data: 0 });
            });
            friendGraphicsAges.save(fields);
        }
    }
    else {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            (_b = friend.ages) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                fields.push({ field: item.age, data: item.percentage });
            });
            friendGraphicsAges.save(fields);
        }
        else {
            let fields = [{ field: 'id', data: isExist.id }];
            (_c = friend.ages) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
                fields.push({ field: item.age, data: item.percentage });
            });
            friendGraphicsAges.update(fields);
        }
    }
};
LineSchedule.saveGraphicsAppTypes = async (friend, accountId, dateUpdate) => {
    var _a, _b, _c;
    let friendGraphicsApptypes = new friend_graphics_apptypes_1.FriendGraphicsApptypes();
    let isExist = await friendGraphicsApptypes.find([
        { field: 'date_update', data: dateUpdate },
        { field: 'account_id', data: accountId },
    ]);
    if (((_a = friend.appTypes) === null || _a === void 0 ? void 0 : _a.length) == 0) {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            friendGraphicsApptypes.column.slice(3).forEach((column, idx) => {
                fields.push({ field: column, data: 0 });
            });
            friendGraphicsApptypes.save(fields);
        }
    }
    else {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            (_b = friend.appTypes) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                fields.push({ field: item.appType, data: item.percentage });
            });
            friendGraphicsApptypes.save(fields);
        }
        else {
            let fields = [{ field: 'id', data: isExist.id }];
            (_c = friend.appTypes) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
                fields.push({ field: item.appType, data: item.percentage });
            });
            friendGraphicsApptypes.update(fields);
        }
    }
};
LineSchedule.saveGraphicsSubscription = async (friend, accountId, dateUpdate) => {
    var _a, _b, _c;
    let friendGraphicsSubscriptions = new friend_graphics_subscriptions_1.FriendGraphicsSubscriptions();
    let isExist = await friendGraphicsSubscriptions.find([
        { field: 'date_update', data: dateUpdate },
        { field: 'account_id', data: accountId },
    ]);
    if (((_a = friend.subscriptionPeriods) === null || _a === void 0 ? void 0 : _a.length) == 0) {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            friendGraphicsSubscriptions.column.slice(3).forEach((column, idx) => {
                fields.push({ field: column, data: 0 });
            });
            friendGraphicsSubscriptions.save(fields);
        }
    }
    else {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            (_b = friend.subscriptionPeriods) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                fields.push({ field: item.subscriptionPeriod, data: item.percentage });
            });
            friendGraphicsSubscriptions.save(fields);
        }
        else {
            let fields = [{ field: 'id', data: isExist.id }];
            (_c = friend.subscriptionPeriods) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
                fields.push({ field: item.subscriptionPeriod, data: item.percentage });
            });
            friendGraphicsSubscriptions.update(fields);
        }
    }
};
LineSchedule.saveGraphicsAreas = async (friend, accountId, dateUpdate) => {
    var _a, _b, _c;
    let friendGraphicsArea = {};
    switch (process.env.LINE_LOCATE) {
        case 'jp':
            friendGraphicsArea = new friend_graphics_areas_jp_1.FriendGraphicsAreasJP();
            break;
        case 'tw':
            friendGraphicsArea = new friend_graphics_areas_tw_1.FriendGraphicsAreasTW();
            break;
        case 'th':
            friendGraphicsArea = new friend_graphics_areas_th_1.FriendGraphicsAreasTH();
            break;
        case 'id':
            friendGraphicsArea = new friend_graphics_areas_id_1.FriendGraphicsAreasID();
            break;
        default:
            friendGraphicsArea = new friend_graphics_areas_jp_1.FriendGraphicsAreasJP();
            break;
    }
    let areaTrans = friendGraphicsArea.areaTrans;
    let isExist = await friendGraphicsArea.find([
        { field: 'date_update', data: dateUpdate },
        { field: 'account_id', data: accountId },
    ]);
    if (((_a = friend.areas) === null || _a === void 0 ? void 0 : _a.length) == 0) {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            let citys = Object.values(areaTrans);
            for (const city of citys) {
                fields.push({ field: city, data: 0 });
            }
            friendGraphicsArea.save(fields);
        }
    }
    else {
        if (!isExist) {
            let fields = [
                { field: 'account_id', data: accountId },
                { field: 'date_update', data: dateUpdate }
            ];
            (_b = friend.areas) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                fields.push({ field: areaTrans[item.area], data: item.percentage });
            });
            friendGraphicsArea.save(fields);
        }
        else {
            let fields = [{ field: 'id', data: isExist.id }];
            (_c = friend.areas) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
                fields.push({ field: areaTrans[item.area], data: item.percentage });
            });
            friendGraphicsArea.update(fields);
        }
    }
};
LineSchedule.saveMessageStatistic = async (client, accountId, dateUpdate) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    let messageStatistic = new messages_statistic_1.MessageStatistic();
    let result = {};
    result.reply = await client.getNumberOfSentReplyMessages(dateUpdate);
    result.sentPush = await client.getNumberOfSentPushMessages(dateUpdate);
    result.sentMulticast = await client.getNumberOfSentMulticastMessages(dateUpdate);
    result.sentBroadcast = await client.getNumberOfSentBroadcastMessages(dateUpdate);
    result.messageDeliveries = await client.getNumberOfMessageDeliveries(dateUpdate);
    let follower = { status: 'unready', blocks: 0, targetedReaches: 0, followers: 0, block_rate: 0 };
    try {
        follower = await client.getNumberOfFollowers(dateUpdate);
        let blocks = follower.blocks;
        let targetedReaches = follower.targetedReaches;
        follower.block_rate = helper_1.round(blocks / targetedReaches * 100);
    }
    catch (error) { }
    let isExist = await messageStatistic.find([
        { field: 'account_id', data: accountId },
        { field: 'date_update', data: dateUpdate }
    ]);
    if (isExist) {
        messageStatistic.update([
            { field: 'id', data: isExist.id },
            { field: 'reply_status', data: result.reply.status },
            { field: 'reply_number', data: (_a = result.reply.success) !== null && _a !== void 0 ? _a : 0 },
            { field: 'push_status', data: result.sentPush.status },
            { field: 'push_number', data: (_b = result.sentPush.success) !== null && _b !== void 0 ? _b : 0 },
            { field: 'multicast_status', data: result.sentMulticast.status },
            { field: 'multicast_number', data: (_c = result.sentMulticast.success) !== null && _c !== void 0 ? _c : 0 },
            { field: 'broadcast_status', data: result.sentBroadcast.status },
            { field: 'broadcast_number', data: (_d = result.sentBroadcast.success) !== null && _d !== void 0 ? _d : 0 },
            { field: 'deliveries_status', data: result.messageDeliveries.status },
            { field: 'deliveries_broadcast', data: (_e = result.messageDeliveries.broadcast) !== null && _e !== void 0 ? _e : 0 },
            { field: 'deliveries_targeting', data: (_f = result.messageDeliveries.targeting) !== null && _f !== void 0 ? _f : 0 },
            { field: 'deliveries_auto_response', data: (_g = result.messageDeliveries.autoResponse) !== null && _g !== void 0 ? _g : 0 },
            { field: 'deliveries_welcome_response', data: (_h = result.messageDeliveries.welcomeResponse) !== null && _h !== void 0 ? _h : 0 },
            { field: 'deliveries_chat', data: (_j = result.messageDeliveries.chat) !== null && _j !== void 0 ? _j : 0 },
            { field: 'friends', data: follower.followers },
            { field: 'target_reach', data: follower.targetedReaches },
            { field: 'block', data: follower.blocks },
            { field: 'block_rate', data: follower.block_rate }
        ]);
    }
    else {
        messageStatistic.save([
            { field: 'account_id', data: accountId },
            { field: 'date_update', data: dateUpdate },
            { field: 'reply_status', data: result.reply.status },
            { field: 'reply_number', data: (_k = result.reply.success) !== null && _k !== void 0 ? _k : 0 },
            { field: 'push_status', data: result.sentPush.status },
            { field: 'push_number', data: (_l = result.sentPush.success) !== null && _l !== void 0 ? _l : 0 },
            { field: 'multicast_status', data: result.sentMulticast.status },
            { field: 'multicast_number', data: (_m = result.sentMulticast.success) !== null && _m !== void 0 ? _m : 0 },
            { field: 'broadcast_status', data: result.sentBroadcast.status },
            { field: 'broadcast_number', data: (_o = result.sentBroadcast.success) !== null && _o !== void 0 ? _o : 0 },
            { field: 'deliveries_status', data: result.messageDeliveries.status },
            { field: 'deliveries_broadcast', data: (_p = result.messageDeliveries.broadcast) !== null && _p !== void 0 ? _p : 0 },
            { field: 'deliveries_targeting', data: (_q = result.messageDeliveries.targeting) !== null && _q !== void 0 ? _q : 0 },
            { field: 'deliveries_auto_response', data: (_r = result.messageDeliveries.autoResponse) !== null && _r !== void 0 ? _r : 0 },
            { field: 'deliveries_welcome_response', data: (_s = result.messageDeliveries.welcomeResponse) !== null && _s !== void 0 ? _s : 0 },
            { field: 'deliveries_chat', data: (_t = result.messageDeliveries.chat) !== null && _t !== void 0 ? _t : 0 },
            { field: 'friends', data: follower.followers },
            { field: 'target_reach', data: follower.targetedReaches },
            { field: 'block', data: follower.blocks },
            { field: 'block_rate', data: follower.block_rate }
        ]);
    }
};
LineSchedule.saveFollowerStatistic = async (client, accountId, dateUpdate) => {
    let follower = { status: 'unready', blocks: 0, targetedReaches: 0, followers: 0, block_rate: 0 };
    try {
        follower = await client.getNumberOfFollowers(dateUpdate);
        let blocks = follower.blocks;
        let targetedReaches = follower.targetedReaches;
        follower.block_rate = helper_1.round(blocks / targetedReaches * 100);
    }
    catch (error) { }
    let channelAccounts = new channel_accounts_1.ChannelAccounts();
    channelAccounts.update([
        { field: 'id', data: accountId },
        { field: 'friends', data: follower.followers },
        { field: 'target_reach', data: follower.targetedReaches },
        { field: 'block', data: follower.blocks },
        { field: 'block_rate', data: follower.block_rate }
    ]);
};
